import type { ReactNode } from "react";
import Script from "next/script";

export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/v2";
export const HOME = BASE || "/";

export function withBase(pathname: string) {
  return `${BASE}${pathname}`;
}

export const navLinks = [
  ["/agent", "הסוכן"],
  ["/how-it-works", "איך זה עובד"],
  ["/pricing", "תמחור"],
  ["/results", "תוצאות"],
  ["/agencies", "לסוכנויות"],
  ["/blog", "בלוג"],
] as const;

export const footerLinks = [
  ...navLinks,
  ["/about", "אודות"],
  ["/contact", "צור קשר"],
] as const;

export function Icon({ name }: { name: string }) {
  return <svg aria-hidden="true"><use href={`#i-${name}`} /></svg>;
}

export function Vero({
  expression = "idle",
  size = "sm",
}: {
  expression?: "idle" | "talking" | "wink" | "win" | "thinking";
  size?: "xs" | "sm" | "lg" | "xl";
}) {
  return <div className={`vero-avatar vero-${size}`} data-expression={expression} aria-hidden="true" />;
}

function Sprite() {
  return (
    <svg className="svg-sprite" aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M19 12H5m6 6-6-6 6-6" /></symbol>
      <symbol id="i-arrow-diagonal" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7" /></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></symbol>
      <symbol id="i-send" viewBox="0 0 24 24"><path d="m21 3-7.7 18-3.8-7.2L3 10.5 21 3Z" /><path d="m9.5 13.8 4-4" /></symbol>
      <symbol id="i-message" viewBox="0 0 24 24"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.5-.8L4 20l1.7-4A7.8 7.8 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /></symbol>
      <symbol id="i-zap" viewBox="0 0 24 24"><path d="m13 2-9 13h8l-1 7 9-13h-8l1-7Z" /></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" /><path d="M10 20h.01M18 20h.01" /></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></symbol>
      <symbol id="i-plug" viewBox="0 0 24 24"><path d="m8 12 8-8M14 3l7 7M7 13l4 4M5 11l8 8-2 2a3 3 0 0 1-4 0l-4-4a3 3 0 0 1 0-4l2-2Z" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></symbol>
      <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 20a4 4 0 0 0-8 0M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 18a3 3 0 0 0-3-3M17 5a3 3 0 0 1 0 6M4 18a3 3 0 0 1 3-3M7 5a3 3 0 0 0 0 6" /></symbol>
      <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.4a8.4 8.4 0 1 1 15.6-4.4Z" /><path d="M9 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.7 1.3 1.7 2.3 3.1 2.9l.6-.7c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.6v.4c0 .4-.1.7-.4.9-.4.3-1 .5-1.5.5-1.1 0-2.9-.8-4.7-2.4-1.6-1.5-2.6-3.3-2.7-4.5 0-.5.1-.9.3-1.2Z" /></symbol>
      <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></symbol>
      <symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14.9-4M4 5v5h5M4 13a8 8 0 0 0 14.9 4M20 19v-5h-5" /></symbol>
    </svg>
  );
}

function Header() {
  return (
    <>
      <header className="site-header scrolled" id="siteHeader">
        <div className="shell nav-shell">
          <a className="logo" href={HOME} aria-label="Surevo ראשי">
            <img className="logo-reverse" src={withBase("/brand/logo/surevo-horizontal-reverse.svg")} alt="Surevo" />
            <img className="logo-color" src={withBase("/brand/logo/surevo-horizontal.svg")} alt="Surevo" />
          </a>
          <nav className="desktop-nav" aria-label="ניווט ראשי">
            {navLinks.map(([href, label]) => <a href={withBase(href)} key={href}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="language-switch" type="button" aria-label="Switch language">EN</button>
            <a className="button button-sm button-primary magnetic" href={withBase("/audit")}>
              <span>קבל אבחון חינם</span><Icon name="arrow" />
            </a>
            <button className="menu-button" id="menuButton" type="button" aria-label="פתח תפריט" aria-expanded="false">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <div className="mobile-menu" id="mobileMenu" aria-hidden="true">
        <div className="mobile-menu-top">
          <img src={withBase("/brand/logo/surevo-horizontal-reverse.svg")} alt="Surevo" />
          <button className="icon-button" id="menuClose" type="button" aria-label="סגור תפריט"><Icon name="close" /></button>
        </div>
        <nav aria-label="ניווט למובייל">
          {navLinks.map(([href, label], index) => (
            <a href={withBase(href)} key={href}><span>0{index + 1}</span>{label}</a>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <div className="vero-peek"><Vero expression="wink" /></div>
          <p>החנות שלך יכולה למכור גם כשאתה כבר לא מול המסך.</p>
          <a className="button button-primary button-block" href={withBase("/audit")}>קבל אבחון מכירות חינם <Icon name="arrow" /></a>
        </div>
      </div>
    </>
  );
}

export function AuditForm({ partner = false }: { partner?: boolean }) {
  return (
    <div className="audit-card reveal">
      <form id="auditForm" noValidate>
        <div className="form-head">
          <span className="form-step">01</span>
          <div><h3>{partner ? "בואו נדבר על השותפות" : "בוא נכיר את החנות"}</h3><p>כמה פרטים קצרים ומתחילים.</p></div>
        </div>
        <label className="field">
          <span>{partner ? "אתר הסוכנות" : "כתובת החנות"}</span>
          <input type="url" name="store" placeholder="mystore.co.il" required />
          <small>לדוגמה: https://mystore.co.il</small>
        </label>
        <div className="form-row">
          <label className="field"><span>שם פרטי</span><input type="text" name="name" placeholder="איך קוראים לך?" required /></label>
          <label className="field">
            <span>וואטסאפ</span>
            <div className="phone-field"><b dir="ltr">+972</b><input type="tel" name="phone" placeholder="50-000-0000" required /></div>
          </label>
        </div>
        <label className="field">
          <span>{partner ? "כמה לקוחות WooCommerce יש לכם?" : "מחזור מכירות חודשי"}</span>
          <select name="revenue" required>
            <option value="">בחר טווח</option>
            <option>{partner ? "1 - 5 לקוחות" : "עד ₪100,000"}</option>
            <option>{partner ? "6 - 15 לקוחות" : "₪100,000 - ₪300,000"}</option>
            <option>{partner ? "16 - 40 לקוחות" : "₪300,000 - ₪1,000,000"}</option>
            <option>{partner ? "מעל 40 לקוחות" : "מעל ₪1,000,000"}</option>
          </select>
        </label>
        <button className="button button-primary button-lg button-block" type="submit">
          <span>{partner ? "דברו איתי על שותפות" : "שלח לי אבחון חינם"}</span><Icon name="arrow" />
        </button>
        <p className="form-trust"><Icon name="shield" /> הפרטים נשארים בינינו. בלי ספאם.</p>
      </form>
      <div className="form-success" id="formSuccess" hidden>
        <div className="success-vero"><Vero expression="win" size="xl" /></div>
        <span className="success-chip">הבקשה התקבלה</span>
        <h3>מעולה, אנחנו על זה.</h3>
        <p>נעבור על הפרטים ונחזור אליך בוואטסאפ בתוך 24 שעות.</p>
        <button className="text-link" id="resetForm" type="button">שלח בקשה נוספת <Icon name="refresh" /></button>
      </div>
    </div>
  );
}

function FloatingChat() {
  return (
    <>
      <button className="chat-launcher" id="chatLauncher" type="button" aria-label="פתח שיחה עם ורו" aria-expanded="false">
        <span className="launcher-ring" /><Vero expression="talking" /><span className="launcher-label">אפשר לשאול אותי</span>
      </button>
      <aside className="live-chat" id="liveChat" aria-hidden="true" aria-label="שיחה עם ורו">
        <div className="live-chat-head">
          <div className="chat-contact">
            <div className="avatar-ring"><Vero expression="talking" /></div>
            <div><b>ורו מ-Surevo</b><small><span className="online-dot" /> מחובר עכשיו</small></div>
          </div>
          <button className="icon-button" id="chatClose" type="button" aria-label="סגור צ׳אט"><Icon name="close" /></button>
        </div>
        <div className="live-chat-body" id="liveChatMessages" aria-live="polite" />
        <div className="quick-replies" id="quickReplies">
          <button type="button">תראה לי מוצר</button><button type="button">איך זה עובד?</button><button type="button">כמה זה עולה?</button><button type="button">קבעו לי אבחון</button>
        </div>
        <form className="live-chat-form" id="liveChatForm">
          <label className="sr-only" htmlFor="chatInput">כתוב הודעה</label>
          <input id="chatInput" type="text" autoComplete="off" placeholder="אפשר לשאול אותי הכל…" maxLength={180} />
          <button type="submit" aria-label="שלח הודעה"><Icon name="send" /></button>
        </form>
      </aside>
      <div className="toast" id="toast" role="status" aria-live="polite"><Vero expression="wink" size="xs" /><span /></div>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-aurora" />
        <div className="shell footer-shell">
          <div className="footer-cta reveal">
            <div><p className="eyebrow eyebrow-mint">החנות פתוחה. גם עכשיו.</p><h2>תן לכל שיחה<br /><em>להפוך למכירה.</em></h2></div>
          <a className="button button-primary button-lg magnetic" href={withBase("/audit")}>קבל אבחון מכירות חינם <Icon name="arrow" /></a>
          </div>
        <div className="footer-bottom">
          <div className="footer-brand"><img src={withBase("/brand/logo/surevo-horizontal-reverse.svg")} alt="Surevo" /><p>המוכר שלך בוואטסאפ.<br />תמיד ער.</p></div>
          <div className="footer-links">{footerLinks.map(([href, label]) => <a href={withBase(href)} key={href}>{label}</a>)}</div>
          <div className="footer-made"><Vero /><span>נבנה בישראל<br /><small>בשביל עסקים ישראליים</small></span></div>
        </div>
        <div className="copyright"><span>© 2026 Surevo. כל הזכויות שמורות.</span><span><a href={withBase("/privacy")}>פרטיות</a> · <a href={withBase("/terms")}>תנאי שימוש</a> · <a href={withBase("/accessibility")}>נגישות</a></span></div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="interior-hero">
      <div className="interior-aurora" /><div className="hero-grid" aria-hidden="true" />
      <div className="shell interior-hero-shell">
        <div className="reveal visible">
          <p className="eyebrow eyebrow-mint">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
          <div className="interior-actions">
            <a className="button button-primary button-lg magnetic" href={withBase("/audit")}>קבל אבחון מכירות חינם <Icon name="arrow" /></a>
            <a className="button button-ghost button-lg" href={withBase("/contact")}>דברו איתנו</a>
          </div>
        </div>
        <div className="interior-hero-vero"><Vero expression="talking" size="xl" /><span>ורו מוכן לעבוד</span></div>
      </div>
      {children}
    </section>
  );
}

export function FeatureGrid({
  items,
}: {
  items: Array<{ icon: string; title: string; body: string }>;
}) {
  return (
    <div className="interior-grid">
      {items.map((item) => (
        <article className="interior-card reveal tilt-card" key={item.title}>
          <div className="card-icon"><Icon name={item.icon} /></div>
          <h3>{item.title}</h3><p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="steps-row">
      {items.map((item, index) => (
        <article className="step-card reveal" key={item.title}>
          <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: string }) {
  return <div className="section-intro reveal"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{lead && <p>{lead}</p>}</div>;
}

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">דלג לתוכן</a>
      <Sprite /><div className="cursor-glow" aria-hidden="true" /><div className="noise" aria-hidden="true" />
      <Header />
      <main id="main" className="interior-main">{children}</main>
      <Footer /><FloatingChat />
      <Script src={withBase("/app.js")} strategy="afterInteractive" />
    </>
  );
}
