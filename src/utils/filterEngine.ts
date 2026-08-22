import { Product, ModestyFilterState, CalculatedMatch, Neckline, SleeveLength, Hemline } from '@/types/product';

const NON_APPAREL_REGEX = /\b(sock|socks|ring|rings|earring|earrings|necklace|bracelet|jewelry|scrunchie|scrunchies|hair|headband|bag|bags|tote|purse|backpack|wallet|perfume|fragrance|candle|shoe|shoes|slide|slides|sandal|sandals|boot|boots|sneaker|sneakers|gloss|lip|nail|polish)\b/i;
const APPAREL_KEYWORD_REGEX = /\b(dress|dresses|top|tops|shirt|shirts|pant|pants|trouser|trousers|skirt|skirts|sweater|sweaters|hoodie|hoodies|blazer|blazers|cardigan|cardigans|jacket|jackets|coat|coats|vest|vests|suit|suits|bodysuit|bodysuits|romper|rompers|jumpsuit|jumpsuits|jogger|joggers|sweatpant|sweatpants|jeans|onesie|onesies)\b/i;

const OCCASION_KEYWORDS: Record<string, string[]> = {
  'gymwear': ['active', 'gym', 'workout', 'athletic', 'legging', 'hoodie', 'top', 'tee', 'sweat', 'jacket', 'sport', 'track', 'jogger', 'fleece', 'onesie'],
  'graduation': ['dress', 'maxi', 'gown', 'formal', 'eid', 'event', 'satin', 'velvet', 'suit', 'blazer', 'graduation', 'skirt', 'luxe'],
  'wedding': ['dress', 'maxi', 'gown', 'formal', 'event', 'satin', 'velvet', 'suit', 'blazer', 'luxe'],
  'workwear': ['work', 'office', 'blazer', 'trouser', 'pant', 'shirt', 'button', 'blouse', 'suit', 'tailored', 'cardigan', 'sweater'],
  'school': ['casual', 'everyday', 'tee', 'top', 'jeans', 'sweater', 'cardigan', 'hoodie', 'denim', 'school', 'crew'],
  'casual': ['casual', 'everyday', 'tee', 'top', 'jeans', 'sweater', 'cardigan', 'hoodie', 'denim', 'crew'],
  'eid': ['dress', 'maxi', 'gown', 'formal', 'eid', 'event', 'satin', 'velvet', 'suit', 'blazer', 'skirt', 'luxe', 'kaftan', 'abaya']
};

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

function matchesOccasion(product: Product, selectedOccasion: string): boolean {
  if (!selectedOccasion || selectedOccasion === 'all') return true;
  const occ = selectedOccasion.toLowerCase();
  
  if (product.occasion && product.occasion.toLowerCase() === occ) return true;
  if (product.tags && product.tags.some(t => t.toLowerCase() === occ || t.toLowerCase().includes(occ))) return true;

  const keywords = OCCASION_KEYWORDS[occ];
  if (keywords) {
    const text = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`.toLowerCase();
    return keywords.some(kw => text.includes(kw));
  }

  return true;
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

    // Filter out non-apparel items (socks, jewelry, bags, footwear, accessories)
    const nameAndCat = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`;
    if (NON_APPAREL_REGEX.test(nameAndCat) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
      continue;
    }

    // Category filter (inclusive keyword matching)
    if (!matchesCategory(product, filters.selectedCategory)) {
      continue;
    }

    // Retailer filter
    if (filters.selectedRetailer && filters.selectedRetailer !== 'all' && product.brand.toLowerCase() !== filters.selectedRetailer.toLowerCase()) {
      continue;
    }

    // Occasion filter (inclusive keyword matching)
    if (!matchesOccasion(product, filters.selectedOccasion)) {
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
      const nameAndCat = `${product.name} ${product.category} ${(product.tags || []).join(' ')}`;
      if (NON_APPAREL_REGEX.test(nameAndCat) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
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
