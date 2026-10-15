const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="100%" height="100%" fill="#dfe8e3"/><text x="50%" y="50%" text-anchor="middle" fill="#0e2a22" font-family="sans-serif" font-size="28">Image coming soon</text></svg>');

/* White line icons shown on branded tiles (set "icon" on a product) */
const ICONS = {
  shoe: '<path d="M6 38c1-7 3-12 6-16 3 4 6 5 9 2l3-5c6 5 14 9 22 11 7 2 12 4 14 8"/><path d="M6 38h54c2 3 0 7-5 7l-25 4c-10 1-18 1-21-1-3-2-4-6-3-10z"/><path d="M27 23l3 3M32 25l3 3M37 27l3 3M15 34l13-5M20 37l14-5"/>',
  racket: '<ellipse cx="38" cy="22" rx="16" ry="20" transform="rotate(40 38 22)"/><path d="M26 36L9 57M24 37l4 4M27 11l20 22M22 20l17 18M34 6l15 16M22 30l12 12M44 10L26 30M51 18L34 37M38 6L23 22"/>',
  socks: '<path d="M22 6h16v26l12 10c4 3 4 9 0 12s-8 3-12 0L20 40c-2-2-3-4-3-7V6h5z"/><path d="M17 14h21"/>',
  top: '<path d="M22 8l-14 8 5 12 6-3v31h26V25l6 3 5-12-14-8c-2 4-6 6-10 6s-8-2-10-6z"/>',
  shorts: '<path d="M12 10h40l4 40H38l-6-24-6 24H8z"/><path d="M12 18h40"/>',
  ball: '<circle cx="32" cy="32" r="24"/><path d="M8 32h48M32 8v48M15 15c9 9 9 25 0 34M49 15c-9 9-9 25 0 34"/>',
  bottle: '<path d="M26 4h12v8l4 6v40H22V18l4-6z"/><path d="M22 28h20M22 44h20"/>',
  bag: '<rect x="10" y="20" width="44" height="36" rx="5"/><path d="M24 20v-6a8 8 0 0 1 16 0v6M10 34h44"/>',
  cap: '<path d="M8 40c0-13 10-22 23-22s21 9 21 22z"/><path d="M52 40h7c3 0 3 5 0 5H8v-5M31 18v-3M24 20c2 6 2 14 1 20M38 20c-2 6-2 14-1 20"/>',
  glove: '<path d="M18 58V30l-6-8c-2-3 2-6 4-4l4 4V10c0-3 5-3 5 0v14-18c0-3 5-3 5 0v18-16c0-3 5-3 5 0v16-12c0-3 5-3 5 0v26c0 8-4 14-10 16v6z"/>',
  watch: '<rect x="18" y="18" width="28" height="28" rx="7"/><path d="M24 18l2-12h12l2 12M24 46l2 12h12l2-12M32 26v7l5 3"/>',
  dumbbell: '<path d="M6 26v12M12 20v24h6V20zM46 20v24h6V20zM58 26v12M18 32h28"/>',
  board: '<path d="M32 4c10 8 14 22 14 30s-4 20-14 26C22 54 18 42 18 34S22 12 32 4z"/><path d="M32 12v44"/>',
  tag: '<path d="M8 8h22l26 26-22 22L8 30z"/><circle cx="20" cy="20" r="4"/>'
};

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

async function load() {
  const res = await fetch("products.json?v=" + Date.now(), { cache: "no-store" });
  if (!res.ok) throw new Error("products.json returned " + res.status);
  return res.json();
}

function productCard(p) {
  return `<article class="card">
    ${p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`
      : `<div class="brand-tile" role="img" aria-label="${esc(p.name)}"><svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true">${ICONS[p.icon] || ICONS.tag}</svg><span class="brand-name">${esc(p.brand || p.retailer)}</span><span class="brand-where">Available on ${esc(p.retailer)}</span></div>`}
    <div class="card-body">
      <h3>${esc(p.name)}</h3>
      ${p.price ? `<p class="price">${esc(p.price)} <span>at ${esc(p.retailer)}</span></p>` : ""}
      <a class="btn" href="${esc(p.url)}" target="_blank" rel="sponsored nofollow noopener">${p.price ? "View at " + esc(p.retailer) : "Check price on " + esc(p.retailer)}</a>
    </div>
  </article>`;
}

(async () => {
  let data;
  try { data = await load(); }
  catch (e) {
    const box = document.getElementById("categories") || document.getElementById("products");
    if (box) box.innerHTML = "<p>Sorry, the product list couldn't load. Please refresh the page.</p>";
    console.error(e);
    return;
  }
  const pills = document.getElementById("sport-buttons");
  if (pills) pills.innerHTML = data.categories.map(c => `<a class="pill" href="category.html?c=${c.slug}">${esc(c.name)}</a>`).join("");
  const home = document.getElementById("categories");
  if (home) {
    home.innerHTML = data.categories.map(c => {
      const n = data.products.filter(p => p.category === c.slug).length;
      return `<a class="tile" href="category.html?c=${c.slug}">
        <h3>${esc(c.name)}</h3><p>${esc(c.blurb)}</p><span>${n} product${n === 1 ? "" : "s"}</span></a>`;
    }).join("");
  }
  const list = document.getElementById("products");
  if (list) {
    const slug = new URLSearchParams(location.search).get("c");
    const cat = data.categories.find(c => c.slug === slug);
    if (!cat) { list.innerHTML = "<p>Category not found. <a href='index.html'>Back to all sports</a></p>"; return; }
    document.title = cat.name + " – Vegan Athlete";
    document.getElementById("cat-title").textContent = cat.name;
    document.getElementById("cat-blurb").textContent = cat.blurb;
    const items = data.products.filter(p => p.category === slug);
    list.innerHTML = items.length ? items.map(productCard).join("") : "<p>Products coming soon.</p>";
  }
})();
