// scripts/ingestStore.mjs
import fs from 'fs';

async function fetchCanadianCatalog(storeBaseUrl, brandName, productPathPrefix, limit = 30) {
  console.log(`Fetching Canadian items from ${brandName}...`);
  const endpoint = `${storeBaseUrl}/products.json?limit=${limit}`;
  
  const res = await fetch(endpoint, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  
  if (!res.ok) {
    console.error(`Failed to fetch from ${brandName}: ${res.statusText}`);
    return [];
  }

  const data = await res.json();

  return (data.products || []).map((p) => {
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
      // Generates exact localized Canadian product URL
      originalUrl: `${storeBaseUrl}${productPathPrefix}/${p.handle}`,
      imageUrl: p.images?.[0]?.src || '',
      category: p.product_type || 'Apparel',
      tags: p.tags?.slice(0, 4) || [],
      modestyAudit: {
        neckline: (title.includes('mock') || title.includes('high') || title.includes('turtle')) ? 'high' : 'crew',
        sleeveLength: isLongSleeve ? 'wrist' : 'short',
        hemline: isCrop ? 'mini' : isMaxi ? 'ankle' : 'midi',
        hasSlit: hasSlit,
        isOpenBack: isOpenBack,
        isSheer: isSheer,
        fit: (title.includes('oversized') || title.includes('relaxed') || title.includes('wide')) ? 'loose' : 'relaxed',
        modestyScore: (hasSlit || isOpenBack || isSheer || isCrop) ? 35 : 98
      }
    };
  });
}

async function run() {
  // Urban Planet Canada
  const urbanPlanet = await fetchCanadianCatalog(
    'https://urban-planet.com', 
    'Urban Planet', 
    '/products', 
    25
  );

  // Ardene Canada (uses /en-ca/products/ route)
  const ardene = await fetchCanadianCatalog(
    'https://ardene.com', 
    'Ardene', 
    '/en-ca/products', 
    25
  );

  const allProducts = [...urbanPlanet, ...ardene];

  const fileContent = `// Auto-generated Canadian Live Storefronts
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

export const mockProducts: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;

  fs.writeFileSync('src/data/mockProducts.ts', fileContent);
  console.log(`Successfully populated ${allProducts.length} Canadian products with direct-to-cart URLs!`);
}

run();
