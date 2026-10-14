const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="100%" height="100%" fill="#dfe8e3"/><text x="50%" y="50%" text-anchor="middle" fill="#0e2a22" font-family="sans-serif" font-size="28">Image coming soon</text></svg>');

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

async function load() {
  const res = await fetch("products.json");
  return res.json();
}

function productCard(p) {
  return `<article class="card">
    <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
    <div class="card-body">
      <h3>${esc(p.name)}</h3>
      <p class="price">${esc(p.price)} <span>at ${esc(p.retailer)}</span></p>
      <a class="btn" href="${esc(p.url)}" target="_blank" rel="sponsored nofollow noopener">View at ${esc(p.retailer)}</a>
    </div>
  </article>`;
}

(async () => {
  const data = await load();
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
