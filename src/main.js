import '@google/model-viewer';

const viewer = document.getElementById('viewer');
const statusEl = document.getElementById('status');

function setStatus(text, isError = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle('error', isError);
}

// Product data is kept separate from presentation: swap this for Supabase later.
async function loadProducts() {
  const res = await fetch(`${import.meta.env.BASE_URL}products.json`);
  if (!res.ok) throw new Error(`products.json: HTTP ${res.status}`);
  return (await res.json()).products;
}

viewer.addEventListener('progress', (e) => {
  document.getElementById('progress-fill').style.width = `${e.detail.totalProgress * 100}%`;
});

viewer.addEventListener('load', () => {
  setStatus(viewer.canActivateAR ? '' : 'AR is not available on this device or browser. The 3D viewer still works.');
});

viewer.addEventListener('error', (e) => {
  setStatus(`Could not load the model: ${e.detail?.sourceError?.message ?? 'unknown error'}`, true);
});

viewer.addEventListener('ar-status', (e) => {
  if (e.detail.status === 'failed') setStatus('AR could not start on this device.', true);
});

try {
  const [product] = await loadProducts();
  document.title = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description ?? '';
  viewer.alt = `3D model of ${product.name}`;
  viewer.src = `${import.meta.env.BASE_URL}${product.model}`;
} catch (err) {
  setStatus(`Could not load product data: ${err.message}`, true);
}
