const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion ? Math.min(ms, 80) : ms));

const now = () => new Intl.DateTimeFormat("he-IL", {
  hour: "2-digit",
  minute: "2-digit",
}).format(new Date());

function iconTicks() {
  return '<span class="ticks">✓✓</span>';
}

function bubble(text, from = "bot", options = {}) {
  const item = document.createElement("div");
  item.className = `chat-bubble ${from}`;

  const content = document.createElement("span");
  content.textContent = text;
  item.append(content);

  if (options.time !== false) {
    const timestamp = document.createElement("time");
    timestamp.innerHTML = from === "bot" ? `${now()} ${iconTicks()}` : now();
    item.append(timestamp);
  }

  return item;
}

const products = {
  cloud: {
    theme: "sneaker",
    eyebrow: "התאמה 98% · 2 אחרונים",
    name: "Cloud 39",
    detail: "סניקרס לבנות · משלוח מהיר",
    price: "₪349",
  },
  luna: {
    theme: "bag",
    eyebrow: "בחירה חכמה · 3 בחום",
    name: "Luna Work Bag",
    detail: "עור טבעוני · לפטופ 14 אינץ׳",
    price: "₪289",
  },
  noa: {
    theme: "dress",
    eyebrow: "FIRST10 פעיל · החלפה חינם",
    name: "Noa Day Dress",
    detail: "בד שלא מתקמט · מידה M",
    price: "₪386",
  },
  calm: {
    theme: "serum",
    eyebrow: "מתאים לעור רגיש · במלאי",
    name: "Calm Skin Cream",
    detail: "ללא בישום · נבדק דרמטולוגית",
    price: "₪119",
  },
};

function productCard(productKey, options = {}) {
  const product = products[productKey];
  if (!product) return null;

  const card = document.createElement("article");
  card.className = `commerce-card product-${product.theme}`;
  card.dataset.product = productKey;
  card.setAttribute("aria-label", `${product.name}, ${product.price}`);
  card.innerHTML = `
    <div class="commerce-thumb"><span class="commerce-art"><i></i></span></div>
    <div class="commerce-info">
      <span class="commerce-eyebrow">${product.eyebrow}</span>
      <b>${product.name}</b>
      <small>${product.detail}</small>
      <div class="commerce-buy">
        <strong>${product.price}</strong>
        <button class="commerce-add" type="button" aria-label="הוסף את ${product.name} לסל">
          <svg><use href="#i-cart"></use></svg><span>הוסף לסל</span>
        </button>
      </div>
    </div>
    <span class="commerce-added" aria-hidden="true">✓ נוסף לסל</span>
  `;
  if (options.static) card.classList.add("commerce-card-static");
  return card;
}

function cartTarget(card) {
  if (card.closest(".phone-messages")) return $(".floating-card-top .float-icon");
  if (card.closest(".console-messages")) return $(".console-footer strong");
  return $("#chatLauncher") || card;
}

function flyProductToCart(card) {
  if (reducedMotion) return;
  const thumb = $(".commerce-thumb", card);
  const target = cartTarget(card);
  if (!thumb || !target) return;

  const start = thumb.getBoundingClientRect();
  const end = target.getBoundingClientRect();
  const flying = document.createElement("span");
  flying.className = `cart-fly ${[...card.classList].find((name) => name.startsWith("product-")) || ""}`;
  flying.innerHTML = '<span class="commerce-art"><i></i></span>';
  flying.style.setProperty("--cart-x", `${end.left + end.width / 2 - start.left - start.width / 2}px`);
  flying.style.setProperty("--cart-y", `${end.top + end.height / 2 - start.top - start.height / 2}px`);
  Object.assign(flying.style, {
    top: `${start.top}px`,
    left: `${start.left}px`,
    width: `${start.width}px`,
    height: `${start.height}px`,
  });
  document.body.append(flying);
  requestAnimationFrame(() => flying.classList.add("launch"));
  setTimeout(() => flying.remove(), 780);
}

async function addProductToCart(card, options = {}) {
  if (!card || card.classList.contains("added")) return;
  const button = $(".commerce-add", card);
  if (!button) return;

  button.classList.add("adding");
  flyProductToCart(card);
  await wait(520);
  card.classList.add("added");
  button.classList.remove("adding");
  button.innerHTML = '<span>נוסף לסל</span><span class="commerce-check">✓</span>';
  if (!options.silent && typeof showToast === "function") showToast("המוצר נוסף לסל בהצלחה");
}

function appendProduct(container, productKey) {
  const card = productCard(productKey);
  if (!card) return null;
  container.append(card);
  scrollMessages(container);
  return card;
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".commerce-add");
  if (!button) return;
  addProductToCart(button.closest(".commerce-card"));
});

function scrollMessages(container) {
  container.scrollTop = container.scrollHeight;
}

function setTyping(element, visible) {
  element.hidden = !visible;
}

/* Header, navigation, and ambient effects */
const header = $("#siteHeader");
const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 36 || !!document.querySelector(".interior-main"));
if (header) {
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

const mobileMenu = $("#mobileMenu");
const menuButton = $("#menuButton");
const closeMobileMenu = () => {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
};
const openMobileMenu = () => {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
};

menuButton?.addEventListener("click", openMobileMenu);
$("#menuClose")?.addEventListener("click", closeMobileMenu);
if (mobileMenu) $$("a", mobileMenu).forEach((link) => link.addEventListener("click", closeMobileMenu));

const glow = $(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

$$(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    if (reducedMotion) return;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * .12;
    const y = (event.clientY - rect.top - rect.height / 2) * .12;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

const heroStage = $("#heroStage");
const phone = $("#parallaxPhone");
heroStage?.addEventListener("pointermove", (event) => {
  if (reducedMotion) return;
  const rect = heroStage.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
  phone.style.transform = `translateX(calc(-50% + ${x * 17}px)) translateY(${y * 12}px) rotate(${-4 + x * 2}deg)`;
});
heroStage?.addEventListener("pointerleave", () => {
  phone.style.transform = "";
});

$$(".tilt-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (reducedMotion || window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

/* Scroll reveal and counters */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .14 });

$$(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = reducedMotion ? 1 : 900;
    const start = performance.now();

    const count = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(count);
    };

    requestAnimationFrame(count);
    counterObserver.unobserve(element);
  });
}, { threshold: .7 });

$$(".counter").forEach((counter) => counterObserver.observe(counter));

/* Hero chat loop */
const heroMessages = $("#heroMessages");
const heroTyping = $("#heroTyping");
const heroScript = [
  { from: "user", text: "היי, יש את הסניקרס הלבנות במידה 39?" },
  { from: "bot", text: "כן, נשארו שני זוגות במלאי. זה הדגם שהתאים לך:" },
  { type: "product", product: "cloud" },
  { from: "user", text: "יש משלוח לתל אביב עד מחר?" },
  { from: "bot", text: "בטח. משלוח מהיר יגיע מחר, ובגלל שההזמנה מעל ₪300 הוא עלינו." },
  { from: "user", text: "מעולה, תוסיף לסל ואפשר קישור לתשלום?" },
  { type: "cart", text: "נוסף לסל ✓ כבר שולח קישור לתשלום. הסניקרס שלך שמורות ל-15 דקות." },
];

async function runHeroChat() {
  if (!heroMessages || !heroTyping) return;
  while (true) {
    heroMessages.replaceChildren();
    let activeProduct = null;
    for (const message of heroScript) {
      if (message.type === "product") {
        await wait(480);
        activeProduct = appendProduct(heroMessages, message.product);
        await wait(980);
        continue;
      }
      if (message.type === "cart") {
        await wait(420);
        await addProductToCart(activeProduct, { silent: true });
        heroMessages.append(bubble(message.text, "bot"));
        scrollMessages(heroMessages);
        continue;
      }
      if (message.from === "bot") {
        setTyping(heroTyping, true);
        await wait(760);
        setTyping(heroTyping, false);
      } else {
        await wait(630);
      }
      heroMessages.append(bubble(message.text, message.from));
      scrollMessages(heroMessages);
    }
    await wait(3900);
  }
}

if (heroMessages && heroTyping) runHeroChat();

/* Full conversation scenarios */
const scenarios = {
  recommend: [
    { from: "user", text: "אני מחפשת תיק לעבודה, משהו אלגנטי אבל לא כבד." },
    { from: "bot", text: "יש לי שניים שיתאימו. את צריכה מקום ללפטופ 14 אינץ׳?" },
    { from: "user", text: "כן, ועדיף עור טבעוני." },
    { from: "bot", text: "אז Luna הוא בדיוק בשבילך. מצאתי את ההתאמה הכי טובה:" },
    { type: "product", product: "luna", autoAdd: true },
  ],
  objection: [
    { from: "user", text: "ראיתי את השמלה, אבל ₪429 קצת יקר לי." },
    { from: "bot", text: "מבינה לגמרי. זו שמלה שתפורה מבד שלא מתקמט, ויש עליה החלפה חינם עד 30 יום." },
    { from: "user", text: "יש אולי קוד הנחה?" },
    { from: "bot", text: "יש 10% להזמנה ראשונה. הפעלתי את FIRST10 והכנתי לך את המחיר המעודכן:" },
    { type: "product", product: "noa", autoAdd: true },
  ],
  recovery: [
    { from: "bot", text: "היי נועה, שמתי לב שהקרם נשאר בעגלה. תרצי שאבדוק משהו לפני ההזמנה?" },
    { from: "user", text: "כן, הוא מתאים גם לעור רגיש?" },
    { from: "bot", text: "כן. הוא ללא בישום ונבדק דרמטולוגית. יש גם 14 יום החזרה אם לא יתאים." },
    { from: "user", text: "מעולה, ממשיכה להזמנה עכשיו." },
    { type: "product", product: "calm", autoAdd: true },
  ],
};

const consoleMessages = $("#consoleMessages");
const consoleTyping = $("#consoleTyping");
let scenarioRun = 0;

async function runScenario(name) {
  if (!consoleMessages || !consoleTyping) return;
  const run = ++scenarioRun;
  consoleMessages.replaceChildren();
  setTyping(consoleTyping, false);

  for (const message of scenarios[name]) {
    if (run !== scenarioRun) return;
    if (message.type === "product") {
      await wait(420);
      const card = appendProduct(consoleMessages, message.product);
      if (message.autoAdd) {
        await wait(980);
        if (run !== scenarioRun) return;
        await addProductToCart(card, { silent: true });
      }
      scrollMessages(consoleMessages);
      continue;
    }
    if (message.from === "bot") {
      setTyping(consoleTyping, true);
      await wait(560);
      if (run !== scenarioRun) return;
      setTyping(consoleTyping, false);
    } else {
      await wait(360);
    }
    consoleMessages.append(bubble(message.text, message.from));
    scrollMessages(consoleMessages);
  }
}

$$(".scenario").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".scenario").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    runScenario(button.dataset.scenario);
  });
});

if (consoleMessages && consoleTyping) runScenario("recommend");

/* FAQ */
$$(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const willOpen = !item.classList.contains("open");
    $$(".faq-item").forEach((faq) => {
      faq.classList.remove("open");
      $("button", faq).setAttribute("aria-expanded", "false");
      $(".faq-answer", faq).setAttribute("aria-hidden", "true");
    });
    if (willOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      $(".faq-answer", item).setAttribute("aria-hidden", "false");
    }
  });
});

/* Audit form demo */
const auditForm = $("#auditForm");
const formSuccess = $("#formSuccess");
const toast = $("#toast");
let toastTimer;

function showToast(message) {
  $("span", toast).textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

auditForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const required = $$("[required]", auditForm);
  let valid = true;

  required.forEach((field) => {
    const empty = !field.value.trim();
    field.classList.toggle("invalid", empty);
    valid = valid && !empty;
  });

  const phone = $('[name="phone"]', auditForm);
  const digits = phone.value.replace(/\D/g, "");
  if (digits.length < 8) {
    phone.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    showToast("חסרים כמה פרטים קטנים לפני שממשיכים");
    return;
  }

  auditForm.hidden = true;
  formSuccess.hidden = false;
  showToast("הבקשה התקבלה. נחזור אליך בוואטסאפ");
});

if (auditForm) {
  $$("input, select", auditForm).forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("invalid"));
  });
}

$("#resetForm")?.addEventListener("click", () => {
  auditForm.reset();
  auditForm.hidden = false;
  formSuccess.hidden = true;
});

/* Interactive live chat demo */
const chatLauncher = $("#chatLauncher");
const liveChat = $("#liveChat");
const liveChatMessages = $("#liveChatMessages");
const liveChatForm = $("#liveChatForm");
const chatInput = $("#chatInput");
let hasGreeted = false;

function openChat() {
  if (!liveChat || !chatLauncher) return;
  liveChat.classList.add("open");
  liveChat.setAttribute("aria-hidden", "false");
  chatLauncher.setAttribute("aria-expanded", "true");
  document.body.classList.add("chat-open");

  if (!hasGreeted) {
    hasGreeted = true;
    appendLiveReply("היי, אני ורו 👋 רוצה לראות איך אני יכול לעזור לחנות שלך למכור יותר?");
  }

  setTimeout(() => chatInput.focus(), 260);
}

function closeChat() {
  if (!liveChat || !chatLauncher) return;
  liveChat.classList.remove("open");
  liveChat.setAttribute("aria-hidden", "true");
  chatLauncher.setAttribute("aria-expanded", "false");
  document.body.classList.remove("chat-open");
}

async function appendLiveReply(reply) {
  if (!liveChatMessages) return;
  const response = typeof reply === "string" ? { text: reply } : reply;
  const typing = document.createElement("div");
  typing.className = "typing-bubble";
  typing.innerHTML = "<span></span><span></span><span></span>";
  liveChatMessages.append(typing);
  scrollMessages(liveChatMessages);
  await wait(620);
  typing.remove();
  liveChatMessages.append(bubble(response.text, "bot"));
  scrollMessages(liveChatMessages);
  if (response.product) {
    await wait(420);
    appendProduct(liveChatMessages, response.product);
  }
}

function getLiveReply(message) {
  const text = message.toLowerCase();
  if (text.includes("מוצר") || text.includes("הדגמה") || text.includes("תראה") || text.includes("המלצה")) {
    return {
      text: "בטח. לדוגמה, אם הלקוחה מחפשת תיק לעבודה אני מציג לה מוצר מדויק עם מלאי, מחיר וכפתור רכישה בתוך השיחה:",
      product: "luna",
    };
  }
  if (text.includes("מחיר") || text.includes("עולה") || text.includes("עלות")) {
    return "המחיר תלוי בגודל החנות ובחיבורים הנדרשים. המסלול הנפוץ מתחיל ב-₪890 לחודש, כולל הקמה וניהול. באבחון החינם נוכל להגיד בדיוק מה מתאים לך.";
  }
  if (text.includes("איך") || text.includes("עובד") || text.includes("מה אתה")) {
    return "אנחנו מחברים אותי לקטלוג, למלאי ולמערכות התשלום שלך. משם אני עונה ללקוחות באתר ובוואטסאפ, ממליץ על מוצרים ומוביל להזמנה. הצוות שלנו מנהל ומשפר אותי בכל חודש.";
  }
  if (text.includes("אבחון") || text.includes("פגישה") || text.includes("קבע") || text.includes("דברו")) {
    return "בשמחה. גלול לטופס האבחון, השאר את כתובת החנות והוואטסאפ שלך ונחזור אליך בתוך 24 שעות עם תובנות ראשונות.";
  }
  if (text.includes("עברית") || text.includes("שפה")) {
    return "כן. נבניתי במיוחד לחנויות ישראליות: עברית יומיומית, שקלים, משלוחים מקומיים והקצב שבו לקוחות באמת כותבים בוואטסאפ.";
  }
  if (text.includes("woocommerce") || text.includes("ווקומרס") || text.includes("חיבור")) {
    return "בטח. WooCommerce הוא החיבור המרכזי שלנו, ואפשר לחבר גם iCount, Greeninvoice, Cardcom, Hyp ומערכות ישראליות נוספות.";
  }
  return {
    text: "שאלה טובה. הנה דוגמה לאיך אני לא רק עונה, אלא גם ממליץ על מוצר ומוביל לסל:",
    product: "luna",
  };
}

function sendLiveMessage(text) {
  if (!liveChatMessages) return;
  const cleaned = text.trim();
  if (!cleaned) return;
  liveChatMessages.append(bubble(cleaned, "user"));
  scrollMessages(liveChatMessages);
  appendLiveReply(getLiveReply(cleaned));
}

chatLauncher?.addEventListener("click", openChat);
$("#chatClose")?.addEventListener("click", closeChat);
$$("[data-open-chat]").forEach((button) => button.addEventListener("click", openChat));

liveChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendLiveMessage(chatInput.value);
  chatInput.value = "";
});

const quickReplies = $("#quickReplies");
if (quickReplies) {
  $$("button", quickReplies).forEach((button) => {
    button.addEventListener("click", () => sendLiveMessage(button.textContent));
  });
}

/* Small polish interactions */
$(".language-switch")?.addEventListener("click", () => {
  showToast("הגרסה האנגלית תצטרף בקרוב");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeChat();
  closeMobileMenu();
});
