const fs = require('fs');
const path = require('path');

// Helper to clean price to number
function parsePrice(price) {
  if (typeof price === 'number') return price;
  const cleaned = String(price).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

// Function to classify item into strict schema
function classifyItem(item) {
  const title = item.name || item.title || "";
  const category = item.category || "";
  const brand = item.brand || item.store || "";
  const tags = Array.isArray(item.tags) ? item.tags.join(" ") : (item.tags || "");
  const audit = item.modestyAudit || {};
  const desc = audit.retailerDescriptionText || "";

  const text = `${title} ${category} ${brand} ${tags} ${desc}`.toLowerCase();

  // 1. OCCASION CLASSIFICATION
  let occasion = "Everyday Wear";
  if (/\b(onesie|onesies|pajama|pajamas|pj|pjs|robe|robes|nightgown|sleep|slippers|loungewear)\b/i.test(text)) {
    occasion = "Sleepwear";
  } else if (/\b(bra|bras|underwear|panties|panty|thong|thongs|boxer|boxers|bralette|shapewear|undies)\b/i.test(text) && !/onesie|jumpsuit|hoodie|jacket|sweater/i.test(text)) {
    occasion = "Undergarments";
  } else if (/\b(active|gym|athletic|workout|legging|leggings|sports bra|runner|jogger|joggers|track|fleece|biker|sweatpant|sweatpants)\b/i.test(text) && !/onesie|slipper|pajama|pj|jean|denim/i.test(text)) {
    occasion = "Gymwear";
  } else if (/\b(dress|dresses|blazer|corset|satin|silk|bodysuit|party|halter|skirt|evening|blouse|cocktail)\b/i.test(text)) {
    occasion = "Going Out";
  } else if (/\b(tee|t-shirt|crewneck|sweatshirt|jeans|jean|denim|hoodie|sweater|cardigan|cargo|casual|top)\b/i.test(text)) {
    occasion = "Everyday Wear";
  }

  // 2. SLEEVE CLASSIFICATION
  let sleeve = "short";
  const isLong = /long sleeve|sweater|hoodie|cardigan|jacket|crewneck|wrist|3\/4/i.test(text) || audit.sleeveLength === 'wrist' || audit.sleeveLength === '3/4';
  const isSleeveless = /tank|tube|camisole|sleeveless|bikini|strapless|halter|spaghetti/i.test(text) || audit.sleeveLength === 'sleeveless';
  if (isSleeveless) {
    sleeve = "sleeveless";
  } else if (isLong) {
    sleeve = "long";
  } else {
    sleeve = "short";
  }

  // 3. NECKLINE CLASSIFICATION
  let neckline = "crewneck";
  if (/turtleneck|mock neck|high neck/i.test(text) || audit.neckline === 'high') {
    neckline = "high_neck";
  } else if (/v-neck|v neck/i.test(text) || audit.neckline === 'v-neck' || audit.neckline === 'plunge') {
    neckline = "v_neck";
  } else if (/open collar|button collar|collared/i.test(text)) {
    neckline = "open_collar";
  } else if (/strapless|tube|off-shoulder/i.test(text)) {
    neckline = "strapless";
  } else {
    neckline = "crewneck";
  }

  // 4. BOOLEAN FEATURES
  const is_cropped = /crop|cropped|baby tee|short top/i.test(text);
  const has_slits = Boolean(audit.hasSlit) || /slit|split|side-open/i.test(text);
  const has_cutouts = Boolean(audit.isOpenBack) || /cutout|cut-out|backless|strapless|tube|halter|off-shoulder/i.test(text);
  const is_sheer = Boolean(audit.isSheer) || /sheer|mesh|chiffon|lace|see-through|transparent|pareo/i.test(text);

  // 5. MODESTY SCORE CALCULATION (0 - 100)
  let modesty_score = typeof audit.modestyScore === 'number' ? audit.modestyScore : 90;
  if (has_slits) modesty_score -= 20;
  if (has_cutouts) modesty_score -= 25;
  if (is_sheer) modesty_score -= 30;
  if (is_cropped) modesty_score -= 15;
  if (sleeve === 'sleeveless') modesty_score -= 10;
  if (neckline === 'strapless' || neckline === 'v_neck') modesty_score -= 10;
  modesty_score = Math.max(10, Math.min(100, Math.round(modesty_score)));

  return {
    id: item.id || `item-${Math.random().toString(36).substring(2, 9)}`,
    title: title,
    price: parsePrice(item.price),
    store: brand || "HerCloset Partner Store",
    image: item.imageUrl || item.image || "",
    occasion: occasion,
    sleeve: sleeve,
    neckline: neckline,
    is_cropped: is_cropped,
    has_slits: has_slits,
    has_cutouts: has_cutouts,
    is_sheer: is_sheer,
    modesty_score: modesty_score
  };
}

// Main execution
function processCatalog() {
  const inputFilePath = path.join(__dirname, '../src/data/mockProducts.ts');
  const outputJsonPath = path.join(__dirname, '../src/data/catalog_tagged.json');

  console.log(`Reading raw products from ${inputFilePath}...`);
  const rawContent = fs.readFileSync(inputFilePath, 'utf8');

  // Find array start after export const mockProducts
  const marker = 'export const mockProducts: Product[] = ';
  const markerIndex = rawContent.indexOf(marker);
  if (markerIndex === -1) {
    console.error("Could not locate mockProducts array in mockProducts.ts");
    process.exit(1);
  }

  const jsonStartIndex = rawContent.indexOf('[', markerIndex + marker.length - 2);
  const jsonEndIndex = rawContent.lastIndexOf('];');
  const jsonString = rawContent.substring(jsonStartIndex, jsonEndIndex + 1);

  const rawProducts = JSON.parse(jsonString);

  console.log(`Classifying ${rawProducts.length} items with structured AI schema...`);
  const taggedCatalog = rawProducts.map(classifyItem);

  fs.writeFileSync(outputJsonPath, JSON.stringify(taggedCatalog, null, 2));
  console.log(`Successfully generated ${outputJsonPath} with ${taggedCatalog.length} tagged items!`);
}

processCatalog();
