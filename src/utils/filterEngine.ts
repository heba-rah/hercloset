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

export function resolveSleeveLength(item: Product): string {
  const text = getItemCorpus(item);

  // Explicit T-Shirts & Short Sleeves (Check BEFORE generic crewneck/top)
  if (/\b(t-shirt|t shirt|tee|tees|short sleeve|short-sleeve|shortsleeve|polo|cap sleeve)\b/i.test(text)) {
    return "Short Sleeve";
  }

  // Explicit Sleeveless
  if (/\b(tank|tank top|sleeveless|tube top|tube|halter|strapless|cami|camisole|spaghetti strap|corset|bandeau|vest|vests)\b/i.test(text)) {
    return "Sleeveless";
  }

  // Explicit Long Sleeves
  if (/\b(long sleeve|long-sleeve|longsleeve|hoodie|sweater|cardigan|sweatshirt|jacket|coat|parka|trench|blazer|pullover|turtleneck)\b/i.test(text)) {
    return "Wrist (Long Sleeve)";
  }

  return "Short Sleeve"; // Safe default for general tops
}

export function getProductSleeveAttribute(product: Product): string {
  const resolved = resolveSleeveLength(product);
  if (resolved === "Wrist (Long Sleeve)") return "wrist";
  if (resolved === "Sleeveless") return "sleeveless";
  return "short";
}

export function resolveHemline(item: Product): string {
  const text = getItemCorpus(item);

  // Tops / Shirts / Outerwear Lengths
  const isTop = /\b(shirt|tee|t-shirt|top|hoodie|sweater|cardigan|blouse|jacket|coat|tank)\b/i.test(text);
  const isSkirtOrDress = /\b(skirt|dress|gown)\b/i.test(text);

  if (/\b(crop|cropped|short waist|midriff|baby tee)\b/i.test(text)) {
    return "Cropped (Above Waist)";
  }

  if (isSkirtOrDress) {
    if (/\b(maxi|floor|ankle)\b/i.test(text)) return "Maxi / Floor";
    if (/\b(midi|calf)\b/i.test(text)) return "Midi";
    if (/\b(mini|short skirt|micro)\b/i.test(text)) return "Mini";
    return "Midi";
  }

  if (isTop) {
    if (/\b(tunic|longline|oversized)\b/i.test(text)) return "Hip / Tunic Length";
    return "Standard Waist Length";
  }

  return "Standard Length";
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
    case 'Pants & Jeans': {
      // 1. Reject tops and outerwear unless explicitly legwear
      const isTopOrOuterwear = /\b(top|shirt|blouse|jacket|coat|vest|shacket|corset|camisole|cami|tube|tank|tee|t-shirt|sweater|hoodie|cardigan|pullover|bra\b|bralette)\b/i.test(text);
      const isExplicitLegwear = /\b(jean|jeans|pant|pants|trouser|trousers|legging|leggings|jogger|joggers|cargo|cargos|sweatpant|sweatpants|bottoms)\b/i.test(text);
      if (isTopOrOuterwear && !isExplicitLegwear) return false;

      // 2. Reject skirts and dresses made of denim
      if (/\b(skirt|dress|jumper dress|pinafore)\b/i.test(text)) return false;

      // 3. Positive match only for true legwear / pants / jeans / bottoms
      return isExplicitLegwear || /\b(denim|flare|wide leg|straight leg|skinny leg|bootcut|slack|slacks)\b/i.test(text);
    }
    case 'Skirts & Dresses': {
      // Reject tops, hoodies, pants, and jackets unless explicitly a skirt or dress
      if (/\b(hoodie|sweater|sweatshirt|pant|pants|jogger|jean|jeans|jacket|coat|vest|blouse|tee|t-shirt)\b/i.test(text) && !/\b(skirt|skirts|dress|dresses|gown)\b/i.test(text)) {
        return false;
      }

      const isSkirt = /\b(skirt|skirts)\b/i.test(text);

      // For skirts specifically: ONLY present Maxi / Long skirts and reject mini skirts!
      if (isSkirt) {
        const isMiniOrShortSkirt = /\b(mini|mini skirt|short skirt|micro|mini-skirt|above knee)\b/i.test(text);
        if (isMiniOrShortSkirt) return false;
        return true;
      }

      const isDress = /\b(dress|dresses|gown|wrap dress)\b/i.test(text);
      if (isDress) {
        const isMiniDress = /\b(mini|mini dress|short dress|micro dress)\b/i.test(text);
        if (isMiniDress) return false;
        return true;
      }

      return false;
    }
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

export function isGarmentCropped(item: Product): boolean {
  const text = getItemCorpus(item);
  return Boolean(item.is_cropped) || /\b(crop|cropped|crop top|short waist|midriff|bra top|bandeau|baby tee)\b/i.test(text);
}

export function hasCutoutsOrBareShoulders(item: Product): boolean {
  const text = getItemCorpus(item);
  return /\b(off-the-shoulder|off the shoulder|off-shoulder|off shoulder|cold-shoulder|cold shoulder|one-shoulder|one shoulder|drop shoulder cutout|cutout|cut-out|cut out|slit back|open back|backless|strapless|tube|halter|bandeau|asymmetrical neck)\b/i.test(text);
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
  const noCropped = Boolean('noCropped' in filters && typeof (filters as any).noCropped !== 'undefined' ? (filters as any).noCropped : true);
  const opaqueOnly = Boolean('opaqueOnly' in filters ? filters.opaqueOnly : (filters as ModestyProfile).isOpaque);

  if ((noCropped || noCutouts) && isGarmentCropped(item)) return false;
  if (noCutouts && (hasCutoutsOrBareShoulders(item) || /\b(backless|open back|cutout|cut-out|strapless|tube|halter)\b/i.test(text))) return false;
  if (noSlits && /\b(slit|slits|split|split hem|side slit)\b/i.test(text)) return false;
  if (opaqueOnly && /\b(sheer|mesh|chiffon|lace|transparent|see-through|unlined)\b/i.test(text)) return false;

  // For skirts specifically: ONLY present Maxi skirts and reject mini/short skirts
  const isSkirt = /\b(skirt|skirts)\b/i.test(text);
  if (isSkirt) {
    const isMiniOrShortSkirt = /\b(mini|mini skirt|short skirt|micro|mini-skirt|above knee)\b/i.test(text);
    if (isMiniOrShortSkirt) return false;
  }

  // Sleeve and Neckline constraints ONLY apply to upper-body garments (tops, blouses, sweaters, hoodies, outerwear, dresses, bodysuits, jumpsuits).
  // They must NOT disqualify legwear (Pants & Jeans), skirts, shoes, or accessories!
  const isUpperBodyGarment = /\b(top|blouse|shirt|tee|t-shirt|polo|button-up|tunic|camisole|tank|cami|hoodie|sweater|cardigan|sweatshirt|crewneck|fleece|pullover|turtleneck|jacket|coat|parka|trench|blazer|puffer|windbreaker|shacket|vest|dress|dresses|gown|bodysuit|romper|onesie|jumpsuit)\b/i.test(text);

  if (isUpperBodyGarment) {
    const isBareShoulderOrSleeveless = hasCutoutsOrBareShoulders(item) || /\b(one shoulder|one-shoulder|off-the-shoulder|off-shoulder|cold-shoulder|asymmetrical top|tank|tank top|tube|tube top|halter|halterneck|strapless|camisole|cami|sleeveless|spaghetti strap|corset|bandeau|vest|vests)\b/i.test(text);

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
    const isExplicitLong = resolvedSleeve === "wrist" || /\b(long sleeve|long-sleeve|longsleeve)\b/i.test(text);
    const isExplicitShort = resolvedSleeve === "short" || /\b(t-shirt|t shirt|tee|tees|short sleeve|short-sleeve|shortsleeve|polo)\b/i.test(text);

    if ((wantsLong || wantsShort) && isExplicitSleeveless && !isExplicitLong) return false;
    
    // Strict Long Sleeve check: item MUST positively contain a verified long-sleeve term
    if (wantsLong && !wantsShort) {
      if (!isExplicitLong || isBareShoulderOrSleeveless || isExplicitShort) {
        return false;
      }
    }

    if (wantsShort && !wantsLong && (!isExplicitShort || isExplicitLong)) return false;
  }

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
