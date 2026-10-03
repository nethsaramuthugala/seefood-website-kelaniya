// ===== Settings =====
// WhatsApp number for orders: country code + number, no "+" or spaces (e.g. 94771234567)
const WHATSAPP_NUMBER = "94752959252";

// ===== Menu data (from Restaurant Menu.pdf) =====
const seafoodRows = (h, f, extra) => [
  ["Fish", h, f], ["Kelawalla", h, f, "Tuna"], ["Thalapath", h, f, "Sailfish"],
  ["Prawn", h, f], ["Cuttlefish", h, f], ["Seafood", ...(extra || [h, f])],
];

const MENU = {
  kottu: {
    label: "Kottu",
    img: "images/chow-mein.png",
    note: "Chopped roti tossed on a hot tava with veg, egg and your pick of meat or seafood.",
    sized: true,
    items: [
      ["Vegetable", 400, 750], ["Egg", 500, 750], ["Sausage", 650, 1000], ["Chicken", 700, 1050],
      ...seafoodRows(950, 1400), ["Mixed", 1000, 1550],
    ],
    suffix: "Kottu",
  },
  cheese: {
    label: "Cheese Kottu",
    img: "images/chow-mein.png",
    note: "Our classic kottu loaded with rich, melting cheese.",
    sized: true,
    items: [
      ["Vegetable", 850, 1200], ["Egg", 1050, 1400], ["Sausage", 1150, 1600], ["Chicken", 1250, 1700],
      ...seafoodRows(1700, 2250, [1750, 2300]), ["Mixed", 1750, 2300],
    ],
    suffix: "Cheese Kottu",
  },
  dolphin: {
    label: "Dolphin Kottu",
    img: "images/chow-mein.png",
    note: "Half comes with 4 roti, Full with 8 roti.",
    sized: true,
    items: [
      ["Vegetable", 550, 1150], ["Egg", 650, 1250], ["Sausage", 800, 1400], ["Chicken", 850, 1450],
      ["Fish", 1100, 1700], ["Kelawalla", 1100, 1700, "Tuna"], ["Thalapath", 1100, 1700, "Sailfish"],
    ],
    suffix: "Dolphin Kottu",
  },
  rice: {
    label: "Fried Rice",
    img: "images/biryani.png",
    note: "Wok-tossed fried rice, smoky and full of flavour.",
    sized: true,
    items: [
      ["Vegetable", 400, 800], ["Egg", 500, 800], ["Sausage", 550, 950], ["Chicken", 700, 1100],
      ...seafoodRows(950, 1450), ["Mixed", 1000, 1600],
    ],
    suffix: "Fried Rice",
  },
  chopsuey: {
    label: "Chopsuey Rice",
    img: "images/thali.png",
    note: "Fried rice topped with a glossy, saucy vegetable chopsuey.",
    sized: true,
    items: [["Chicken", 1550, 2450], ["Seafood", 1800, 2800], ["Mixed", 1850, 2950]],
    suffix: "Chopsuey Rice",
  },
  platters: {
    label: "Platters",
    img: "images/dishes-spread.png",
    note: "Big sharing platters — each one serves 5 people.",
    sized: false,
    items: [
      ["Chicken Kottu Platter", 2500], ["Seafood Kottu Platter", 3200], ["Mixed Kottu Platter", 3500],
      ["Chicken Cheese Kottu Platter", 4000], ["Seafood Cheese Kottu Platter", 5200], ["Mixed Cheese Kottu Platter", 5500],
      ["Chicken Rice Platter", 2500], ["Seafood Rice Platter", 3200], ["Mixed Rice Platter", 3500],
    ].map(r => [...r, "Serves 5"]),
  },
  coffee: {
    label: "Coffee & More",
    img: "images/coffee-art.png",
    note: "Freshly pulled espresso drinks, iced coffee and bubble tea.",
    sized: false,
    items: [
      ["Espresso", 350, "Single"], ["Espresso", 450, "Double"], ["Latte", 500], ["Cappuccino", 650],
      ["Macchiato", 650], ["Americano", 650], ["Bubble Tea", 800], ["Iced Cappuccino", 850],
    ],
  },
  juice: {
    label: "Fresh Juices",
    img: "images/juices-trio.png",
    note: "Blended to order from fresh local fruit.",
    sized: false,
    items: [
      ["Lime", 150], ["Watermelon", 200], ["Orange", 200, "Local"], ["Orange", 250], ["Mango", 250],
      ["Pineapple", 250], ["Papaya", 250], ["Passion Fruit", 250], ["Woodapple", 250],
      ["Nelli", 250, "Gooseberry"], ["Carrot", 250], ["Fruit Salad", 250], ["Faluda", 250],
      ["Veralu", 300, "Ceylon olive"], ["Mixed Fruit", 300], ["Grape", 350],
    ],
    suffix: "Juice",
  },
};

// Each card uses the photo that actually matches the dish
const PRODUCTS = [
  { name: "Chicken Kottu (Noodles)", price: 1050, size: "Full", img: "images/chow-mein.png" },
  { name: "Chicken Fried Rice", price: 1100, size: "Full", img: "images/biryani.png" },
  { name: "Mixed Rice Platter", price: 3500, size: "Serves 5", img: "images/thali.png" },
  { name: "Seafood Rice Platter", price: 3200, size: "Serves 5", img: "images/dishes-spread.png" },
  { name: "Cappuccino", price: 650, img: "images/coffee-art.png" },
  { name: "Americano", price: 650, img: "images/coffee-top.png" },
  { name: "Iced Cappuccino", price: 850, img: "images/iced-coffee.png" },
  { name: "Orange Juice", price: 250, img: "images/orange-juice.png" },
  { name: "Mixed Fruit Juice", price: 300, img: "images/juices-trio.png" },
];

const CART_SVG = '<svg viewBox="0 0 24 24"><path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5.2 4l.4 2H21l-2.2 8.2a2 2 0 0 1-1.9 1.5H8.4a2 2 0 0 1-2-1.6L4.1 2H1V0h4.8l.4 2"/></svg>';
const rs = n => "Rs. " + n.toLocaleString("en-LK");
const $ = s => document.querySelector(s);

// ===== Header / nav =====
const header = $("#header");
const burger = $("#burger");
const navLinks = $("#navLinks");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  burger.classList.remove("open");
  navLinks.classList.remove("open");
}));

// Active link on scroll
const sections = [...document.querySelectorAll("section[id]")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.querySelectorAll("a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => spy.observe(s));

// ===== Hero slider =====
const heroSlides = [
  { title: "Fresh From<br>The Sea", sub: "Sizzling seafood kottu, smoky fried rice and generous platters — cooked fresh on the tava, every single order." },
  { title: "Kottu Your<br>Way", sub: "Roti, noodles, pasta or string hoppers — pick your base, pick your seafood, we'll do the chopping." },
  { title: "Platters<br>For Five", sub: "Bring the whole gang. Our kottu and rice platters are built for sharing." },
];
const plates = document.querySelectorAll(".hero-plate");
const heroDots = document.querySelectorAll("#heroDots button");
let heroIdx = 0, heroTimer;
function showHero(i) {
  heroIdx = i;
  plates.forEach((p, j) => p.classList.toggle("active", j === i));
  heroDots.forEach((d, j) => d.classList.toggle("active", j === i));
  $("#heroTitle").innerHTML = heroSlides[i].title;
  $("#heroSub").textContent = heroSlides[i].sub;
}
function autoHero() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showHero((heroIdx + 1) % plates.length), 5000);
}
heroDots.forEach((d, i) => d.addEventListener("click", () => { showHero(i); autoHero(); }));
autoHero();

// ===== Menu tabs =====
const tabsEl = $("#menuTabs");
const listEl = $("#menuList");
const headEl = $("#menuHead");
const menuImg = $("#menuImage");

Object.entries(MENU).forEach(([key, cat], i) => {
  const b = document.createElement("button");
  b.className = "tab" + (i === 0 ? " active" : "");
  b.textContent = cat.label;
  b.dataset.key = key;
  b.setAttribute("role", "tab");
  b.addEventListener("click", () => renderMenu(key));
  tabsEl.appendChild(b);
});

function renderMenu(key) {
  const cat = MENU[key];
  tabsEl.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.key === key));

  menuImg.classList.add("swap");
  setTimeout(() => {
    menuImg.src = cat.img;
    menuImg.alt = cat.label;
    menuImg.classList.remove("swap");
  }, 250);
  $("#menuSideTitle").textContent = cat.label;
  $("#menuSideNote").textContent = cat.note;

  headEl.className = "menu-head" + (cat.sized ? "" : " single");
  headEl.innerHTML = cat.sized
    ? "<span>Item</span><span>Half</span><span>Full</span><span></span>"
    : "<span>Item</span><span>Price</span><span></span>";

  listEl.innerHTML = "";
  cat.items.forEach((it, i) => {
    const li = document.createElement("li");
    li.className = "menu-row" + (cat.sized ? "" : " single");
    li.style.animationDelay = i * 35 + "ms";
    const [name, a, b] = it;
    const sub = cat.sized ? it[3] : (typeof b === "string" ? b : "");
    const fullName = cat.sized || key === "juice" ? `${name} ${cat.suffix}` : name;
    const display = `${name}<small>${sub || "&nbsp;"}</small>`;

    if (cat.sized) {
      li.innerHTML = `
        <div class="name">${display}</div>
        <div class="price"><em>H</em>${a.toLocaleString()}</div>
        <div class="price"><em>F</em>${b.toLocaleString()}</div>
        <button class="add" aria-label="Add ${fullName}">${CART_SVG}</button>`;
      // Clicking a price picks that size; the cart button adds Full by default unless Half is picked
      let size = "Full";
      const prices = li.querySelectorAll(".price");
      prices[1].style.textDecoration = "underline";
      prices.forEach((p, j) => {
        p.style.cursor = "pointer";
        p.title = "Select " + (j ? "Full" : "Half");
        p.addEventListener("click", () => {
          size = j ? "Full" : "Half";
          prices.forEach((q, k) => q.style.textDecoration = k === j ? "underline" : "none");
        });
      });
      li.querySelector(".add").addEventListener("click", () =>
        addToCart(fullName + (sub ? ` (${sub})` : ""), size, size === "Full" ? b : a));
    } else {
      li.innerHTML = `
        <div class="name">${display}</div>
        <div class="price">${rs(a)}</div>
        <button class="add" aria-label="Add ${fullName}">${CART_SVG}</button>`;
      li.querySelector(".add").addEventListener("click", () =>
        addToCart(fullName + (sub && sub !== "Serves 5" ? ` (${sub})` : ""), sub === "Serves 5" ? "Serves 5" : "", a));
    }
    listEl.appendChild(li);
  });

  const note = document.createElement("p");
  note.className = "menu-note";
  note.textContent = cat.sized ? "Tap Half or Full price to choose a size, then tap the cart. Prices subject to change." : "Prices subject to change.";
  listEl.appendChild(note);
}
renderMenu("kottu");

// Links that open a specific tab (categories, drinks)
document.querySelectorAll("[data-tab]").forEach(el => el.addEventListener("click", () => {
  const map = { platters: "platters", rice: "rice", kottu: "kottu", juice: "juice", coffee: "coffee" };
  renderMenu(map[el.dataset.tab] || "kottu");
}));

// ===== Products slider =====
const track = $("#productTrack");
PRODUCTS.forEach(p => {
  const card = document.createElement("article");
  card.className = "product";
  card.innerHTML = `
    <div class="pimg"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
    <h4>${p.name}</h4>
    <div class="stars">★★★★★</div>
    <div class="pprice">${rs(p.price)} ${p.size ? `<small>· ${p.size}</small>` : ""}</div>
    <button class="add-btn" aria-label="Add ${p.name}">${CART_SVG}</button>`;
  card.querySelector(".add-btn").addEventListener("click", () => addToCart(p.name, p.size || "", p.price));
  track.appendChild(card);
});

const dotsEl = $("#sliderDots");
function perView() {
  const first = track.children[0];
  return Math.max(1, Math.round(track.clientWidth / (first.offsetWidth + 22)));
}
function pages() { return Math.ceil(PRODUCTS.length / perView()); }
function buildDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i < pages(); i++) {
    const d = document.createElement("button");
    d.setAttribute("aria-label", "Page " + (i + 1));
    d.addEventListener("click", () => goPage(i));
    dotsEl.appendChild(d);
  }
  syncDots();
}
function goPage(i) {
  const card = track.children[0].offsetWidth + 22;
  track.scrollTo({ left: i * perView() * card, behavior: "smooth" });
}
function currentPage() {
  const card = track.children[0].offsetWidth + 22;
  return Math.round(track.scrollLeft / (card * perView()));
}
function syncDots() {
  const p = Math.min(currentPage(), pages() - 1);
  [...dotsEl.children].forEach((d, i) => d.classList.toggle("active", i === p));
}
track.addEventListener("scroll", () => requestAnimationFrame(syncDots), { passive: true });
$("#prevBtn").addEventListener("click", () => goPage(Math.max(0, currentPage() - 1)));
$("#nextBtn").addEventListener("click", () => goPage((currentPage() + 1) % pages()));
addEventListener("resize", buildDots);
buildDots();

// ===== Order cart =====
let cart = [];
try { cart = JSON.parse(localStorage.getItem("akj-cart")) || []; } catch (e) { cart = []; }
const drawer = $("#drawer"), overlay = $("#overlay");

function saveCart() {
  try { localStorage.setItem("akj-cart", JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
}
function addToCart(name, size, price) {
  const found = cart.find(c => c.name === name && c.size === size);
  if (found) found.qty++;
  else cart.push({ name, size, price, qty: 1 });
  saveCart();
  renderCart();
  const cnt = $("#cartCount");
  cnt.classList.remove("bump"); void cnt.offsetWidth; cnt.classList.add("bump");
  toast(`Added ${name}${size ? " · " + size : ""}`);
}
function renderCart() {
  const list = $("#drawerList");
  $("#cartCount").textContent = cart.reduce((s, c) => s + c.qty, 0);
  $("#drawerTotal").textContent = rs(cart.reduce((s, c) => s + c.qty * c.price, 0));
  if (!cart.length) {
    list.innerHTML = '<li class="empty">Your order is empty.<br>Tap a cart icon on the menu to add items.</li>';
    return;
  }
  list.innerHTML = "";
  cart.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = "d-item";
    li.innerHTML = `
      <div class="n">${c.name}<small>${c.size || ""} · ${rs(c.price)}</small></div>
      <div class="p">${rs(c.price * c.qty)}</div>
      <div class="qty"><button data-d="-1">−</button><span>${c.qty}</span><button data-d="1">+</button></div>`;
    li.querySelectorAll(".qty button").forEach(b => b.addEventListener("click", () => {
      c.qty += +b.dataset.d;
      if (c.qty <= 0) cart.splice(i, 1);
      saveCart(); renderCart();
    }));
    list.appendChild(li);
  });
}
function openDrawer(open) {
  drawer.classList.toggle("open", open);
  overlay.classList.toggle("open", open);
}
$("#cartBtn").addEventListener("click", () => openDrawer(true));
$("#closeDrawer").addEventListener("click", () => openDrawer(false));
overlay.addEventListener("click", () => openDrawer(false));
addEventListener("keydown", e => { if (e.key === "Escape") openDrawer(false); });
$("#clearOrder").addEventListener("click", () => { cart = []; saveCart(); renderCart(); });
$("#sendOrder").addEventListener("click", () => {
  if (!cart.length) return toast("Add something to your order first");
  const lines = cart.map(c => `• ${c.qty} x ${c.name}${c.size ? " (" + c.size + ")" : ""} — ${rs(c.price * c.qty)}`);
  const total = rs(cart.reduce((s, c) => s + c.qty * c.price, 0));
  const msg = `Hello A.K.J Seafood Kitchen! I'd like to order:\n${lines.join("\n")}\n\nTotal: ${total}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
});
$("#waLink").href = `https://wa.me/${WHATSAPP_NUMBER}`;
renderCart();

let toastTimer;
function toast(text) {
  const t = $("#toast");
  t.textContent = text;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(".title, .subtitle, .cat-card, .menu-wrap, .drink-card, .juice-strip img, .about-visual, .about-text, .gallery figure, .contact-card, .map, .slider");
revealEls.forEach(el => el.classList.add("reveal"));
const rev = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); } });
}, { threshold: .12 });
revealEls.forEach(el => rev.observe(el));

$("#year").textContent = new Date().getFullYear();
