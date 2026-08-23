# hercloset — Fashion Curated for Your Coverage

> **hercloset** bridges the modesty gap in mainstream e-commerce through real-time catalog aggregation, automated visual garment audits, and zero-leak coverage filters tailored to individual preferences.

---

## Features & Highlights

- **7-Point AI Vision Modesty Audit**: Interactive inspection modal with simulated computer vision bounding scans and tailored 7-point verification checklists (Leg Slits / Midriff Openings, Open Back & Cutouts, Fabric Opacity, Necklines, Sleeve Lengths, Hemlines, and Silhouette Fit).
- **Strict Whitelist Modesty Engine**: High-accuracy classification pipeline enforcing hard constraints for cutouts, leg slits, sheer fabrics, sleeve coverage, necklines, and midriff exposure (`noCropped`).
- **Garment-Aware Attribute Resolution**:
  - **Sleeve Classifier**: Prioritizes explicit T-shirt/tee terms over generic crewnecks.
  - **Hemline Classifier**: Distinguishes skirts/dresses (`Maxi / Floor`, `Midi`, `Mini`) from tops (`Standard Waist Length`, `Hip / Tunic Length`, `Cropped`).
  - **Silhouette Fit Classifier**: Detects ribbed, bodycon, tight, contour, and seamless fabrics (`Fitted / Bodycon` vs `Relaxed / Loose`).
  - **Legwear Scoping**: Ensures sleeve and neckline rules do not mistakenly disqualify Pants, Jeans, or Skirts.
  - **Maxi Skirts Only**: Strictly excludes skorts, shorts, and mini skirts under the *Skirts & Dresses* category.
- **Scoped Modest Match Pass-Rate Gauge**: Real-time circular progress ring calculating pass-rate relative specifically to the active Occasion + Category + Store scope.
- **AI Catalog Tagging Engine**: Node.js script (`scripts/tagCatalog.js`) classifying 5,000+ raw catalog items into structured JSON schema (`src/data/catalog_tagged.json`).
- **Pinterest Masonry Grid Layout**: Responsive asymmetrical product card grid with warm earth tone aesthetics and direct store purchase links.

---

## Getting Started & How to Run

### Prerequisites

Ensure you have **Node.js** (v18.x or v20.x+) and **npm** installed on your system.

### 1. Install Dependencies

Clone the repository and install project packages:

```bash
git clone https://github.com/heba-rah/hercloset.git
cd hercloset
npm install
```

### 2. (Optional) Run the AI Catalog Tagging Script

To re-classify or tag raw catalog items into `catalog_tagged.json`:

```bash
node scripts/tagCatalog.js
```

### 3. Start the Local Development Server

Run Next.js in development mode with Turbopack:

```bash
npm run dev
```

Open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches Next.js dev server on port 3000 |
| `npm run build` | Compiles optimized Next.js production build |
| `npm run start` | Runs the compiled production build locally |
| `node scripts/tagCatalog.js` | Runs the AI catalog classification pipeline |

---

## Project Architecture

```text
hercloset/
├── scripts/
│   └── tagCatalog.js             # Node.js catalog tagging & classification script
├── src/
│   ├── app/
│   │   ├── globals.css           # Global CSS design tokens & overflow rules
│   │   ├── layout.tsx            # Root layout wrapper
│   │   └── page.tsx              # Main store feed, pagination, and scoped gauge state
│   ├── components/
│   │   ├── AuditModal.tsx        # AI Vision Bounding Scan & tailored 7-Point Audit modal
│   │   ├── AuthLandingPage.tsx   # Grand entrance landing hero & account auth modal
│   │   ├── ClosetTopShelf.tsx    # Wardrobe top shelf, subcategory pills & match ring dial
│   │   ├── Header.tsx            # Navigation header & search query bar
│   │   ├── ModestyFilters.tsx    # Session preferences & hard constraint toggles
│   │   ├── PermanentProfileModal.tsx # User profile setup modal
│   │   └── PinterestGrid.tsx     # Asymmetrical Pinterest-style product feed
│   ├── data/
│   │   ├── catalog_tagged.json   # Classifed 5,000-item tagged dataset
│   │   └── mockProducts.ts       # Raw catalog source products
│   ├── types/
│   │   └── product.ts            # TypeScript interfaces & type definitions
│   └── utils/
│       ├── filterEngine.ts       # Master filter engine & attribute resolution functions
│       └── filters.ts            # Strict modesty whitelist classification engine
└── README.md
```

---



*hercloset — Fashion Curated for Your Coverage*
