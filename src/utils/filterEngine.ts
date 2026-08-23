import { Product, ModestyFilterState, CalculatedMatch, ModestyProfile } from '@/types/product';

export function parsePrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const cleaned = String(price).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

export function extractItemCorpus(item: Product): string {
  const audit = item.modestyAudit || {};
  return [
    item.name || (item as any).title || '',
    item.category || '',
    (item as any).subcategory || '',
    audit.retailerDescriptionText || (item as any).description || '',
    (item as any).details || '',
    Array.isArray((item as any).features) ? (item as any).features.join(' ') : ((item as any).features || ''),
    Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || '')
  ].join(' ').toLowerCase();
}

export function getItemCorpus(item: Product): string {
  return extractItemCorpus(item);
}

export function getProductSleeveAttribute(product: Product): string {
  const text = getItemCorpus(product);

  // 1. Explicit Sleeveless
  if (/\b(vest|tank|sleeveless|tube|halter|strapless|cami|camisole|spaghetti strap|corset|bandeau)\b/i.test(text)) {
    return "sleeveless";
  }

  // 2. Explicit Outerwear & Sweaters (Always Long / Wrist)
  if (/\b(coat|pea coat|trench|jacket|parka|blazer|puffer|windbreaker|shacket|hoodie|sweater|cardigan|sweatshirt|crewneck|pullover|turtleneck|long sleeve|long-sleeve|longsleeve)\b/i.test(text)) {
    return "wrist";
  }

  // 3. Explicit Short Sleeve
  if (/\b(short sleeve|short-sleeve|tee|t-shirt|polo|cap sleeve)\b/i.test(text)) {
    return "short";
  }

  // Fallback
  return product.modestyAudit?.sleeveLength || "short";
}

export function matchSubcategory(item: Product, subcategory?: string): boolean {
  if (!subcategory || subcategory === 'All Types' || subcategory === 'all') return true;
  const text = getItemCorpus(item);

  switch (subcategory) {
    case 'Tops & Blouses':
      return /\b(top|blouse|shirt|tee|t-shirt|polo|button-up|tunic|camisole|tank|cami)\b/i.test(text) && 
             !/\b(hoodie|sweater|jacket|fleece)\b/i.test(text);
    case 'Sweaters & Hoodies': {
      const isSleevelessOrTank = /\b(tank|tank top|one shoulder|one-shoulder|tube|cami|camisole|sleeveless|vest|halter|corset|bandeau|crop top|bra\b)\b/i.test(text);
      if (isSleevelessOrTank) return false;
      return /\b(hoodie|sweater|cardigan|sweatshirt|crewneck|fleece|pullover|turtleneck)\b/i.test(text) ||
             (/\b(crochet|knit)\b/i.test(text) && /\b(long sleeve|sweater|cardigan|pullover)\b/i.test(text));
    }
    case 'Pants & Jeans':
      return /\b(pant|pants|jean|jeans|denim|trouser|trousers|legging|leggings|jogger|cargo|sweatpant)\b/i.test(text);
    case 'Skirts & Dresses':
      return /\b(skirt|skirts|dress|dresses|maxi|midi|gown|wrap dress)\b/i.test(text) && 
             !/\b(hoodie|sweater|sweatshirt|pant|jogger|jean|jacket)\b/i.test(text);
    case 'Jackets & Outerwear':
      return /\b(jacket|coat|parka|trench|blazer|puffer|windbreaker|shacket|vest)\b/i.test(text);
    case 'Shoes & Sandals':
      return /\b(shoe|shoes|sneaker|sneakers|boot|boots|sandal|sandals|heel|heels|slide|slides|slipper|loafers|mule)\b/i.test(text);
    case 'Accessories':
      return /\b(scarf|bandana|belt|hat|cap|beanie|bag|tote|purse|sunglasses|gloves|jewelry)\b/i.test(text);
    default:
      return true;
  }
}

export function matchOccasion(item: Product, occasion?: string): boolean {
  if (!occasion || occasion === 'All Occasions' || occasion === 'all') return true;
  const text = getItemCorpus(item);

  switch (occasion) {
    case 'Gymwear':
    case 'gymwear':
      if (/\b(onesie|slipper|pj|pajama|dress|skirt|heels|jean|denim|bra\b|thong)\b/i.test(text)) return false;
      return /\b(active|gym|athletic|workout|legging|leggings|runner|jogger|track|fleece|biker|sweatpant|sports bra)\b/i.test(text);
    case 'Everyday Wear':
    case 'casual':
    case 'everyday':
      if (/\b(onesie|slipper|pj|pajama|bra\b|underwear|panties|thong|bikini|swim|lingerie)\b/i.test(text)) return false;
      return /\b(tee|t-shirt|shirt|jeans|denim|hoodie|sweater|crewneck|sweatshirt|cardigan|cargo|jacket|pant)\b/i.test(text);
    case 'Sleepwear':
    case 'sleepwear':
      return /\b(onesie|onesies|pajama|pajamas|pj|pjs|robe|nightgown|sleep|slippers|loungewear)\b/i.test(text);
    case 'Undergarments':
    case 'undergarments':
      if (/\b(hoodie|sweater|fleece|jacket|shoe|slipper|sneaker|onesie|jumpsuit)\b/i.test(text)) return false;
      return /\b(bra|bras|underwear|panties|panty|thong|boxer|boxers|bralette|shapewear|undies)\b/i.test(text);
    case 'Going Out':
    case 'going_out':
      return /\b(dress|dresses|blazer|corset|satin|silk|bodysuit|party|skirt|evening|blouse|cocktail|heels)\b/i.test(text);
    default:
      return true;
  }
}

export function filterByOccasion(item: Product, occasion: string): boolean {
  return matchOccasion(item, occasion);
}

export function passesStrictModestyFilter(
  item: Product,
  filters?: ModestyFilterState | ModestyProfile | null,
  occasion?: string,
  retailer?: string,
  subcategory?: string
): boolean {
  const store = retailer || (filters as ModestyFilterState)?.selectedRetailer;
  if (store && store !== 'All Stores' && store !== 'all' && item.brand.toLowerCase() !== store.toLowerCase()) {
    return false;
  }

  const activeOccasion = occasion || (filters as ModestyFilterState)?.selectedOccasion;
  if (!matchOccasion(item, activeOccasion)) return false;

  const activeSubcategory = subcategory || (filters as ModestyFilterState)?.selectedSubcategory;
  if (!matchSubcategory(item, activeSubcategory)) return false;

  // Shoes & Sandals or Accessories tabs display all items in those categories without modesty filtering
  if (activeSubcategory === 'Shoes & Sandals' || activeSubcategory === 'Accessories') {
    return true;
  }

  if (!filters) return true;

  const text = getItemCorpus(item);

  const noCutouts = Boolean('noCutouts' in filters ? filters.noCutouts : (filters as ModestyProfile).noOpenBack);
  const noSlits = Boolean(filters.noSlits);
  const opaqueOnly = Boolean('opaqueOnly' in filters ? filters.opaqueOnly : (filters as ModestyProfile).isOpaque);

  if (noCutouts && /\b(backless|open back|cutout|cut-out|strapless|tube|halter)\b/i.test(text)) return false;
  if (noSlits && /\b(slit|slits|split|split hem|side slit)\b/i.test(text)) return false;
  if (opaqueOnly && /\b(sheer|mesh|chiffon|lace|transparent|see-through|unlined)\b/i.test(text)) return false;

  // Disqualify asymmetrical / one-shoulder / bare-shoulder tops unless explicitly long sleeved
  const isBareShoulderOrSleeveless = /\b(one shoulder|one-shoulder|off-the-shoulder|off-shoulder|cold-shoulder|asymmetrical top|tank|tank top|tube|tube top|halter|halterneck|strapless|camisole|cami|sleeveless|spaghetti strap|corset|bandeau|vest|vests)\b/i.test(text);

  if (isBareShoulderOrSleeveless) {
    const hasExplicitLongSleeve = /\b(long sleeve|long-sleeve|longsleeve)\b/i.test(text);
    if (!hasExplicitLongSleeve) {
      return false; // Instantly reject all one-shoulder / tank / sleeveless items
    }
  }

  const sleeves: string[] = Array.isArray((filters as any).sleeves)
    ? (filters as any).sleeves
    : (Array.isArray(filters.sleeveLengths) ? filters.sleeveLengths : []);

  const wantsLong = sleeves.some(s => ['wrist', 'long', '3/4', 'Long Sleeve'].includes(s));
  const wantsShort = sleeves.some(s => ['short', 'cap', 'elbow', 'Short Sleeve'].includes(s));

  const resolvedSleeve = getProductSleeveAttribute(item);
  const isExplicitSleeveless = resolvedSleeve === "sleeveless" || isBareShoulderOrSleeveless || /\b(vest|vests|tank|tanks|camisole|cami|sleeveless|spaghetti|tube|halter|strapless|romper)\b/i.test(text);
  const isExplicitLong = resolvedSleeve === "wrist" || /\b(coat|pea coat|trench|jacket|parka|blazer|puffer|windbreaker|shacket|long sleeve|long-sleeve|longsleeve|sweatshirt|hoodie|sweater|cardigan|coat|turtleneck|parka|trench|pullover)\b/i.test(text);
  const isExplicitShort = resolvedSleeve === "short" || /\b(short sleeve|short-sleeve|shortsleeve|t-shirt|tee|tees|polo)\b/i.test(text);

  if ((wantsLong || wantsShort) && isExplicitSleeveless && !isExplicitLong) return false;
  
  // Strict Long Sleeve check: item MUST positively contain a verified long-sleeve term
  if (wantsLong && !wantsShort) {
    if (!isExplicitLong || isBareShoulderOrSleeveless) {
      return false;
    }
  }

  if (wantsShort && !wantsLong && (!isExplicitShort || isExplicitLong)) return false;

  return true;
}

export function filterAndScoreProducts(
  products: Product[],
  filters: ModestyFilterState
): CalculatedMatch[] {
  const filtered = products.filter(item =>
    passesStrictModestyFilter(
      item,
      filters,
      filters.selectedOccasion,
      filters.selectedRetailer,
      filters.selectedSubcategory
    )
  );

  return filtered.map(item => {
    const audit = item.modestyAudit || {};
    const score = typeof item.modesty_score === 'number' ? item.modesty_score : (audit.modestyScore || 90);
    return {
      product: item,
      matchPercentage: Math.max(70, Math.min(100, Math.round(score))),
      passedFilters: true,
      matchReasons: ['Verified against active modesty preferences'],
      warnings: []
    };
  });
}
