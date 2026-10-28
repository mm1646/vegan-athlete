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
  goggles: '<path d="M2 32h7M55 32h7M28 31c2-3 6-3 8 0"/><rect x="9" y="21" width="19" height="21" rx="9"/><rect x="36" y="21" width="19" height="21" rx="9"/>',
  swimcap: '<path d="M8 46c0-18 11-31 24-31s24 13 24 31z"/><path d="M8 46h48M22 20c5 7 7 16 7 26"/>',
  swimsuit: '<path d="M22 6v11c0 5-4 9-4 15v5l9 19h10l9-19v-5c0-6-4-10-4-15V6"/><path d="M22 17c3 5 7 7 10 7s7-2 10-7"/>',
  briefs: '<path d="M8 22h48l-5 13c-7 2-12 8-13 15H26c-1-7-6-13-13-15z"/><path d="M8 28h48"/>',
  kickboard: '<path d="M14 58V22c0-10 8-16 18-16s18 6 18 16v36z"/><rect x="23" y="15" width="18" height="7" rx="3.5"/>',
  pullbuoy: '<rect x="12" y="6" width="40" height="20" rx="10"/><rect x="12" y="38" width="40" height="20" rx="10"/><path d="M26 26v12M38 26v12"/>',
  fins: '<path d="M24 5h16v16l12 26c3 7-1 13-8 13H20c-7 0-11-6-8-13l12-26z"/><path d="M24 21h16M28 30l-3 26M36 30l3 26"/>',
  paddle: '<path d="M17 10c9-5 21-5 30 0 4 15 2 34-7 47H24c-9-13-11-32-7-47z"/><path d="M32 9v48M21 24h22M22 38h20"/>',
  snorkel: '<path d="M42 8v34c0 9-7 16-16 16h-10"/><path d="M36 6h12M16 52v12"/><rect x="8" y="24" width="22" height="14" rx="7"/>',
  hikingboot: '<path d="M14 6h18v20l12 6c8 3 14 6 16 12v6H6v-8c0-4 4-6 8-8z"/><path d="M6 50h54v6H6zM14 14h10M14 20h10M32 26l-6 6"/>',
  backpack: '<path d="M20 14c0-6 5-10 12-10s12 4 12 10"/><rect x="14" y="14" width="36" height="44" rx="9"/><path d="M22 34h20v14H22zM24 14v-2M40 14v-2"/>',
  poles: '<path d="M20 4l6 54M44 4l-6 54"/><path d="M17 4h7M40 4h7M18 16h8M38 16h8M22 50l8 2M42 50l-8 2"/>',
  headlamp: '<path d="M6 34c0-12 12-20 26-20s26 8 26 20"/><rect x="22" y="26" width="20" height="16" rx="4"/><circle cx="32" cy="34" r="4"/><path d="M32 46v8M24 44l-4 6M40 44l4 6"/>',
  filter: '<rect x="22" y="18" width="20" height="40" rx="5"/><path d="M26 18v-8h12v8M28 6h8M22 30h20M22 46h20"/>',
  ski: '<g transform="rotate(32 32 32)"><path d="M29 5c1-3 5-3 6 0v53a3 3 0 0 1-6 0z"/><path d="M27 32h10v6H27z"/></g><g transform="rotate(-32 32 32)"><path d="M29 5c1-3 5-3 6 0v53a3 3 0 0 1-6 0z"/><path d="M27 32h10v6H27z"/></g>',
  snowboard: '<rect x="20" y="4" width="24" height="56" rx="12"/><path d="M24 20h16M24 44h16M28 18v6M36 18v6M28 42v6M36 42v6"/>',
  binding: '<path d="M14 50h36c4 0 6-3 6-6V30l-10-6v14H22l-8 6z"/><path d="M14 50v6h42v-6M30 30h14M46 24l4-12"/>',
  skigoggles: '<path d="M8 22c16-6 32-6 48 0 3 8 3 16 0 22-6 2-12 0-16-4-4-3-12-3-16 0-4 4-10 6-16 4-3-6-3-14 0-22z"/><path d="M8 32H2M56 32h6"/>',
  skihelmet: '<path d="M8 44c0-18 11-32 25-32 14 0 23 12 23 28v4z"/><path d="M8 33h30M12 44v5c0 4 3 7 7 7h5c4 0 6-3 6-6v-6M21 17l4 6M33 12v8"/><rect x="38" y="27" width="22" height="13" rx="5"/>',
  jacket: '<path d="M22 6l-12 8-4 40h12V30v28h28V30v24h12l-4-40-12-8c-2 4-6 6-10 6s-8-2-10-6z"/><path d="M32 12v46M27 24h-6M43 24h-6"/>',
  trousers: '<path d="M16 6h32l4 52H38l-6-36-6 36H12z"/><path d="M16 14h32M24 6v8M40 6v8"/>',
  strings: '<circle cx="30" cy="34" r="22"/><circle cx="30" cy="34" r="7"/><path d="M30 12c12 0 22 10 22 22M52 34c6-4 8-12 6-20"/>',
  overgrip: '<rect x="23" y="4" width="18" height="56" rx="4"/><path d="M23 12l18 7M23 22l18 7M23 32l18 7M23 42l18 7M23 52l18 7"/>',
  dampener: '<path d="M8 18h48M8 32h48M8 46h48M18 8v48M32 8v48M46 8v48"/><rect x="22" y="23" width="20" height="18" rx="8"/>',
  harness: '<path d="M10 18c14-6 30-6 44 0l-2 10c-12-5-28-5-40 0z"/><path d="M20 27l-4 25M44 27l4 25M16 52c4 6 10 6 12 0M48 52c-4 6-10 6-12 0M28 26l4 14 4-14"/><circle cx="32" cy="44" r="4"/>',
  belay: '<path d="M18 10h20c8 0 12 6 12 14v20c0 8-6 12-12 12H22c-6 0-10-4-10-10V18c0-4 2-8 6-8z"/><path d="M24 22h14v8H24zM24 38h14v8H24zM50 30h10"/>',
  carabiner: '<path d="M22 6h18c9 0 14 6 13 14l-5 30c-1 7-6 10-13 10h-6c-8 0-12-5-11-12l2-34C21 10 21 6 22 6z"/><path d="M44 16l-6 30"/>',
  chalkbag: '<path d="M14 20h36l-3 34c0 3-3 6-6 6H23c-3 0-6-3-6-6z"/><path d="M12 14h40v6H12zM8 34h6M50 34h6M24 8c2 4 6 6 8 6s6-2 8-6"/>',
  chalk: '<path d="M16 22h32v30c0 4-3 6-6 6H22c-3 0-6-2-6-6z"/><path d="M14 16h36v6H14zM22 34c4-4 8 4 12 0s8 4 10 0"/>',
  rope: '<ellipse cx="32" cy="32" rx="24" ry="20"/><ellipse cx="32" cy="32" rx="14" ry="11"/><path d="M8 32c0 6 4 12 10 16M56 32c0 6-4 12-10 16M46 48l8 12"/>',
  hangboard: '<path d="M4 18h56v22H4z"/><path d="M12 26h10M28 26h8M42 26h10M10 34h44M32 6v12"/>',
  tape: '<circle cx="28" cy="32" r="20"/><circle cx="28" cy="32" r="9"/><path d="M48 32h12v10H40"/>',
  crashpad: '<rect x="6" y="20" width="52" height="28" rx="4"/><path d="M32 20v28M6 30h52M22 14h20"/>',
  climbhelmet: '<path d="M8 42c0-18 11-30 24-30s24 12 24 30z"/><path d="M8 42h48M20 18c3 6 4 14 4 24M44 18c-3 6-4 14-4 24M16 42v8M48 42v8M16 50h32"/>',
  basketball: '<circle cx="32" cy="32" r="25"/><path d="M7 32h50M32 7v50M14 14c8 8 10 26 0 36M50 14c-8 8-10 26 0 36"/>',
  hoop: '<rect x="8" y="4" width="48" height="30" rx="2"/><path d="M24 18h16v12M18 34h28M20 34l4 22h16l4-22M24 42h16M22 48h20"/>',
  sleeve: '<path d="M22 4h20l-2 56H24z"/><path d="M22 14h20M23 50h18"/>',
  pump: '<path d="M26 14h12v34H26zM24 48h16v6H24zM32 14V4M26 4h12M38 30h10l6-6"/>',
  football: '<circle cx="32" cy="32" r="25"/><path d="M32 22l9 7-3 11H26l-3-11zM32 22V8M41 29l13-5M38 40l8 12M26 40l-8 12M23 29l-13-5"/>',
  goal: '<path d="M6 54V12h52v42"/><path d="M6 12l8 8h36l8-8M14 20v34M50 20v34M14 30h36M14 42h36M24 20v34M32 20v34M40 20v34"/>',
  cone: '<path d="M24 12h16l8 36H16z"/><path d="M8 48h48v6H8zM21 30h22"/>',
  ladder: '<path d="M16 4v56M48 4v56M16 12h32M16 24h32M16 36h32M16 48h32"/>',
  tacticsboard: '<rect x="6" y="10" width="52" height="40" rx="3"/><path d="M32 10v40M6 30h52"/><circle cx="32" cy="30" r="7"/><path d="M6 22h6v16H6M58 22h-6v16h6"/>',
  golfball: '<circle cx="32" cy="28" r="20"/><path d="M24 48l4 10h8l4-10"/><circle cx="26" cy="22" r="1.5"/><circle cx="34" cy="20" r="1.5"/><circle cx="38" cy="28" r="1.5"/><circle cx="28" cy="31" r="1.5"/><circle cx="33" cy="36" r="1.5"/>',
  golfbag: '<rect x="18" y="20" width="26" height="40" rx="6"/><path d="M22 20l-6-14M30 20V4M38 20l6-14M14 4l4 2M28 2h4M46 4l-4 2M44 30h6v18h-6M18 32h26"/>',
  golfclub: '<path d="M40 4L24 50"/><path d="M24 50c-2 4-8 6-14 4-2-1-2-4 1-5l13-3"/><path d="M38 4h6v14h-6"/>',
  umbrella: '<path d="M4 30C6 16 18 8 32 8s26 8 28 22c-4-3-8-3-11 0-3-3-8-3-11 0-3-3-8-3-12 0-3-3-8-3-11 0-3-3-7-3-11 0z"/><path d="M32 8V4M32 30v22c0 4-6 4-6 0"/>',
  rangefinder: '<rect x="8" y="18" width="40" height="26" rx="6"/><circle cx="48" cy="31" r="10"/><circle cx="48" cy="31" r="5"/><path d="M14 18v-6h12v6"/>',
  puttingmat: '<path d="M4 44l14-20h42L46 44z"/><ellipse cx="44" cy="32" rx="4" ry="2"/><path d="M44 32V12l8 4-8 4M14 36h2"/>',
  tee: '<circle cx="32" cy="12" r="8"/><path d="M22 22h20l-6 6v30h-8V28z"/>',
  towel: '<path d="M18 6h28v52H18z"/><path d="M18 14h28M18 50h28M24 6V2h16v4"/>',
  belt: '<path d="M4 26c18-6 38-6 56 0v12c-18-6-38-6-56 0z"/><rect x="24" y="24" width="16" height="12" rx="2"/>',
  hivis: '<path d="M20 6l-8 8v44h40V14l-8-8c-2 6-6 8-12 8s-10-2-12-8z"/><path d="M12 30h40M12 42h40M32 14v44"/>',
  headphones: '<path d="M10 40V30c0-12 10-22 22-22s22 10 22 22v10"/><rect x="6" y="38" width="12" height="18" rx="5"/><rect x="46" y="38" width="12" height="18" rx="5"/>',
  wax: '<rect x="10" y="18" width="44" height="30" rx="8"/><path d="M18 26c4-4 8 4 12 0s8 4 12 0M18 38c4-4 8 4 12 0s8 4 12 0"/>',
  robe: '<path d="M22 4h20l12 10-6 6v40H16V20l-6-6z"/><path d="M22 4c0 8 4 14 10 14s10-6 10-14M32 18v42M16 34h-6M48 34h6"/>',
  buoyancy: '<path d="M18 6h8l6 8 6-8h8l4 14v34c0 3-2 5-5 5H19c-3 0-5-2-5-5V20z"/><path d="M14 30h36M14 42h36M32 14v45"/>',
  leash: '<path d="M10 52c4-12 16-10 22-22s18-10 22-22"/><rect x="4" y="48" width="14" height="10" rx="4"/><circle cx="54" cy="8" r="4"/>',
  suppaddle: '<path d="M32 4v38"/><path d="M26 4h12M24 42h16l-2 16c0 2-2 4-6 4s-6-2-6-4z"/>',
  kayakpaddle: '<path d="M12 52L52 12"/><path d="M4 50c2-6 8-10 12-8s0 10-6 12-8 0-6-4zM60 14c-2 6-8 10-12 8s0-10 6-12 8 0 6 4z"/>',
  drybag: '<path d="M18 16h28v38c0 3-3 6-6 6H24c-3 0-6-3-6-6z"/><path d="M16 10h32v6H16zM20 10c0-4 4-6 12-6s12 2 12 6M18 30h28"/>',
  pouch: '<rect x="16" y="8" width="32" height="50" rx="5"/><rect x="22" y="16" width="20" height="32" rx="2"/><path d="M16 14h32M32 2v6"/>',
  neckwear: '<path d="M16 8h32v48H16z"/><path d="M16 8c6 4 26 4 32 0M16 56c6-4 26-4 32 0M20 22h24M20 42h24"/>',
  compass: '<rect x="10" y="4" width="44" height="56" rx="4"/><circle cx="32" cy="34" r="14"/><path d="M32 22l4 12-4 12-4-12z"/><path d="M16 12h32"/>',
  firstaid: '<rect x="6" y="16" width="52" height="40" rx="5"/><path d="M24 16v-6h16v6M32 26v20M22 36h20"/>',
  trainerbike: '<path d="M10 50h44M18 50l6-20h16l6 20M32 30V14M24 14h16"/><circle cx="32" cy="30" r="8"/>',
  bikelight: '<rect x="14" y="20" width="30" height="24" rx="6"/><path d="M44 26l14-6M44 32h16M44 38l14 6M22 44v8h14v-8"/>',
  tool: '<path d="M14 50L42 22"/><circle cx="46" cy="18" r="10"/><path d="M42 12l8 8M10 54l6-6"/>',
  lock: '<path d="M20 30V18c0-8 5-12 12-12s12 4 12 12v12"/><rect x="12" y="30" width="40" height="28" rx="5"/><circle cx="32" cy="42" r="4"/><path d="M32 46v6"/>',
  tyre: '<circle cx="32" cy="32" r="26"/><circle cx="32" cy="32" r="16"/><path d="M32 6v6M32 52v6M6 32h6M52 32h6M14 14l4 4M46 46l4 4M14 50l4-4M46 18l4-4"/>',
  sunglasses: '<path d="M4 24h56M10 24c0 10 2 16 10 16s10-6 10-16M34 24c0 10 2 16 10 16s10-6 10-16M28 26h8"/>',
  bench: '<path d="M6 30h52v8H6zM14 38v18M50 38v18M10 56h8M46 56h8M40 30l8-20h6"/>',
  massagegun: '<path d="M10 14h36c6 0 8 4 8 8v4c0 4-2 8-8 8H10z"/><path d="M26 34l-4 24h12l2-24M54 24h6"/>',
  skateboard: '<path d="M6 26c0-4 3-6 7-6h38c4 0 7 2 7 6s-3 6-7 6H13c-4 0-7-2-7-6z"/><path d="M16 32v6M48 32v6"/><circle cx="16" cy="44" r="5"/><circle cx="48" cy="44" r="5"/>',
  rollerskate: '<path d="M16 6h16v18l14 6c6 2 10 6 10 12v4H12V10c0-2 2-4 4-4z"/><path d="M12 46h44M16 18h16"/><circle cx="20" cy="54" r="6"/><circle cx="48" cy="54" r="6"/>',
  inlineskate: '<path d="M18 4h14v20l12 6c6 2 10 6 10 12v2H14V8c0-2 2-4 4-4z"/><path d="M12 48h44M18 16h14"/><circle cx="18" cy="56" r="4"/><circle cx="29" cy="56" r="4"/><circle cx="40" cy="56" r="4"/><circle cx="51" cy="56" r="4"/>',
  bmx: '<circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44l12-16h18l6 16M26 28l6 16h-18M32 44l12-16M40 16l4 12M36 16h8M24 22h6"/>',
  skatewheel: '<circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="10"/><circle cx="32" cy="32" r="3"/>',
  truck: '<path d="M6 40h52M14 40v-6h36v6M24 34l8-14 8 14M26 22h12"/><circle cx="10" cy="44" r="4"/><circle cx="54" cy="44" r="4"/>',
  kneepad: '<path d="M22 8h20c6 0 10 6 10 14v18c0 10-8 18-20 18S12 50 12 40V22c0-8 4-14 10-14z"/><path d="M21 24c4-6 18-6 22 0v14c-4 6-18 6-22 0z"/><path d="M12 18H4v9h8M52 18h8v9h-8M12 40H4v9h9M52 40h8v9h-9"/>',
  pedal: '<rect x="10" y="18" width="44" height="28" rx="6"/><path d="M18 18v28M46 18v28M10 32h-6M18 24h28M18 40h28"/>',
  chain: '<rect x="4" y="22" width="20" height="20" rx="10"/><rect x="22" y="22" width="20" height="20" rx="10"/><rect x="40" y="22" width="20" height="20" rx="10"/>',
  ramp: '<path d="M4 54h56V22C40 22 20 36 4 54z"/><path d="M60 22v-6M14 54v-4M28 54V40M44 54V28"/>',
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
  const allLink = bar.querySelector('.why-link') || bar.querySelector('a[href="index.html"]:not(.logo)');
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
  if (home) addRegionSwitch(() => {});
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
