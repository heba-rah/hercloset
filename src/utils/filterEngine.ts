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

export function matchSubcategory(item: Product, subcategory?: string): boolean {
  if (!subcategory || subcategory === 'All Types' || subcategory === 'all') return true;
  const text = getItemCorpus(item);

  switch (subcategory) {
    case 'Tops & Blouses':
      return /\b(top|blouse|shirt|tee|t-shirt|polo|button-up|tunic|camisole|tank|cami)\b/i.test(text) && 
             !/\b(hoodie|sweater|jacket|fleece)\b/i.test(text);
    case 'Sweaters & Hoodies':
      return /\b(hoodie|sweater|cardigan|sweatshirt|crewneck|fleece|knit|pullover)\b/i.test(text);
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

  const sleeves: string[] = Array.isArray((filters as any).sleeves)
    ? (filters as any).sleeves
    : (Array.isArray(filters.sleeveLengths) ? filters.sleeveLengths : []);

  const wantsLong = sleeves.some(s => ['wrist', 'long', '3/4', 'Long Sleeve'].includes(s));
  const wantsShort = sleeves.some(s => ['short', 'cap', 'elbow', 'Short Sleeve'].includes(s));
  const isExplicitSleeveless = /\b(vest|vests|tank|tanks|camisole|cami|sleeveless|spaghetti|tube|halter|strapless|romper)\b/i.test(text);
  const isExplicitLong = /\b(long sleeve|long-sleeve|longsleeve|sweatshirt|hoodie|sweater|cardigan|jacket|coat|turtleneck|parka|trench|windbreaker|blazer|pullover)\b/i.test(text);
  const isExplicitShort = /\b(short sleeve|short-sleeve|shortsleeve|t-shirt|tee|tees|polo)\b/i.test(text);

  if ((wantsLong || wantsShort) && isExplicitSleeveless && !isExplicitLong) return false;
  if (wantsLong && !wantsShort && (!isExplicitLong || isExplicitShort)) return false;
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
