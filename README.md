# ARpresentation

Proof-of-concept product site: interactive 3D viewer + AR ("View in your room") built on
[`<model-viewer>`](https://modelviewer.dev). Models are GLB files exported from SolidWorks.

- `public/products.json` – product data (kept separate from presentation; later replaceable by Supabase)
- `public/models/` – GLB models
- `src/` – page code

```
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
