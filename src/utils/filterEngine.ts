import { Product, ModestyFilterState, CalculatedMatch, Neckline, SleeveLength, Hemline, GarmentFit } from '@/types/product';

const SLEEVE_RANK: Record<SleeveLength, number> = {
  'wrist': 5,
  '3/4': 4,
  'elbow': 3,
  'short': 2,
  'sleeveless': 1
};

const HEMLINE_RANK: Record<Hemline, number> = {
  'floor': 5,
  'ankle': 4,
  'midi': 3,
  'knee': 2,
  'mini': 1
};

const NECKLINE_RANK: Record<Neckline, number> = {
  'high': 5,
  'crew': 4,
  'scoop': 3,
  'v-neck': 2,
  'plunge': 1
};

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

    // DEMO MODE 1: BROKEN KEYWORD SEARCH
    if (filters.demoMode === 'broken_keyword') {
      let naiveScore = audit.modestyScore;
      if (product.name.toLowerCase().includes('modest') || descStr.toLowerCase().includes('modest')) {
        naiveScore = 95;
        matchReasons.push('Tagged "Modest" in retailer catalog description');
      } else {
        matchReasons.push('Matched keyword search query');
      }

      if (audit.hasSlit) {
        warnings.push('🚨 Retailer search ignores hidden leg slit!');
      }
      if (audit.isOpenBack) {
        warnings.push('🚨 Retailer search ignores open back cutout!');
      }
      if (audit.isSheer) {
        warnings.push('🚨 Retailer search ignores sheer unlined fabric!');
      }

      matches.push({
        product,
        matchPercentage: naiveScore,
        passedFilters: true,
        matchReasons,
        warnings
      });
      continue;
    }

    // DEMO MODE 2: AI VISION AUDIT SEARCH
    let passedFilters = true;
    let scorePenalty = 0;

    // Hard Constraint Check 1: Slits
    if (filters.noSlits && audit.hasSlit === true) {
      passedFilters = false;
      warnings.push('Failed "No Slits" rule (AI detected leg slit)');
      scorePenalty += 35;
    } else {
      matchReasons.push('Verified no thigh or side slits');
    }

    // Hard Constraint Check 2: Open Back / Cutouts
    if (filters.noOpenBack && audit.isOpenBack === true) {
      passedFilters = false;
      warnings.push('Failed "No Cutouts / Open Back" rule (AI detected back cutout)');
      scorePenalty += 35;
    } else {
      matchReasons.push('Verified full back coverage & no cutouts');
    }

    // Hard Constraint Check 3: Sheerness / Opacity
    if (filters.isOpaque && audit.isSheer === true) {
      passedFilters = false;
      warnings.push('Failed "100% Opaque" rule (AI detected sheer fabric)');
      scorePenalty += 30;
    } else {
      matchReasons.push('Verified 100% opaque fabric');
    }

    // Neckline matching
    if (filters.necklines && filters.necklines.length > 0) {
      if (filters.necklines.includes(audit.neckline)) {
        matchReasons.push(`Neckline (${audit.neckline.toUpperCase()}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.necklines.map(n => NECKLINE_RANK[n] || 3));
        const actualRank = NECKLINE_RANK[audit.neckline] || 3;
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 10;
          warnings.push(`Neckline (${audit.neckline}) lower than preferred`);
        }
      }
    }

    // Sleeve length matching
    if (filters.sleeveLengths && filters.sleeveLengths.length > 0) {
      if (filters.sleeveLengths.includes(audit.sleeveLength)) {
        matchReasons.push(`Sleeve length (${audit.sleeveLength}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.sleeveLengths.map(s => SLEEVE_RANK[s] || 3));
        const actualRank = SLEEVE_RANK[audit.sleeveLength] || 3;
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 12;
          warnings.push(`Sleeve (${audit.sleeveLength}) shorter than requested`);
        }
      }
    }

    // Hemline matching
    if (filters.hemlines && filters.hemlines.length > 0) {
      if (filters.hemlines.includes(audit.hemline)) {
        matchReasons.push(`Hemline (${audit.hemline}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.hemlines.map(h => HEMLINE_RANK[h] || 3));
        const actualRank = HEMLINE_RANK[audit.hemline] || 3;
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 12;
          warnings.push(`Hemline (${audit.hemline}) shorter than requested`);
        }
      }
    }

    // Fit matching
    if (filters.fits && filters.fits.length > 0 && !filters.fits.includes(audit.fit)) {
      scorePenalty += 8;
      warnings.push(`Fit (${audit.fit}) differs from preferred`);
    } else if (filters.fits && filters.fits.length > 0 && filters.fits.includes(audit.fit)) {
      matchReasons.push(`Fit (${audit.fit}) matches preference`);
    }

    let calculatedPercent = Math.max(0, Math.min(100, Math.round(audit.modestyScore - scorePenalty)));
    if (!passedFilters) {
      calculatedPercent = Math.min(calculatedPercent, 58);
    }

    matches.push({
      product,
      matchPercentage: calculatedPercent,
      passedFilters,
      matchReasons,
      warnings
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
        matchPercentage: Math.max(40, Math.min(100, Math.round(score))),
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
