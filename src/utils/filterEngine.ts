import { Product, ModestyFilterState, CalculatedMatch, ModestyProfile } from '@/types/product';

const NON_APPAREL_REGEX = /\b(sock|socks|ring|rings|earring|earrings|necklace|bracelet|jewelry|scrunchie|scrunchies|hair|headband|bag|bags|tote|purse|backpack|wallet|perfume|fragrance|candle|shoe|shoes|slide|slides|sandal|sandals|boot|boots|sneaker|sneakers|gloss|lip|nail|polish)\b/i;
const APPAREL_KEYWORD_REGEX = /\b(dress|dresses|top|tops|shirt|shirts|pant|pants|trouser|trousers|skirt|skirts|sweater|sweaters|hoodie|hoodies|blazer|blazers|cardigan|cardigans|jacket|jackets|coat|coats|vest|vests|suit|suits|bodysuit|bodysuits|romper|rompers|jumpsuit|jumpsuits|jogger|joggers|sweatpant|sweatpants|jeans|onesie|onesies)\b/i;

export function parsePrice(price: string | number): number {
  if (typeof price === 'number') return price;
  const cleaned = String(price).replace(/[^0-9.]/g, '');
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

export function passesStrictModestyFilter(
  item: Product,
  modestyProfile?: ModestyFilterState | ModestyProfile | null,
  selectedOccasion?: string,
  selectedStore?: string
): boolean {
  // 1. Store Filter
  if (selectedStore && selectedStore !== "All Stores" && selectedStore !== "all") {
    if (item.brand.toLowerCase() !== selectedStore.toLowerCase()) {
      return false;
    }
  }

  const audit = item.modestyAudit || {};
  const corpus = extractItemCorpus(item);
  const text = corpus;

  // 2. Occasion Filter (Hard Separation)
  if (selectedOccasion && selectedOccasion !== "All Occasions" && selectedOccasion !== "all") {
    switch (selectedOccasion) {
      case "Gymwear":
      case "gymwear":
        if (/\b(onesie|slipper|pajama|pj|jean|denim|dress|skirt|blazer|heels|bra\b|thong)\b/i.test(text)) return false;
        if (!/\b(active|gym|athletic|workout|legging|leggings|jogger|joggers|runner|track|biker|fleece|sweatpant|sweatpants)\b/i.test(text)) return false;
        break;

      case "Everyday Wear":
      case "everyday":
        if (/\b(onesie|slipper|pajama|pj|bra\b|underwear|panties|thong|bikini|swim|lingerie)\b/i.test(text)) return false;
        if (!/\b(tee|t-shirt|shirt|jeans|denim|hoodie|sweater|crewneck|sweatshirt|cardigan|cargo|jacket|coat|pant|trouser)\b/i.test(text)) return false;
        break;

      case "Sleepwear":
      case "sleepwear":
        if (!/\b(onesie|onesies|pajama|pajamas|pj|pjs|robe|robes|nightgown|sleep|slippers|loungewear)\b/i.test(text)) return false;
        break;

      case "Undergarments":
      case "undergarments":
        if (/\b(onesie|jumpsuit|hoodie|jacket|sweater|fleece|jean|denim)\b/i.test(text)) return false;
        if (!/\b(bra|bras|underwear|panties|panty|thong|thongs|boxer|boxers|bralette|shapewear|undies)\b/i.test(text)) return false;
        break;

      case "Going Out":
      case "going_out":
        if (!/\b(dress|dresses|blazer|corset|satin|silk|bodysuit|party|halter|skirt|evening|blouse|cocktail|heels)\b/i.test(text)) return false;
        break;
    }
  }

  // If no modesty profile or guest with no rules, allow item
  if (!modestyProfile) {
    return true;
  }

  const noSlits = Boolean(modestyProfile.noSlits);
  const noCutouts = Boolean('noCutouts' in modestyProfile ? modestyProfile.noCutouts : modestyProfile.noOpenBack);
  const opaqueOnly = Boolean('opaqueOnly' in modestyProfile ? modestyProfile.opaqueOnly : modestyProfile.isOpaque);
  const sleeves: string[] = Array.isArray((modestyProfile as any).sleeves)
    ? (modestyProfile as any).sleeves
    : (Array.isArray(modestyProfile.sleeveLengths) ? modestyProfile.sleeveLengths : []);
  const necklines: string[] = Array.isArray(modestyProfile.necklines) ? (modestyProfile.necklines as string[]) : [];

  const hasActiveRules = noSlits || noCutouts || opaqueOnly || (sleeves && sleeves.length > 0) || (necklines && necklines.length > 0);
  if (!hasActiveRules) {
    return true;
  }

  // 3. Absolute Hard Disqualifications (Zero Tolerance)
  const isCroppedOrRevealing = Boolean(item.is_cropped) || Boolean(item.has_cutouts) || Boolean(item.is_sheer) || Boolean(audit.isOpenBack) || Boolean(audit.isSheer) || /\b(crop|cropped|cutout|cut-out|cut out|backless|open back|strapless|tube|halter|bandeau|corset|bustier|off-shoulder|cold-shoulder|split front|slit front|sheer|mesh|chiffon|lace|transparent|see-through|unlined)\b/i.test(text);
  if (isCroppedOrRevealing && (noCutouts || opaqueOnly)) {
    return false;
  }

  const hasSlits = Boolean(item.has_slits) || Boolean(audit.hasSlit) || /\b(slit|slits|split|split hem|side slit)\b/i.test(text);
  if (noSlits && hasSlits) {
    return false;
  }

  // 4. Sleeve Whitelist (Strict Enforcement)
  const wantsLong = sleeves.some((s: string) => /long|wrist|3\/4|Long Sleeve/i.test(s));
  const wantsShort = sleeves.some((s: string) => /short|elbow|Short Sleeve/i.test(s));

  const isExplicitSleeveless = item.sleeve === 'sleeveless' || audit.sleeveLength === 'sleeveless' || /\b(vest|vests|tank|tanks|camisole|cami|sleeveless|spaghetti|tube|halter|strapless|romper|playsuit)\b/i.test(text);
  const isExplicitLong = item.sleeve === 'long' || audit.sleeveLength === 'wrist' || audit.sleeveLength === '3/4' || /\b(long sleeve|long-sleeve|longsleeve|sweatshirt|hoodie|sweater|cardigan|jacket|coat|turtleneck|parka|trench|windbreaker|blazer|pullover)\b/i.test(text);
  const isExplicitShort = item.sleeve === 'short' || audit.sleeveLength === 'short' || audit.sleeveLength === 'elbow' || /\b(short sleeve|short-sleeve|shortsleeve|t-shirt|tee|tees|polo|short-sleeve top)\b/i.test(text);

  // If any sleeve requirement is active, reject ALL sleeveless/vests immediately
  if ((wantsLong || wantsShort) && isExplicitSleeveless && !isExplicitLong) {
    return false;
  }

  // If user selected ONLY Long Sleeve:
  if (wantsLong && !wantsShort) {
    // MUST match positive long-sleeve keyword; reject generic "tops/shirts"
    if (!isExplicitLong || isExplicitShort) {
      return false;
    }
  }

  // If user selected ONLY Short Sleeve:
  if (wantsShort && !wantsLong) {
    if (!isExplicitShort || isExplicitLong) {
      return false;
    }
  }

  // 5. Neckline Whitelist
  const wantsHigh = necklines.some(n => /high|high neck|High Neck/i.test(n));
  const wantsCrew = necklines.some(n => /crew|crewneck|Crewneck/i.test(n));
  const isLowCut = audit.neckline === 'v-neck' || audit.neckline === 'plunge' || /\b(v-neck|v neck|deep v|scoop|scoop neck|square neck|sweetheart|plunge|open collar|button-up classic top)\b/i.test(text);

  if ((wantsHigh || wantsCrew) && isLowCut) {
    return false;
  }

  return true;
}

export function filterByOccasion(item: Product, occasion: string): boolean {
  return passesStrictModestyFilter(item, null, occasion, "all");
}

export function filterAndScoreProducts(
  products: Product[],
  filters: ModestyFilterState
): CalculatedMatch[] {
  let matches: CalculatedMatch[] = [];

  for (const product of products) {
    const audit = product.modestyAudit || {};
    const corpus = extractItemCorpus(product);

    // Apply master strict whitelist filter
    if (!passesStrictModestyFilter(product, filters, filters.selectedOccasion, filters.selectedRetailer)) {
      continue;
    }

    // Non-apparel filter EXCEPT when Undergarments occasion is selected
    const isUndergarments = filters.selectedOccasion === 'undergarments' || filters.selectedOccasion === 'Undergarments';
    if (!isUndergarments) {
      if (NON_APPAREL_REGEX.test(corpus) && !APPAREL_KEYWORD_REGEX.test(product.name)) {
        continue;
      }
    }

    // Category filter
    if (!matchesCategory(product, filters.selectedCategory)) {
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

    // Hemline/Bottoms Filter Check
    if (filters.hemlines && filters.hemlines.length > 0) {
      const isSkirtOrDress = /skirt|dress|maxi/i.test(corpus);
      const isPants = /pant|trouser|jean|legging|sweatpant|jogger|cargo/i.test(corpus);

      const wantsSkirt = filters.hemlines.some(b => /skirt|dress|maxi|floor|ankle|Maxi Skirt \/ Dress/i.test(b));
      const wantsPants = filters.hemlines.some(b => /pant|trouser|jean|legging|sweatpant|jogger|cargo|Pants \/ Trousers/i.test(b));

      if (wantsSkirt && !wantsPants && isPants) continue;
      if (wantsPants && !wantsSkirt && isSkirtOrDress) continue;
    }

    // Match score evaluation
    let score = typeof product.modesty_score === 'number' ? product.modesty_score : (audit.modestyScore || 90);
    const hasSlits = Boolean(product.has_slits) || Boolean(audit.hasSlit) || /\b(slit|slits|split|split hem|side slit)\b/i.test(corpus);
    const hasCutouts = Boolean(product.has_cutouts) || Boolean(audit.isOpenBack) || /\b(cutout|cut-out|backless|strapless|tube|halter)\b/i.test(corpus);
    const isSheer = Boolean(product.is_sheer) || Boolean(audit.isSheer) || /\b(sheer|mesh|chiffon|lace|transparent)\b/i.test(corpus);

    if (hasSlits) score -= 15;
    if (hasCutouts) score -= 15;
    if (isSheer) score -= 20;

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
      if (!passesStrictModestyFilter(product, null, filters.selectedOccasion, filters.selectedRetailer)) {
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

      const audit = product.modestyAudit || {};
      let score = typeof product.modesty_score === 'number' ? product.modesty_score : (audit.modestyScore || 90);

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
