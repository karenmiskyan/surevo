import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AuditForm,
  FeatureGrid,
  Icon,
  PageHero,
  SectionHeading,
  SitePage,
  Steps,
  Vero,
  withBase,
} from "../../components/site";

const pages = {
  audit: ["אבחון מכירות חינם", "נגלה איפה המכירות בורחות ונראה איך ורו יכול להחזיר אותן."],
  pricing: ["תמחור", "שלושה מסלולים פשוטים לשירות מכירות מנוהל."],
  agent: ["הסוכן", "תכירו את ורו, איש המכירות הדיגיטלי של החנות."],
  "how-it-works": ["איך זה עובד", "אנחנו מתקינים ומנהלים. ורו מוכר."],
  results: ["תוצאות", "מכירות אמיתיות, בשקלים, מתוך שיחות אמיתיות."],
  agencies: ["לסוכנויות", "הוסיפו שירות AI מנוהל ללקוחות שלכם."],
  about: ["אודות", "נבנה בישראל לחנויות שמוכרות בישראל."],
  contact: ["צור קשר", "בואו נדבר על החנות שלכם."],
  privacy: ["מדיניות פרטיות", "איך אנחנו שומרים על הפרטים והאמון שלכם."],
  terms: ["תנאי שימוש", "הכללים שמאפשרים לנו לעבוד ברור והוגן."],
  accessibility: ["הצהרת נגישות", "Surevo מחויבת לחוויית שימוש נגישה לכולם."],
} as const;

type Slug = keyof typeof pages;

const coreFeatures = [
  { icon: "plug", title: "מתחבר למה שכבר עובד", body: "WooCommerce, וואטסאפ, מלאי, תשלומים וחשבוניות ישראליות במקום אחד." },
  { icon: "message", title: "עברית שנשמעת טבעית", body: "ורו עונה ישיר, חם ומקומי. לא כמו כלי שתורגם מחו״ל." },
  { icon: "chart", title: "מוביל להזמנה", body: "המלצות, טיפול בהתנגדויות, upsell וקישור תשלום ברגע הנכון." },
  { icon: "users", title: "יודע להעביר לאדם", body: "כששיחה צריכה מגע אנושי, הצוות מקבל אותה עם כל ההקשר." },
  { icon: "clock", title: "תמיד ער", body: "לקוחות מקבלים תשובה גם בלילה, בסוף השבוע ובשעות עומס." },
  { icon: "shield", title: "מנוהל על ידינו", body: "אנחנו מתקינים, בודקים ומשפרים. אתם רואים את ההכנסות." },
];

const onboarding = [
  { title: "מחברים", body: "קטלוג, מלאי, תשלומים, חשבוניות וערוצי השיחה מתחברים למערכת אחת." },
  { title: "מלמדים", body: "אנחנו בונים לוורו שפת מכירה, תשובות והמלצות שמתאימות למותג שלכם." },
  { title: "עולים לאוויר", body: "אחרי בדיקות אמיתיות ורו מתחיל למכור, ואנחנו ממשיכים לשפר כל חודש." },
];

function AuditPage() {
  return (
    <SitePage>
      <section className="conversion-hero">
        <div className="interior-aurora" />
        <div className="shell conversion-layout">
          <div className="conversion-copy reveal visible">
            <p className="eyebrow eyebrow-mint">אבחון מכירות חינם · 2 דקות</p>
            <h1>כמה כסף נשאר<br /><em>אצלך בעגלה?</em></h1>
            <p>בתוך 24 שעות תקבלו שלוש הזדמנויות מכירה שאפשר לתקן מיד, יחד עם הדגמה חיה של ורו על החנות שלכם.</p>
            <ul className="audit-list audit-list-dark">
              <li><Icon name="check" /><span>איפה לקוחות נתקעים לפני ההזמנה</span></li>
              <li><Icon name="check" /><span>כמה מכירות אפשר להחזיר בוואטסאפ</span></li>
              <li><Icon name="check" /><span>תוכנית פעולה פשוטה ל-90 הימים הבאים</span></li>
            </ul>
            <div className="conversion-proof"><Vero expression="wink" /><span>בלי התחייבות · תשובה אנושית · נבנה בישראל</span></div>
          </div>
          <AuditForm />
        </div>
      </section>
      <section className="section section-paper">
        <div className="shell">
          <SectionHeading eyebrow="מה מקבלים" title={<>אבחון קצר.<br /><em>תשובות שאפשר לבצע.</em></>} />
          <FeatureGrid items={[
            { icon: "chart", title: "מפת דליפות", body: "איפה הכסף נעצר: שאלות שלא נענו, סלים נטושים ורגעים בלי המלצה." },
            { icon: "message", title: "דמו על החנות", body: "נראה את ורו עונה על המוצרים האמיתיים שלכם ומוביל שיחה להזמנה." },
            { icon: "zap", title: "תוכנית 90 יום", body: "מה כדאי לחבר קודם ואיך מודדים אם ההשקעה מחזירה את עצמה." },
          ]} />
        </div>
      </section>
    </SitePage>
  );
}

function PricingPage() {
  const plans = [
    { name: "לאנץ׳", en: "Launch", setup: "הקמה ₪1,490", price: "₪390", text: "לחנות שמתחילה להפוך שיחות למכירות.", features: ["אתר + וואטסאפ", "סנכרון קטלוג ומלאי", "דוח ביצועים חודשי"] },
    { name: "צמיחה", en: "Growth", setup: "הקמה ₪2,900", price: "₪890", text: "הבחירה של חנויות שרוצות לגדול ברצינות.", features: ["כל מה שב-Launch", "iCount, Greeninvoice, Cardcom", "הצלת סלים ו-upsell", "שיחת אופטימיזציה חודשית"], featured: true },
    { name: "מותג", en: "Scale", setup: "הקמה מותאמת", price: "₪1,490", text: "למותגים, ריבוי חנויות וסוכנויות.", features: ["Multi-store", "מנהל לקוח ייעודי", "API ו-SLA בעדיפות", "התאמות מתקדמות"] },
  ];
  return (
    <SitePage>
      <PageHero eyebrow="תמחור ברור. תוצאה מנוהלת." title={<>לא משלמים על בוט.<br /><em>משקיעים במכירות.</em></>} lead="אנחנו מתקינים, מחברים, מלמדים ומשפרים. כל מסלול מגיע עם 30 יום אחריות." />
      <section className="section section-paper">
        <div className="shell">
          <div className="pricing-head reveal"><span>מסלולים חודשיים</span><b>הקמה חד-פעמית · ללא התחייבות ארוכה</b></div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article className={`pricing-card reveal ${plan.featured ? "featured" : ""}`} key={plan.name}>
                {plan.featured && <span className="popular">הכי פופולרי</span>}
                <small>{plan.en}</small><h3>{plan.name}</h3><p>{plan.text}</p>
                <div className="setup">{plan.setup}</div><strong>{plan.price}<i>/חודש</i></strong>
                <ul>{plan.features.map((feature) => <li key={feature}><Icon name="check" />{feature}</li>)}</ul>
                <a className={`button button-block ${plan.featured ? "button-primary" : "button-outline"}`} href={withBase("/audit")}>קבל אבחון חינם <Icon name="arrow" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-mint">
        <div className="shell"><SectionHeading eyebrow="הקמה Done-for-you" title={<>אתם לא צריכים<br /><em>ללמוד עוד מערכת.</em></>} lead="כל מסלול כולל התקנה אמיתית על ידי הצוות שלנו." /><Steps items={onboarding} /></div>
      </section>
    </SitePage>
  );
}

function AgentPage() {
  return (
    <SitePage>
      <PageHero eyebrow="תכירו את ורו" title={<>יש לו פרצוף.<br /><em>ויש לו יעד מכירות.</em></>} lead="ורו הוא סוכן מכירות שמכיר כל מוצר, מדבר כמו לקוח ישראלי ויודע מתי לעזור, להמליץ ולסגור." />
      <section className="section section-paper"><div className="shell"><SectionHeading eyebrow="לא FAQ bot" title={<>סוכן שיודע<br /><em>לנהל שיחה.</em></>} lead="מאחורי הפנים הידידותיות יש מנוע מכירה שמחובר לעסק שלכם." /><FeatureGrid items={coreFeatures} /></div></section>
      <section className="section section-mint">
        <div className="shell agent-language">
          <div><p className="eyebrow">דובר עברית אמיתית</p><h2>לא נשמע כמו<br /><em>תרגום מגוגל.</em></h2><p>לקוחות כותבים קצר, שואלים על משלוח, מבקשים הנחה ומשנים את דעתם. ורו בנוי בדיוק לקצב הזה.</p></div>
          <div className="language-chat">
            <span className="chat-bubble user">יש מצב למשלוח לתל אביב עד חמישי?</span>
            <span className="chat-bubble bot">כן, אם מזמינים עכשיו זה אצלך ברביעי. והמשלוח עלינו ✓✓</span>
            <span className="chat-bubble user">יאללה, שלח קישור</span>
            <article className="commerce-card commerce-card-static product-bag" data-product="luna" aria-label="Luna Work Bag, ₪289">
              <div className="commerce-thumb"><span className="commerce-art"><i /></span></div>
              <div className="commerce-info">
                <span className="commerce-eyebrow">בחירה חכמה · 3 בחום</span>
                <b>Luna Work Bag</b>
                <small>עור טבעוני · לפטופ 14 אינץ׳</small>
                <div className="commerce-buy"><strong>₪289</strong><button className="commerce-add" type="button" aria-label="הוסף את Luna Work Bag לסל"><Icon name="cart" /><span>הוסף לסל</span></button></div>
              </div>
              <span className="commerce-added" aria-hidden="true">✓ נוסף לסל</span>
            </article>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function HowPage() {
  return (
    <SitePage>
      <PageHero eyebrow="שירות מנוהל מתחילתו ועד סופו" title={<>שלושה צעדים.<br /><em>ומתחילים למכור.</em></>} lead="אין הטמעה ארוכה ואין מערכת חדשה ללמוד. אנחנו עושים את העבודה מאחורי הקלעים." />
      <section className="section section-paper"><div className="shell"><SectionHeading eyebrow="איך זה עובד" title={<>מחיבור ראשון<br /><em>לשיחה שסוגרת.</em></>} /><Steps items={onboarding} /></div></section>
      <section className="section section-mint"><div className="shell"><SectionHeading eyebrow="מה אנחנו מנהלים" title={<>את הטכנולוגיה תשאירו<br /><em>אצלנו.</em></>} /><FeatureGrid items={coreFeatures.slice(0, 4)} /></div></section>
    </SitePage>
  );
}

const cases = [
  { industry: "אופנה", metric: "₪14,280", title: "Studio North", body: "מכירות שהוחזרו בחודש הראשון בעזרת תשובות מיידיות והצלת סלים.", stat: "+23% המרות" },
  { industry: "קוסמטיקה", metric: "31", title: "Noya Skin", body: "סלים שניצלו אחרי שוורו ענה על התאמה לעור רגיש בשיחה קצרה.", stat: "18% יותר הזמנות" },
  { industry: "בית", metric: "2.7x", title: "Forma Home", body: "יותר הזמנות בשעות שבהן צוות השירות כבר לא היה מול המסך.", stat: "24/7 מענה" },
];

function ResultsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="תוצאות שאפשר למדוד" title={<>פחות שיחות אבודות.<br /><em>יותר כסף בקופה.</em></>} lead="המדד שלנו פשוט: כמה הכנסות ורו החזיר לחנות, וכמה לקוחות קיבלו תשובה ברגע הנכון." />
      <section className="section section-paper">
        <div className="shell">
          <SectionHeading eyebrow="לקוחות אמיתיים. מספרים אמיתיים." title={<>ההשפעה מתחילה<br /><em>מהחודש הראשון.</em></>} />
          <div className="case-grid">
            {cases.map((item) => <article className="case-study reveal" key={item.title}><span>{item.industry}</span><strong>{item.metric}</strong><small>{item.stat}</small><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section result-section"><div className="shell featured-result"><div><p className="eyebrow eyebrow-mint">סיפור לקוח</p><h2>כשהמענה נהיה מיידי,<br /><em>ההזמנה מגיעה אחריו.</em></h2></div><blockquote>״פעם היינו מתחילים את הבוקר עם שאלות מאתמול. היום אנחנו מתחילים אותו עם הזמנות.״</blockquote></div></section>
    </SitePage>
  );
}

function AgenciesPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Surevo for Agencies" title={<>AI מכירות ללקוחות שלכם.<br /><em>בלי לבנות צוות חדש.</em></>} lead="אתם שומרים על הקשר עם הלקוח. אנחנו מטפלים בטכנולוגיה, בהקמה ובשיפור החודשי." />
      <section className="section section-paper"><div className="shell"><SectionHeading eyebrow="שותפות שחוזרת כל חודש" title={<>שירות חדש.<br /><em>הכנסה חוזרת.</em></>} /><FeatureGrid items={[
        { icon: "chart", title: "עד 30% עמלה חוזרת", body: "כל לקוח פעיל מוסיף הכנסה חודשית יציבה לסוכנות." },
        { icon: "shield", title: "אנחנו מטפלים בטכנולוגיה", body: "הקמה, חיבורים, אימון ושיפור נשארים אצל צוות Surevo." },
        { icon: "users", title: "אתם שומרים על הקשר", body: "White-label או co-branded, בהתאם לדרך שבה אתם עובדים." },
      ]} /></div></section>
      <section className="section audit-section"><div className="shell audit-layout"><div className="audit-copy"><p className="eyebrow">בואו נדבר שותפות</p><h2>כמה לקוחות יכולים<br /><em>להתחיל למכור יותר?</em></h2><p>ספרו לנו על הסוכנות ונחזור עם מודל שמתאים לתיק הלקוחות שלכם.</p></div><AuditForm partner /></div></section>
    </SitePage>
  );
}

function AboutPage() {
  return (
    <SitePage>
      <PageHero eyebrow="Made in Israel" title={<>בנינו את Surevo<br /><em>כי מסחר מקומי הוא שיחה.</em></>} lead="חנויות ישראליות צריכות סוכן שמבין עברית, וואטסאפ, שקלים ואת הרגע המדויק שבו לקוח רוצה תשובה." />
      <section className="section section-paper">
        <div className="shell story-layout">
          <div><p className="eyebrow">הסיפור שלנו</p><h2>טכנולוגיה טובה<br /><em>מרגישה אנושית.</em></h2></div>
          <div><p>Surevo נולד מתוך עבודה עם עסקים דיגיטליים בישראל. ראינו חנויות משקיעות בפרסום, במוצרים ובאתר, ואז מאבדות את הלקוח דווקא ברגע שבו הוא שאל שאלה קטנה.</p><p>בנינו את ורו כדי לענות ברגע הזה: בלי להעמיס עוד כלי על העסק ובלי להפוך שיחה אנושית לתפריט כפתורים קר.</p></div>
        </div>
      </section>
      <section className="section section-mint"><div className="shell"><FeatureGrid items={[
        { icon: "message", title: "מקומי", body: "עברית טבעית, וואטסאפ והיכרות עם האופן שבו קונים כאן." },
        { icon: "shield", title: "אחראי", body: "שירות מנוהל, שקיפות מלאה ויד אנושית כשצריך." },
        { icon: "chart", title: "מחובר לתוצאה", body: "לא מדדי vanity. מודדים הכנסה שחזרה לחנות." },
      ]} /></div></section>
    </SitePage>
  );
}

function ContactPage() {
  return (
    <SitePage>
      <PageHero eyebrow="אנחנו כאן" title={<>בואו נדבר<br /><em>על החנות שלכם.</em></>} lead="השאירו פרטים לאבחון או כתבו לנו ישירות בוואטסאפ. נחזור אליכם בתוך יום עסקים." />
      <section className="section audit-section">
        <div className="shell audit-layout">
          <div className="contact-panel"><p className="eyebrow">צור קשר</p><h2>תשובה אנושית.<br /><em>תוך 24 שעות.</em></h2><p>אפשר להתחיל באבחון החינמי או לכתוב לנו. אנחנו עובדים עם חנויות וסוכנויות בכל הארץ.</p><a className="button button-primary button-lg" href="https://wa.me/972500000000"><Icon name="whatsapp" /> דברו איתנו בוואטסאפ</a><div className="contact-detail"><Vero expression="wink" /><span>נבנה בישראל<br /><small>עובדים מרחוק עם עסקים בכל הארץ</small></span></div></div>
          <AuditForm />
        </div>
      </section>
    </SitePage>
  );
}

const legalSections = {
  privacy: [
    ["איזה מידע אנחנו אוספים", "אנחנו אוספים רק את הפרטים הדרושים כדי לספק אבחון, לחזור אליכם ולהפעיל את השירות: פרטי קשר, כתובת חנות ומידע תפעולי שתבחרו לחבר."],
    ["איך אנחנו משתמשים במידע", "המידע משמש להפעלת השירות, לשיפור ביצועים ולתקשורת שקשורה ישירות לבקשה או להסכם שלכם עם Surevo."],
    ["אבטחה ושמירה", "אנחנו מגבילים גישה למידע ופועלים לצמצום, שמירה ואבטחה בהתאם לדין החל ולצרכים התפעוליים של השירות."],
  ],
  terms: [
    ["השירות", "Surevo מספקת שירות סוכן מכירות דיגיטלי מנוהל. היקף ההקמה, החיבורים והליווי נקבע לפי המסלול וההצעה המסחרית."],
    ["אחריות הלקוח", "הלקוח אחראי לספק מידע מדויק, הרשאות מתאימות ותוכן חוקי לשימוש במערכת ובערוצי התקשורת המחוברים."],
    ["שינויים ועדכונים", "אנחנו עשויים לעדכן את השירות ואת התנאים מעת לעת. שינוי מהותי יפורסם בצורה ברורה ובזמן סביר."],
  ],
  accessibility: [
    ["מחויבות לנגישות", "אנחנו פועלים כדי שהאתר והשירות יהיו נגישים לשימוש רחב ככל האפשר, בהתאם לעקרונות WCAG 2.1 AA."],
    ["מה כבר יישמנו", "האתר כולל ניווט מקלדת, טבעות focus ברורות, היררכיית כותרות, ניגודיות, טקסט חלופי ותמיכה בהפחתת תנועה."],
    ["נתקלתם בבעיה?", "אם נתקלתם בחסם נגישות, כתבו לנו דרך עמוד יצירת הקשר. נבדוק, נחזור אליכם ונפעל לתקן."],
  ],
} as const;

function LegalPage({ slug }: { slug: "privacy" | "terms" | "accessibility" }) {
  const [title, lead] = pages[slug];
  return (
    <SitePage>
      <PageHero eyebrow="מידע משפטי ושקיפות" title={<>{title}</>} lead={lead} />
      <section className="section section-paper">
        <div className="shell legal-layout">
          <aside><b>בעמוד הזה</b>{legalSections[slug].map(([heading]) => <a href={`#${heading}`} key={heading}>{heading}</a>)}</aside>
          <article className="legal-copy">
            {legalSections[slug].map(([heading, body]) => <section id={heading} key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
            <section><h2>יצירת קשר</h2><p>לשאלות נוספות אפשר לפנות אלינו דרך <a href={withBase("/contact")}>עמוד יצירת הקשר</a>.</p></section>
          </article>
        </div>
      </section>
    </SitePage>
  );
}

function renderPage(slug: Slug) {
  switch (slug) {
    case "audit": return <AuditPage />;
    case "pricing": return <PricingPage />;
    case "agent": return <AgentPage />;
    case "how-it-works": return <HowPage />;
    case "results": return <ResultsPage />;
    case "agencies": return <AgenciesPage />;
    case "about": return <AboutPage />;
    case "contact": return <ContactPage />;
    case "privacy":
    case "terms":
    case "accessibility": return <LegalPage slug={slug} />;
    default: return notFound();
  }
}

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in pages)) return {};
  const [title, description] = pages[slug as Slug];
  return { title: `${title} | Surevo`, description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();
  return renderPage(slug as Slug);
}
