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
const APPAREL_KEYWORD_REGEX = /\b(dress|dresses|top|tops|shirt|shirts|pant|pants|trouser|trousers|skirt|skirts|sweater|sweaters|hoodie|hoodies|blazer|blazers|cardigan|cardigans|jacket|jackets|coat|coats|vest|vests|suit|suits|bodysuit|bodysuits|romper|rompers|jumpsuit|jumpsuits|jogger|joggers|sweatpant|sweatpants|jeans)\b/i;

export function filterAndScoreProducts(
  products: Product[],
  filters: ModestyFilterState
): CalculatedMatch[] {
  const matches: CalculatedMatch[] = [];

  for (const product of products) {
    const audit = product.modestyAudit;
    const matchReasons: string[] = [];
    const warnings: string[] = [];

    // Filter out non-apparel items (socks, jewelry, bags, footwear, accessories)
    const nameAndCat = `${product.name} ${product.category} ${product.tags.join(' ')}`;
    if (NON_APPAREL_REGEX.test(nameAndCat) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
      continue;
    }

    // Category filter
    if (filters.selectedCategory !== 'all' && product.category !== filters.selectedCategory) {
      continue;
    }

    // Retailer filter
    if (filters.selectedRetailer !== 'all' && product.brand.toLowerCase() !== filters.selectedRetailer.toLowerCase()) {
      continue;
    }

    // Occasion filter
    if (filters.selectedOccasion !== 'all' && product.occasion !== filters.selectedOccasion) {
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
      product.tags.some(t => t.toLowerCase().includes(q)) ||
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
    if (filters.noSlits && audit.hasSlit) {
      passedFilters = false;
      warnings.push('Failed "No Slits" rule (AI detected leg slit)');
      scorePenalty += 35;
    } else if (!audit.hasSlit) {
      matchReasons.push('Verified no thigh or side slits');
    }

    // Hard Constraint Check 2: Open Back
    if (filters.noOpenBack && audit.isOpenBack) {
      passedFilters = false;
      warnings.push('Failed "No Open Back" rule (AI detected back cutout)');
      scorePenalty += 35;
    } else if (!audit.isOpenBack) {
      matchReasons.push('Verified full back coverage');
    }

    // Hard Constraint Check 3: Sheerness
    if (filters.isOpaque && audit.isSheer) {
      passedFilters = false;
      warnings.push('Failed "100% Opaque" rule (AI detected sheer fabric)');
      scorePenalty += 30;
    } else if (!audit.isSheer) {
      matchReasons.push('Verified 100% opaque fabric');
    }

    // Neckline matching
    if (filters.necklines.length > 0) {
      if (filters.necklines.includes(audit.neckline)) {
        matchReasons.push(`Neckline (${audit.neckline.toUpperCase()}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.necklines.map(n => NECKLINE_RANK[n]));
        const actualRank = NECKLINE_RANK[audit.neckline];
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 12;
          warnings.push(`Neckline (${audit.neckline}) lower than preferred`);
        }
      }
    }

    // Sleeve length matching
    if (filters.sleeveLengths.length > 0) {
      if (filters.sleeveLengths.includes(audit.sleeveLength)) {
        matchReasons.push(`Sleeve length (${audit.sleeveLength}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.sleeveLengths.map(s => SLEEVE_RANK[s]));
        const actualRank = SLEEVE_RANK[audit.sleeveLength];
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 14;
          warnings.push(`Sleeve (${audit.sleeveLength}) shorter than requested`);
        }
      }
    }

    // Hemline matching
    if (filters.hemlines.length > 0) {
      if (filters.hemlines.includes(audit.hemline)) {
        matchReasons.push(`Hemline (${audit.hemline}) matches preference`);
      } else {
        const preferredRank = Math.max(...filters.hemlines.map(h => HEMLINE_RANK[h]));
        const actualRank = HEMLINE_RANK[audit.hemline];
        if (actualRank < preferredRank) {
          const diff = preferredRank - actualRank;
          scorePenalty += diff * 15;
          warnings.push(`Hemline (${audit.hemline}) shorter than requested`);
        }
      }
    }

    // Fit matching
    if (filters.fits.length > 0 && !filters.fits.includes(audit.fit)) {
      scorePenalty += 10;
      warnings.push(`Fit (${audit.fit}) differs from preferred`);
    } else if (filters.fits.length > 0 && filters.fits.includes(audit.fit)) {
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

  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
