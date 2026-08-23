import { Product, ModestyFilterState, CalculatedMatch } from '@/types/product';

const NON_APPAREL_REGEX = /\b(sock|socks|ring|rings|earring|earrings|necklace|bracelet|jewelry|scrunchie|scrunchies|hair|headband|bag|bags|tote|purse|backpack|wallet|perfume|fragrance|candle|shoe|shoes|slide|slides|sandal|sandals|boot|boots|sneaker|sneakers|gloss|lip|nail|polish)\b/i;
const APPAREL_KEYWORD_REGEX = /\b(dress|dresses|top|tops|shirt|shirts|pant|pants|trouser|trousers|skirt|skirts|sweater|sweaters|hoodie|hoodies|blazer|blazers|cardigan|cardigans|jacket|jackets|coat|coats|vest|vests|suit|suits|bodysuit|bodysuits|romper|rompers|jumpsuit|jumpsuits|jogger|joggers|sweatpant|sweatpants|jeans|onesie|onesies)\b/i;

export function parsePrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const cleaned = price.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

function matchesCategory(product: Product, selectedCategory: string): boolean {
  if (!selectedCategory || selectedCategory === 'all') return true;
  const cat = selectedCategory.toLowerCase();
  const pName = product.name.toLowerCase();
  const pCat = product.category.toLowerCase();

  if (cat === 'tops') {
    return pCat.includes('top') || pCat.includes('shirt') || pName.includes('top') || pName.includes('shirt') || pName.includes('tee') || pName.includes('sweater') || pName.includes('hoodie');
  }
  if (cat === 'dresses') {
    return pCat.includes('dress') || pName.includes('dress') || pName.includes('gown') || pName.includes('jumpsuit') || pName.includes('romper') || pName.includes('onesie');
  }
  if (cat === 'skirts') {
    return pCat.includes('skirt') || pName.includes('skirt');
  }
  if (cat === 'pants') {
    return pCat.includes('pant') || pCat.includes('trouser') || pName.includes('pant') || pName.includes('trouser') || pName.includes('jeans') || pName.includes('jogger') || pName.includes('sweatpant');
  }
  if (cat === 'outerwear') {
    return pCat.includes('jacket') || pCat.includes('coat') || pName.includes('jacket') || pName.includes('coat') || pName.includes('blazer') || pName.includes('cardigan') || pName.includes('vest');
  }

  return pCat.includes(cat) || pName.includes(cat);
}

export function filterByOccasion(item: Product, occasion: string): boolean {
  if (!occasion || occasion === "All Occasions" || occasion === "all") return true;
  const text = `${item.name || ""} ${item.category || ""} ${(item.tags || []).join(" ")}`.toLowerCase();

  switch (occasion) {
    case "Gymwear":
    case "gymwear":
      if (/onesie|slipper|pajama|pj|jean|denim/i.test(text)) return false;
      return /\b(active|gym|athletic|workout|legging|leggings|sports bra|runner|jogger|joggers|track|fleece|biker|sweatpant|sweatpants)\b/i.test(text);

    case "Everyday Wear":
    case "everyday":
      if (/onesie|slipper|pajama|pj|bra\b|thong|bikini/i.test(text)) return false;
      return /\b(tee|t-shirt|crewneck|sweatshirt|jeans|jean|denim|hoodie|sweater|cardigan|cargo|casual|top)\b/i.test(text);

    case "Sleepwear":
    case "sleepwear":
      return /\b(onesie|onesies|pajama|pajamas|pj|pjs|robe|robes|nightgown|sleep|slippers|loungewear)\b/i.test(text);

    case "Undergarments":
    case "undergarments":
      if (/onesie|jumpsuit|hoodie|jacket|sweater/i.test(text)) return false;
      return /\b(bra|bras|underwear|panties|panty|thong|thongs|boxer|boxers|bralette|shapewear|undies)\b/i.test(text);

    case "Going Out":
    case "going_out":
      return /\b(dress|dresses|blazer|corset|satin|silk|bodysuit|party|halter|skirt|evening|blouse|cocktail)\b/i.test(text);

    case "All Occasions":
    default:
      return true;
  }
}

export function filterAndScoreProducts(
  products: Product[],
  filters: ModestyFilterState
): CalculatedMatch[] {
  let matches: CalculatedMatch[] = [];

  for (const product of products) {
    const audit = product.modestyAudit;
    const matchReasons: string[] = [];
    const warnings: string[] = [];

    // Filter out non-apparel items (socks, jewelry, bags, footwear, accessories) EXCEPT when Undergarments occasion is selected
    const nameAndCat = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`;
    const isUndergarments = filters.selectedOccasion === 'undergarments' || filters.selectedOccasion === 'Undergarments';
    if (!isUndergarments) {
      if (NON_APPAREL_REGEX.test(nameAndCat) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
        continue;
      }
    }

    // Category filter (inclusive keyword matching)
    if (!matchesCategory(product, filters.selectedCategory)) {
      continue;
    }

    // Retailer filter
    if (filters.selectedRetailer && filters.selectedRetailer !== 'all' && product.brand.toLowerCase() !== filters.selectedRetailer.toLowerCase()) {
      continue;
    }

    // Occasion filter (strict multi-keyword regex matching)
    if (!filterByOccasion(product, filters.selectedOccasion)) {
      continue;
    }

    // Max price filter
    const numericPrice = parsePrice(product.price);
    if (filters.maxPrice && filters.maxPrice > 0 && numericPrice > filters.maxPrice) {
      continue;
    }

    // Text search query matching
    const q = filters.searchQuery.trim().toLowerCase();
    const colorStr = product.color || '';
    const descStr = audit.retailerDescriptionText || '';
    
    const matchesSearch = !q ||
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      colorStr.toLowerCase().includes(q) ||
      (product.tags && product.tags.some(t => t.toLowerCase().includes(q))) ||
      descStr.toLowerCase().includes(q);

    if (!matchesSearch) {
      continue;
    }

    // A. HARD RULES FILTER (EXCLUSIONS)
    const textForAudit = `${product.name} ${(product.tags || []).join(' ')} ${descStr}`;
    if (filters.noSlits && (/slit|split|cut-out|open back/i.test(textForAudit) || audit.hasSlit === true)) {
      continue;
    }
    if (filters.noOpenBack && (/cutout|cut-out|backless|strapless|tube/i.test(textForAudit) || audit.isOpenBack === true)) {
      continue;
    }
    if (filters.isOpaque && (/sheer|mesh|chiffon|lace|see-through|pareo/i.test(textForAudit) || audit.isSheer === true)) {
      continue;
    }

    // B. SLEEVE FILTER (IF SELECTIONS EXIST)
    if (filters.sleeveLengths && filters.sleeveLengths.length > 0) {
      const hasShort = filters.sleeveLengths.some(s => /short|elbow/i.test(s));
      const hasLong = filters.sleeveLengths.some(s => /long|wrist|3\/4/i.test(s));
      const text = `${product.name} ${(product.tags || []).join(' ')} ${product.category} ${audit.sleeveLength}`.toLowerCase();

      const isLong = /long sleeve|sweater|hoodie|cardigan|jacket|crewneck|wrist|3\/4/i.test(text);
      const isShort = /short sleeve|t-shirt|tee|short|elbow/i.test(text);
      const isSleeveless = /tank|tube|camisole|sleeveless|bikini/i.test(text);

      if (hasLong && !hasShort && (isShort || isSleeveless)) continue;
      if (hasShort && !hasLong && (isLong || isSleeveless)) continue;
      if (!hasLong && !hasShort && isSleeveless) continue;
    }

    // C. BOTTOMS FILTER (IF SELECTIONS EXIST)
    if (filters.hemlines && filters.hemlines.length > 0) {
      const hasSkirt = filters.hemlines.some(b => /skirt|dress|maxi|floor|ankle/i.test(b));
      const hasPants = filters.hemlines.some(b => /pant|trouser|jeans|sweatpant|jogger|midi|knee/i.test(b));
      const text = `${product.name} ${(product.tags || []).join(' ')} ${product.category} ${audit.hemline}`.toLowerCase();

      if (hasSkirt && !hasPants && !/skirt|dress|maxi|floor|ankle/i.test(text)) continue;
      if (hasPants && !hasSkirt && !/pant|trouser|jean|legging|sweatpant|jogger/i.test(text)) continue;
    }

    // Match reasons & warnings for modesty score display
    let score = audit.modestyScore;
    if (audit.hasSlit) score -= 15;
    if (audit.isOpenBack) score -= 15;
    if (audit.isSheer) score -= 20;

    matches.push({
      product,
      matchPercentage: Math.max(70, Math.min(100, Math.round(score))),
      passedFilters: true,
      matchReasons: ['Verified against active modesty preferences'],
      warnings: []
    });
  }

  // FALLBACK GRACEFUL DEGRADATION: If strict filters yielded 0 results, score top closest modest apparel!
  if (matches.length === 0 && products.length > 0) {
    for (const product of products) {
      // Must STILL respect occasion filter even in fallback!
      if (!filterByOccasion(product, filters.selectedOccasion)) {
        continue;
      }

      const nameAndCat = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`;
      const isUndergarments = filters.selectedOccasion === 'undergarments' || filters.selectedOccasion === 'Undergarments';
      if (!isUndergarments && NON_APPAREL_REGEX.test(nameAndCat) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
        continue;
      }

      // Check price filter if provided
      const numericPrice = parsePrice(product.price);
      if (filters.maxPrice && filters.maxPrice > 0 && numericPrice > filters.maxPrice) {
        continue;
      }

      const audit = product.modestyAudit;
      let score = audit.modestyScore;
      if (audit.hasSlit) score -= 15;
      if (audit.isOpenBack) score -= 15;
      if (audit.isSheer) score -= 20;

      matches.push({
        product,
        matchPercentage: Math.max(50, Math.min(100, Math.round(score))),
        passedFilters: true,
        matchReasons: ['Smart recommendation fallback — Top modest item in catalog'],
        warnings: ['Fallback match for strict filter criteria']
      });
    }
  }

  // Sorting logic
  if (filters.sortBy === 'price_low') {
    return matches.sort((a, b) => parsePrice(a.product.price) - parsePrice(b.product.price));
  } else if (filters.sortBy === 'price_high') {
    return matches.sort((a, b) => parsePrice(b.product.price) - parsePrice(a.product.price));
  }

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
