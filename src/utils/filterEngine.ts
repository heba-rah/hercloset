import { Product, ModestyFilterState, CalculatedMatch } from '@/types/product';

const NON_APPAREL_REGEX = /\b(sock|socks|ring|rings|earring|earrings|necklace|bracelet|jewelry|scrunchie|scrunchies|hair|headband|bag|bags|tote|purse|backpack|wallet|perfume|fragrance|candle|shoe|shoes|slide|slides|sandal|sandals|boot|boots|sneaker|sneakers|gloss|lip|nail|polish)\b/i;
const APPAREL_KEYWORD_REGEX = /\b(dress|dresses|top|tops|shirt|shirts|pant|pants|trouser|trousers|skirt|skirts|sweater|sweaters|hoodie|hoodies|blazer|blazers|cardigan|cardigans|jacket|jackets|coat|coats|vest|vests|suit|suits|bodysuit|bodysuits|romper|rompers|jumpsuit|jumpsuits|jogger|joggers|sweatpant|sweatpants|jeans|onesie|onesies)\b/i;

export function parsePrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const cleaned = price.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function extractItemCorpus(item: Product): string {
  const audit = item.modestyAudit || {};
  const parts = [
    item.name || "",
    item.category || "",
    item.brand || "",
    item.color || "",
    item.occasion || "",
    Array.isArray(item.tags) ? item.tags.join(" ") : (item.tags || ""),
    audit.retailerDescriptionText || "",
    audit.auditSummary || "",
    audit.neckline || "",
    audit.sleeveLength || "",
    audit.hemline || "",
    audit.fit || ""
  ];
  return parts.join(" ").toLowerCase();
}

function matchesCategory(product: Product, selectedCategory: string): boolean {
  if (!selectedCategory || selectedCategory === 'all') return true;
  const cat = selectedCategory.toLowerCase();
  const text = extractItemCorpus(product);

  if (cat === 'tops') {
    return text.includes('top') || text.includes('shirt') || text.includes('tee') || text.includes('sweater') || text.includes('hoodie');
  }
  if (cat === 'dresses') {
    return text.includes('dress') || text.includes('gown') || text.includes('jumpsuit') || text.includes('romper') || text.includes('onesie');
  }
  if (cat === 'skirts') {
    return text.includes('skirt');
  }
  if (cat === 'pants') {
    return text.includes('pant') || text.includes('trouser') || text.includes('jeans') || text.includes('jogger') || text.includes('sweatpant');
  }
  if (cat === 'outerwear') {
    return text.includes('jacket') || text.includes('coat') || text.includes('blazer') || text.includes('cardigan') || text.includes('vest');
  }

  return text.includes(cat);
}

export function filterByOccasion(item: Product, occasion: string): boolean {
  if (!occasion || occasion === "All Occasions" || occasion === "all") return true;
  const text = extractItemCorpus(item);

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
    const corpus = extractItemCorpus(product);

    // Filter out non-apparel items (socks, jewelry, bags, footwear, accessories) EXCEPT when Undergarments occasion is selected
    const isUndergarments = filters.selectedOccasion === 'undergarments' || filters.selectedOccasion === 'Undergarments';
    if (!isUndergarments) {
      if (NON_APPAREL_REGEX.test(corpus) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
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
    const matchesSearch = !q || corpus.includes(q);

    if (!matchesSearch) {
      continue;
    }

    // A. HARD RULES FILTER (EXCLUSIONS)
    if (filters.noSlits && (/slit|split|side-open/i.test(corpus) || audit.hasSlit === true)) {
      continue;
    }
    if (filters.noOpenBack && (/cutout|cut-out|backless|strapless|tube|halter|off-shoulder/i.test(corpus) || audit.isOpenBack === true)) {
      continue;
    }
    if (filters.isOpaque && (/sheer|mesh|chiffon|lace|see-through|transparent|pareo/i.test(corpus) || audit.isSheer === true)) {
      continue;
    }

    // B. SLEEVE FILTER (IF SELECTIONS EXIST)
    if (filters.sleeveLengths && filters.sleeveLengths.length > 0) {
      const wantsLong = filters.sleeveLengths.some(s => /long|wrist|3\/4|Long Sleeve/i.test(s));
      const wantsShort = filters.sleeveLengths.some(s => /short|elbow|Short Sleeve/i.test(s));

      const isLong = /long sleeve|sweater|hoodie|cardigan|jacket|crewneck/i.test(corpus);
      const isShort = /short sleeve|t-shirt|tee/i.test(corpus);
      const isSleeveless = /tank|tube|camisole|sleeveless|bikini|strapless/i.test(corpus);

      if (wantsLong && !wantsShort && (isShort || isSleeveless)) continue;
      if (wantsShort && !wantsLong && (isLong || isSleeveless)) continue;
      if ((wantsLong || wantsShort) && isSleeveless) continue;
    }

    // C. BOTTOMS FILTER (IF SELECTIONS EXIST)
    if (filters.hemlines && filters.hemlines.length > 0) {
      const isSkirtOrDress = /skirt|dress|maxi/i.test(corpus);
      const isPants = /pant|trouser|jean|legging|sweatpant|jogger|cargo/i.test(corpus);

      const wantsSkirt = filters.hemlines.some(b => /skirt|dress|maxi|floor|ankle|Maxi Skirt \/ Dress/i.test(b));
      const wantsPants = filters.hemlines.some(b => /pant|trouser|jean|legging|sweatpant|jogger|cargo|Pants \/ Trousers/i.test(b));

      if (wantsSkirt && !wantsPants && isPants) continue;
      if (wantsPants && !wantsSkirt && isSkirtOrDress) continue;
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

      const corpus = extractItemCorpus(product);
      const isUndergarments = filters.selectedOccasion === 'undergarments' || filters.selectedOccasion === 'Undergarments';
      if (!isUndergarments && NON_APPAREL_REGEX.test(corpus) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
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
