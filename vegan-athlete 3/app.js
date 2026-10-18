const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450"><rect width="100%" height="100%" fill="#dfe8e3"/><text x="50%" y="50%" text-anchor="middle" fill="#0e2a22" font-family="sans-serif" font-size="28">Image coming soon</text></svg>');

/* White line icons shown on branded tiles (set "icon" on a product) */
const ICONS = {
  shoe: '<path d="M6 38c1-7 3-12 6-16 3 4 6 5 9 2l3-5c6 5 14 9 22 11 7 2 12 4 14 8"/><path d="M6 38h54c2 3 0 7-5 7l-25 4c-10 1-18 1-21-1-3-2-4-6-3-10z"/><path d="M27 23l3 3M32 25l3 3M37 27l3 3M15 34l13-5M20 37l14-5"/>',
  trainer: '<path d="M5 41c0-4 1-9 3-13l2-5c1-2 3-2 4-1l4 4c2 2 5 2 7 0l4-4c1-1 3-1 4 0l9 11 14 4c4 1 7 4 7 7v2H5z"/><path d="M5 47h58M27 26l3 4M32 23l3 4M37 25l3 4M5 41h58"/>',
  climbing: '<path d="M9 40c-1-8 1-15 5-20l4 3c8 2 18 4 27 8 7 3 13 7 14 11 1 3-2 5-6 4l-29 1c-8 0-14-2-15-7z"/><path d="M11 43c12 2 30 1 44-1M14 20l-2-6M26 25l-3 13M35 28l-3 11M23 25l7 1M32 28l7 2"/>',
  bib: '<path d="M14 32h36l4 24H38l-6-14-6 14H10z"/><path d="M20 32l2-22c0-3 4-3 4 0l2 18M44 32l-2-22c0-3-4-3-4 0l-2 18"/><path d="M11 51h14M39 51h14"/>',
  boot: '<path d="M6 38c0-7 2-13 5-17 3 3 7 4 11 2l3-4c6 5 15 9 24 11 6 2 10 4 11 8H6z"/><path d="M6 38v3h55v-3M11 41v6M20 41v6M42 41v6M52 41v6M27 23l3 3M32 25l3 3M37 27l3 3"/>',
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
  bat: '<g transform="rotate(35 32 32)"><path d="M29 3h6v19h-6z"/><path d="M24 22h16v31c0 5-3 8-8 8s-8-3-8-8z"/><path d="M29 9h6M29 15h6"/></g>',
  helmet: '<path d="M10 36c0-14 10-24 23-24s21 9 21 22v4H10z"/><path d="M16 38v8c0 6 4 10 10 10h12c6 0 10-4 11-10l1-8M16 46h34M27 38v18M38 38v18"/>',
  pads: '<rect x="18" y="6" width="28" height="52" rx="8"/><path d="M27 6v52M37 6v52M18 22h28M18 42h28"/>',
  cricketball: '<circle cx="32" cy="32" r="24"/><path d="M20 12c8 12 8 28 0 40M44 12c-8 12-8 28 0 40M22 18l-4 2M23 26l-5 1M23 34l-5-1M22 42l-4-2M42 18l4 2M41 26l5 1M41 34l5-1M42 42l4-2"/>',
  shinpad: '<path d="M20 8c8-3 16-3 24 0l-2 34c-1 8-5 14-10 14s-9-6-10-14z"/><path d="M24 16c5-2 11-2 16 0M25 26h14M26 36h12"/>',
  keeperglove: '<path d="M16 42V26c0-3 5-3 5 0v-14c0-3 5-3 5 0V8c0-3 5-3 5 0v4c0-3 5-3 5 0v4c0-3 5-3 5 0v14l4-5c2-3 7 0 5 3l-8 13v5z"/><path d="M15 44h33v12H15z"/><path d="M15 50h33M24 28v12M31 28v12M38 28v12"/>',
  saddle: '<path d="M4 24c4-4 12-5 22-4l22 2c6 1 10 3 10 7 0 3-4 4-10 4-12 0-26-2-36-5-6-1-9-3-8-4z"/><path d="M20 34l8 8h12l6-9M34 42v14M26 57h16"/>',
  bikehelmet: '<path d="M5 42c0-16 13-28 29-28 14 0 25 9 26 22 0 4-2 6-6 6z"/><path d="M14 30l10 3M23 21l8 9M37 17l3 11M50 22l-5 9M18 42l7 13h10l7-13"/>',
  bartape: '<ellipse cx="20" cy="32" rx="10" ry="20"/><ellipse cx="20" cy="32" rx="4" ry="8"/><path d="M20 12h22c7 0 10 9 10 20s-3 20-10 20H20M42 52l16 6"/>',
  cyclingshoe: '<path d="M5 40c0-7 2-12 6-16 4 3 8 3 12 0l4-4c8 6 18 10 28 12 5 1 7 4 7 8z"/><path d="M5 40h57v4H5zM27 44h15v5H27z"/><circle cx="34" cy="29" r="4"/><path d="M21 31l7-4M40 31l7 3"/>',
  stumps: '<path d="M18 16v42M32 16v42M46 16v42M15 12h15M34 12h15"/>',
  tag: '<path d="M8 8h22l26 26-22 22L8 30z"/><circle cx="20" cy="20" r="4"/>'
};

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* Amazon country switch: US visitors go to amazon.com, everyone else to amazon.co.uk */
const AMAZON = {
  uk: { label: "UK", flag: "\u{1F1EC}\u{1F1E7}", host: "www.amazon.co.uk", tag: "veganathlet01-21" },
  us: { label: "US", flag: "\u{1F1FA}\u{1F1F8}", host: "www.amazon.com",   tag: "veganathlet01-20" }
};
const US_ZONES = /^(America\/(New_York|Chicago|Denver|Phoenix|Los_Angeles|Anchorage|Adak|Boise|Detroit|Juneau|Sitka|Metlakatla|Nome|Yakutat|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)|Pacific\/Honolulu)$/;
function guessRegion() {
  try { const saved = localStorage.getItem("va-region"); if (saved && AMAZON[saved]) return saved; } catch (e) {}
  try { if (US_ZONES.test(Intl.DateTimeFormat().resolvedOptions().timeZone || "")) return "us"; } catch (e) {}
  return "uk";
}
let REGION = guessRegion();
function productUrl(p) {
  if (p.retailer !== "Amazon" || REGION === "uk") return p.url;
  const r = AMAZON[REGION];
  return `https://${r.host}/s?k=${encodeURIComponent(p.name)}&tag=${r.tag}`;
}
function addRegionSwitch(rerender) {
  const bar = document.querySelector("header.site .wrap");
  if (!bar || document.getElementById("region-switch")) return;
  const wrap = document.createElement("label");
  wrap.className = "region-switch"; wrap.id = "region-switch";
  wrap.innerHTML = `<span>Shopping from</span><select aria-label="Choose your country">${Object.entries(AMAZON).map(([k, r]) => `<option value="${k}"${k === REGION ? " selected" : ""}>${r.flag} ${r.label}</option>`).join("")}</select>`;
  wrap.querySelector("select").addEventListener("change", e => {
    REGION = e.target.value;
    try { localStorage.setItem("va-region", REGION); } catch (err) {}
    rerender();
  });
  const allLink = bar.querySelector('a[href="index.html"]:not(.logo)');
  bar.insertBefore(wrap, allLink || null);
}

async function load() {
  const res = await fetch("products.json?v=" + Date.now(), { cache: "no-store" });
  if (!res.ok) throw new Error("products.json returned " + res.status);
  return res.json();
}

function productCard(p) {
  return `<article class="card">
    ${p.image
      ? `<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`
      : `<div class="brand-tile${p.gender ? " brand-tile--" + esc(p.gender) : ""}" role="img" aria-label="${esc(p.name)}"><svg class="brand-icon" viewBox="0 0 64 64" aria-hidden="true">${ICONS[p.icon] || ICONS.tag}</svg><span class="brand-row"><span class="brand-name${p.terrain ? " has-tag" : ""}" style="--len:${(p.brand || p.retailer).length}">${esc(p.brand || p.retailer)}</span>${p.terrain ? `<span class="brand-terrain">${esc(p.terrain)}</span>` : ""}</span><span class="brand-where">Available on ${esc(p.retailer)}</span></div>`}
    <div class="card-body">
      <h3>${esc(p.name)}</h3>
      ${p.price ? `<p class="price">${esc(p.price)} <span>at ${esc(p.retailer)}</span></p>` : ""}
      <a class="btn" href="${esc(productUrl(p))}" target="_blank" rel="sponsored nofollow noopener">${p.price ? "View at " + esc(p.retailer) : "Check price on " + esc(p.retailer)}</a>
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
    const render = () => { list.innerHTML = items.length ? items.map(productCard).join("") : "<p>Products coming soon.</p>"; };
    render();
    if (items.some(p => p.retailer === "Amazon")) addRegionSwitch(render);
  }
})();
