// scripts/ingestStore.mjs
import fs from 'fs';

async function fetchFullStoreCatalog(storeBaseUrl, brandName, productPathPrefix, maxPages = 10) {
  let allProducts = [];
  let page = 1;
  const limit = 250; // Max allowed per request by Shopify

  console.log(`Starting full catalog fetch for ${brandName}...`);

  while (page <= maxPages) {
    const endpoint = `${storeBaseUrl}/products.json?limit=${limit}&page=${page}`;
    try {
      const res = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (!res.ok) {
        console.warn(`Stopped at page ${page} for ${brandName} (Status: ${res.status})`);
        break;
      }

      const data = await res.json();
      const products = data.products || [];

      if (products.length === 0) {
        console.log(`Finished: No more items found on page ${page} for ${brandName}.`);
        break;
      }

      const mapped = products
        .filter(p => p.images && p.images.length > 0) // Only include items with images
        .map(p => {
          const title = p.title.toLowerCase();
          const body = (p.body_html || '').toLowerCase();
          const tags = (p.tags || []).map(t => String(t).toLowerCase());

          const hasSlit = title.includes('slit') || body.includes('slit');
          const isOpenBack = title.includes('backless') || title.includes('open back') || body.includes('open back');
          const isSheer = title.includes('mesh') || title.includes('sheer') || body.includes('sheer') || title.includes('lace');
          const isCrop = title.includes('crop') || tags.includes('crop') || title.includes('tank') || title.includes('bra');
          const isLongSleeve = title.includes('long sleeve') || title.includes('hoodie') || title.includes('sweater') || title.includes('jacket');
          const isMaxi = title.includes('maxi') || title.includes('pant') || title.includes('jogger') || title.includes('sweatpant');

          return {
            id: `${brandName.toLowerCase().replace(/\s+/g, '-')}-${p.id}`,
            name: p.title,
            brand: brandName,
            price: `$${p.variants?.[0]?.price || '29.99'} CAD`,
            originalUrl: `${storeBaseUrl}${productPathPrefix}/${p.handle}`,
            imageUrl: p.images[0].src,
            category: p.product_type || 'Apparel',
            tags: p.tags ? p.tags.slice(0, 5) : [],
            modestyAudit: {
              neckline: (title.includes('mock') || title.includes('high') || title.includes('turtle')) ? 'high' : 'crew',
              sleeveLength: isLongSleeve ? 'wrist' : 'short',
              hemline: isCrop ? 'mini' : isMaxi ? 'ankle' : 'midi',
              hasSlit: hasSlit,
              isOpenBack: isOpenBack,
              isSheer: isSheer,
              fit: (title.includes('oversized') || title.includes('relaxed') || title.includes('wide')) ? 'loose' : 'relaxed',
              modestyScore: (hasSlit || isOpenBack || isSheer || isCrop) ? 30 : 98
            }
          };
        });

      allProducts = allProducts.concat(mapped);
      console.log(`-> ${brandName} Page ${page}: fetched ${mapped.length} items (Total so far: ${allProducts.length})`);
      page++;
    } catch (err) {
      console.error(`Error on page ${page} for ${brandName}:`, err.message);
      break;
    }
  }

  return allProducts;
}

async function run() {
  // Pull full inventories (up to 10 pages x 250 = 2,500 items per store)
  const urbanPlanet = await fetchFullStoreCatalog('https://urban-planet.com', 'Urban Planet', '/products', 10);
  const ardene = await fetchFullStoreCatalog('https://ardene.com', 'Ardene', '/en-ca/products', 10);

  const combined = [...urbanPlanet, ...ardene];

  const fileContent = `// Auto-generated Full Catalog (${combined.length} items)
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalUrl: string;
  imageUrl: string;
  category: string;
  tags: string[];
  modestyAudit: {
    neckline: 'high' | 'crew' | 'scoop' | 'v-neck' | 'plunge';
    sleeveLength: 'wrist' | '3/4' | 'elbow' | 'short' | 'sleeveless';
    hemline: 'floor' | 'ankle' | 'midi' | 'knee' | 'mini';
    hasSlit: boolean;
    isOpenBack: boolean;
    isSheer: boolean;
    fit: 'loose' | 'relaxed' | 'fitted' | 'bodycon';
    modestyScore: number;
  };
}

export const mockProducts: Product[] = ${JSON.stringify(combined, null, 2)};
`;

  fs.writeFileSync('src/data/mockProducts.ts', fileContent);
  console.log(`\nInventory extraction complete! Saved ${combined.length} total active items to mockProducts.ts.`);
}

run();
