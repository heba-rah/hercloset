import { Product, ModestyFilterState, ModestyProfile } from '@/types/product';

// A. Full Item Corpus Extractor
export function getItemCorpus(item: Product): string {
  const audit = item.modestyAudit || {};
  return [
    item.name || (item as any).title || "",
    item.category || "",
    (item as any).subcategory || "",
    audit.retailerDescriptionText || (item as any).description || "",
    (item as any).details || "",
    Array.isArray((item as any).features) ? (item as any).features.join(" ") : ((item as any).features || ""),
    Array.isArray(item.tags) ? item.tags.join(" ") : (item.tags || "")
  ].join(" ").toLowerCase();
}

// B. Category Matcher
export function matchCategory(item: Product, cat?: string): boolean {
  if (!cat || cat === "All Types" || cat === "all") return true;
  const text = getItemCorpus(item);

  switch (cat) {
    case "Tops & Blouses":
      return /\b(top|blouse|shirt|tee|t-shirt|polo|button-up|tunic|camisole|tank|cami)\b/i.test(text) &&
        !/\b(hoodie|sweater|jacket|fleece)\b/i.test(text);
    case "Sweaters & Hoodies": {
      const isSleevelessOrTank = /\b(tank|tank top|one shoulder|one-shoulder|tube|cami|camisole|sleeveless|vest|halter|corset|bandeau|crop top|bra\b)\b/i.test(text);
      if (isSleevelessOrTank) return false;
      return /\b(hoodie|sweater|cardigan|sweatshirt|crewneck|fleece|pullover|turtleneck)\b/i.test(text) ||
        (/\b(crochet|knit)\b/i.test(text) && /\b(long sleeve|sweater|cardigan|pullover)\b/i.test(text));
    }
    case "Pants & Jeans":
      return /\b(pant|pants|jean|jeans|denim|trouser|trousers|legging|leggings|jogger|cargo|sweatpant)\b/i.test(text);
    case 'Skirts & Dresses': {
      // 1. HARD REJECT all skorts, shorts, tops, hoodies, pants, jeans, and jackets
      const isDisqualified = /\b(skort|skorts|short|shorts|biker short|hoodie|sweater|sweatshirt|pant|pants|trouser|trousers|legging|leggings|jogger|joggers|jean|jeans|jacket|coat|vest|blouse|tee|t-shirt|top|flare|foldover)\b/i.test(text);
      if (isDisqualified) return false;

      const isSkirt = /\b(skirt|skirts)\b/i.test(text);

      // For skirts specifically: ONLY present Maxi / Long skirts!
      if (isSkirt) {
        const isMiniOrShortSkirt = /\b(mini|mini skirt|short skirt|micro|mini-skirt|above knee|skort|skorts)\b/i.test(text);
        if (isMiniOrShortSkirt) return false;

        const isMaxiOrLongSkirt = /\b(maxi|maxi skirt|floor|floor length|ankle|ankle length|long skirt|full length|tiered|column|longline)\b/i.test(text);
        return isMaxiOrLongSkirt;
      }

      const isDress = /\b(dress|dresses|gown|wrap dress)\b/i.test(text);
      if (isDress) {
        const isMiniDress = /\b(mini|mini dress|short dress|micro dress|skort|skorts)\b/i.test(text);
        if (isMiniDress) return false;
        return true;
      }

      return false;
    }
    case "Jackets & Outerwear":
      return /\b(jacket|coat|parka|trench|blazer|puffer|windbreaker|shacket|vest)\b/i.test(text);
    case "Shoes & Sandals":
      return /\b(shoe|shoes|sneaker|sneakers|boot|boots|sandal|sandals|heel|heels|slide|slides|slipper|loafers|mule)\b/i.test(text);
    case "Accessories":
      return /\b(scarf|bandana|belt|hat|cap|beanie|bag|tote|purse|sunglasses|gloves|jewelry)\b/i.test(text);
    default:
      return true;
  }
}

// C. Occasion Matcher
export function matchOccasion(item: Product, occ?: string): boolean {
  if (!occ || occ === "All Occasions" || occ === "all") return true;
  const text = getItemCorpus(item);

  switch (occ) {
    case "Gymwear":
      if (/\b(onesie|slipper|pj|pajama|dress|skirt|heels|jean|denim|bra\b|thong)\b/i.test(text)) return false;
      return /\b(active|gym|athletic|workout|legging|leggings|runner|jogger|track|fleece|biker|sweatpant|sports bra)\b/i.test(text);
    case "Everyday Wear":
      if (/\b(onesie|slipper|pj|pajama|bra\b|thong|bikini|swim|lingerie)\b/i.test(text)) return false;
      return /\b(tee|t-shirt|shirt|jeans|denim|hoodie|sweater|crewneck|sweatshirt|cardigan|cargo|jacket|pant)\b/i.test(text);
    case "Sleepwear":
      return /\b(onesie|onesies|pajama|pajamas|pj|pjs|robe|nightgown|sleep|slippers|loungewear)\b/i.test(text);
    case "Undergarments":
      if (/\b(hoodie|sweater|fleece|jacket|shoe|slipper|sneaker|onesie|jumpsuit)\b/i.test(text)) return false;
      return /\b(bra|bras|underwear|panties|panty|thong|boxer|boxers|bralette|shapewear|undies)\b/i.test(text);
    case "Going Out":
      return /\b(dress|dresses|blazer|corset|satin|silk|bodysuit|party|skirt|evening|blouse|cocktail|heels)\b/i.test(text);
    default:
      return true;
  }
}

export function isGarmentCropped(item: Product): boolean {
  const text = getItemCorpus(item);
  return Boolean(item.is_cropped) || /\b(crop|cropped|crop top|short waist|midriff|bra top|bandeau|baby tee)\b/i.test(text);
}

// D. Strict Modesty Whitelist Filter
export function passesStrictModestyFilter(
  item: Product,
  profile?: ModestyFilterState | ModestyProfile | null
): boolean {
  if (!profile || Object.keys(profile).length === 0) return true;
  const text = getItemCorpus(item);

  const noSlits = Boolean(profile.noSlits);
  const noCutouts = Boolean('noCutouts' in profile ? profile.noCutouts : profile.noOpenBack);
  const noCropped = Boolean('noCropped' in profile && typeof (profile as any).noCropped !== 'undefined' ? (profile as any).noCropped : true);
  const opaqueOnly = Boolean('opaqueOnly' in profile ? profile.opaqueOnly : profile.isOpaque);

  // Exclude cuts / exposures / cropped
  if ((noCropped || noCutouts) && isGarmentCropped(item)) return false;
  if (noCutouts && /\b(crop|cropped|cutout|cut-out|cut out|backless|open back|strapless|tube|halter|bandeau|corset|bustier|off-shoulder|cold-shoulder|split front|slit front)\b/i.test(text)) return false;
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

  // Sleeve Enforcement (Applies ONLY to upper-body garments, not legwear/pants/jeans)
  const isUpperBodyGarment = /\b(top|blouse|shirt|tee|t-shirt|polo|button-up|tunic|camisole|tank|cami|hoodie|sweater|cardigan|sweatshirt|crewneck|fleece|pullover|turtleneck|jacket|coat|parka|trench|blazer|puffer|windbreaker|shacket|vest|dress|dresses|gown|bodysuit|romper|onesie|jumpsuit)\b/i.test(text);

  if (isUpperBodyGarment) {
    const sleeves: string[] = Array.isArray((profile as any).sleeves)
      ? (profile as any).sleeves
      : (Array.isArray(profile.sleeveLengths) ? profile.sleeveLengths : []);

    const wantsLong = sleeves.includes("Long Sleeve") || sleeves.includes("wrist") || sleeves.includes("3/4");
    const wantsShort = sleeves.includes("Short Sleeve") || sleeves.includes("short") || sleeves.includes("elbow");

    const isExplicitSleeveless = isBareShoulderOrSleeveless || /\b(vest|vests|tank|tanks|camisole|cami|sleeveless|spaghetti|tube|halter|strapless|romper|playsuit)\b/i.test(text);
    const isExplicitLong = /\b(long sleeve|long-sleeve|longsleeve|sweatshirt|hoodie|sweater|cardigan|jacket|coat|turtleneck|parka|trench|windbreaker|blazer|pullover)\b/i.test(text);
    const isExplicitShort = /\b(short sleeve|short-sleeve|shortsleeve|t-shirt|tee|tees|polo)\b/i.test(text);

    if ((wantsLong || wantsShort) && isExplicitSleeveless && !isExplicitLong) return false;
    
    // Strict Long Sleeve check: item MUST positively contain a verified long-sleeve term
    if (wantsLong && !wantsShort) {
      if (!isExplicitLong || isBareShoulderOrSleeveless) {
        return false;
      }
    }

    if (wantsShort && !wantsLong && (!isExplicitShort || isExplicitLong)) return false;

    // Neckline Enforcement
    const wantsHigh = (profile.necklines || []).includes("High Neck" as any) || (profile.necklines || []).includes("high" as any);
    const wantsCrew = (profile.necklines || []).includes("Crewneck" as any) || (profile.necklines || []).includes("crew" as any);
    if ((wantsHigh || wantsCrew) && /\b(v-neck|v neck|deep v|scoop|scoop neck|square neck|sweetheart|plunge|open collar)\b/i.test(text)) return false;
  }

  return true;
}
