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
import { getPageMetadata, pageSeo, type SeoPage } from "../../lib/seo";

const pages = {
  audit: ["אבחון מכירות חינם", "נגלה איפה המכירות בורחות ונראה איך ורו יכול להחזיר אותן."],
  pricing: ["תמחור", "שלושה מסלולים פשוטים לשירות מכירות מנוהל."],
  agent: ["הסוכן", "תכירו את ורו, איש המכירות הדיגיטלי של החנות."],
  "how-it-works": ["איך זה עובד", "אנחנו מתקינים ומנהלים. ורו מוכר."],
  results: ["תוצאות", "כך נמדוד אם ורו באמת מחזיר הכנסה לחנות."],
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
  { icon: "users", title: "יודע להעביר לאדם", body: "כשאין מידע בטוח או צריך שיקול דעת אנושי, הצוות מקבל את השיחה עם כל ההקשר." },
  { icon: "clock", title: "תמיד ער", body: "לקוחות מקבלים תשובה גם בלילה, בסוף השבוע ובשעות עומס." },
  { icon: "shield", title: "מנוהל על ידינו", body: "אנחנו מתקינים, בודקים ומשפרים. אתם רואים את ההכנסות." },
];

const onboarding = [
  { title: "מחברים", body: "קטלוג, מלאי, תשלומים, חשבוניות וערוצי השיחה מתחברים למערכת אחת." },
  { title: "מלמדים", body: "אנחנו בונים לוורו שפת מכירה, תשובות והמלצות שמתאימות למותג שלכם." },
  { title: "עולים לאוויר", body: "אחרי בדיקות אמיתיות ורו מתחיל למכור, ואנחנו ממשיכים לשפר כל חודש." },
];

const workflow = [
  { title: "מחברים את WooCommerce והמידע החשוב", body: "קטלוג, מלאי, מדיניות משלוחים, החזרות, תשלומים וחשבוניות מתחברים לפני שוורו מדבר עם לקוחות." },
  { title: "מגדירים מתי ורו עונה ומתי הוא מעביר לנציג", body: "שאלות בטוחות מקבלות תשובה מיידית. שאלות רגישות, חסרות מידע או חריגות עוברות לאדם." },
  { title: "בודקים שיחות אמיתיות לפני עלייה לאוויר", body: "מריצים תרחישי קנייה, התנגדויות, מלאי, משלוחים ואחריות כדי לוודא שהשפה והתשובות נכונות." },
  { title: "עולים לאוויר ומודדים", body: "אחרי ההשקה מודדים הכנסות, זמן תגובה ושיחות שהתקדמו להזמנה, ומשפרים בכל חודש." },
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
          <div className="form-stack">
            <AuditForm />
            <p className="audit-form-note">האבחון אינו מחייב חיבור למערכות. נבדוק את החנות מבחוץ ונחזור עם תובנות ראשוניות.</p>
          </div>
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
    { name: "לאנץ׳", label: "מסלול פתיחה", setup: "הקמה ₪1,490", price: "₪390", text: "לחנות שמתחילה להפוך שיחות למכירות.", features: ["אתר + וואטסאפ", "סנכרון קטלוג ומלאי", "דוח ביצועים חודשי"] },
    { name: "צמיחה", label: "מסלול צמיחה", setup: "הקמה ₪2,900", price: "₪890", text: "הבחירה של חנויות שרוצות לגדול ברצינות.", features: ["כל מה שבלאנץ׳", "iCount, Greeninvoice, Cardcom", "הצלת סלים ו-upsell", "שיחת אופטימיזציה חודשית"], featured: true },
    { name: "סקייל", label: "מסלול מותגים", setup: "הקמה מותאמת", price: "₪1,490", text: "למותגים, ריבוי חנויות וסוכנויות.", features: ["ריבוי חנויות", "מנהל לקוח ייעודי", "API ו-SLA בעדיפות", "התאמות מתקדמות"] },
  ];
  return (
    <SitePage>
      <PageHero eyebrow="תמחור ברור. תוצאה מנוהלת." title={<>לא משלמים על בוט.<br /><em>משקיעים במכירות.</em></>} lead="אנחנו מתקינים, מחברים, מלמדים ומשפרים. כל מסלול מגיע עם 30 יום אחריות לפי מדידה מוסכמת מראש." />
      <section className="section section-paper">
        <div className="shell">
          <div className="pricing-head reveal"><span>מסלולים חודשיים</span><b>הקמה חד-פעמית · ללא התחייבות ארוכה · המחירים לפני מע״מ</b></div>
          <div className="pricing-grid">
            {plans.map((plan) => (
              <article className={`pricing-card reveal ${plan.featured ? "featured" : ""}`} key={plan.name}>
                {plan.featured && <span className="popular">הכי פופולרי</span>}
                <small>{plan.label}</small><h3>{plan.name}</h3><p>{plan.text}</p>
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
      <section className="section section-paper">
        <div className="shell faq-layout">
          <SectionHeading eyebrow="שאלות על תמחור" title={<>ברור מראש.<br /><em>בלי אותיות קטנות בהפתעה.</em></>} lead="האחריות וההקמה נקבעות בהצעה המסחרית ובתנאי השימוש." />
          <div className="faq-list reveal">
            {[
              ["האם יש התחייבות?", "לא. מתחילים חודש-חודש."],
              ["מה כוללת ההקמה?", "חיבור ראשוני, בדיקות, התאמת שפת מכירה ודוח פתיחה."],
              ["מה קורה אם זה לא מתאים?", "ב-30 הימים הראשונים, לפי המדידה שהוגדרה יחד, נבדוק אם Surevo מחזיר לפחות את דמי השירות החודשיים. אם לא, נחזיר את עלות ההקמה בהתאם להצעה המסחרית."],
              ["האם כל החיבורים כלולים?", "חיבורים בסיסיים כלולים לפי המסלול. חיבורים מורכבים, התאמות מיוחדות ועלויות צד שלישי כמו WhatsApp API, הודעות או ספקי תשלום יתומחרו או יחויבו בנפרד לפני תחילת העבודה."],
            ].map(([question, answer], index) => (
              <article className={`faq-item ${index === 0 ? "open" : ""}`} key={question}>
                <button type="button" aria-expanded={index === 0 ? "true" : "false"}><span>{question}</span><Icon name="chevron" /></button>
                <div className="faq-answer" aria-hidden={index === 0 ? "false" : "true"}><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}

function AgentPage() {
  return (
    <SitePage>
      <PageHero eyebrow="תכירו את ורו" title={<>יש לו פרצוף.<br /><em>ויש לו יעד מכירות.</em></>} lead="ורו יודע למכור, אבל גם יודע לעצור. כשאין מידע בטוח — הוא מעביר לנציג במקום לנחש." />
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
      <PageHero eyebrow="שירות מנוהל מתחילתו ועד סופו" title={<>ארבעה צעדים.<br /><em>ואז שיחה שסוגרת.</em></>} lead="אין הטמעה ארוכה ואין מערכת חדשה ללמוד. אנחנו מחברים, בודקים ורק אז מעלים את ורו מול לקוחות." />
      <section className="section section-paper"><div className="shell"><SectionHeading eyebrow="איך זה עובד" title={<>מחיבור ראשון<br /><em>לשיחה שסוגרת.</em></>} lead="אנחנו לא מחברים AI ישר ללקוחות בלי בדיקה. כל חנות עוברת בדיקות לפני עלייה לאוויר." /><Steps items={workflow} /></div></section>
      <section className="section section-mint"><div className="shell"><SectionHeading eyebrow="מה אנחנו מנהלים" title={<>את הטכנולוגיה תשאירו<br /><em>אצלנו.</em></>} /><FeatureGrid items={coreFeatures.slice(0, 4)} /></div></section>
    </SitePage>
  );
}

const cases = [
  { industry: "אופנה", metric: "מידות וצבעים", title: "פיילוט אופנה", body: "נמדוד שאלות על מידות, צבעים, זמינות ומשלוחים, וכמה מהן מתקדמות להזמנה.", stat: "שאלות שחוזרות על עצמן" },
  { industry: "קוסמטיקה", metric: "התאמה לעור", title: "פיילוט קוסמטיקה", body: "נבדוק התאמה לעור, רכיבים והמלצות — וגם מתי נכון להעביר לנציג מקצועי.", stat: "המלצות בטוחות בלבד" },
  { industry: "בית", metric: "מלאי ומשלוח", title: "פיילוט בית", body: "נמדוד זמינות מלאי, השוואת מוצרים ומשלוחים, כדי להבין מה עוזר ללקוח לסגור.", stat: "מעבר משאלה לפעולה" },
];

function ResultsPage() {
  return (
    <SitePage>
      <PageHero eyebrow="תוצאות שאפשר למדוד" title={<>פחות שיחות אבודות.<br /><em>יותר החלטות קנייה.</em></>} lead="בפיילוט מודדים כמה שיחות קיבלו מענה בזמן, כמה לקוחות עברו משאלה להזמנה וכמה פעמים ורו העביר לנציג במקום לנחש." />
      <section className="section section-paper">
        <div className="shell">
          <SectionHeading eyebrow="כך נמדוד הצלחה בפיילוט" title={<>לא מבטיחים מספרים מראש.<br /><em>בונים מדידה נקייה.</em></>} lead="בכל חנות נגדיר לפני העלייה לאוויר מה נחשב שיחה מוצלחת ומה צריך לעבור לאדם." />
          <div className="case-grid">
            {cases.map((item) => <article className="case-study reveal" key={item.title}><span>{item.industry}</span><strong>{item.metric}</strong><small>{item.stat}</small><h3>{item.title}</h3><p>{item.body}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section result-section"><div className="shell featured-result"><div><p className="eyebrow eyebrow-mint">המדדים הראשונים</p><h2>מענה בזמן.<br /><em>העברה חכמה לאדם.</em></h2></div><blockquote>במקום להציג מספרים שלא אומתו, Surevo מתחיל ממדידה: זמן תגובה, שיחות שהתקדמו להזמנה, סלים שחזרו, ומקרים שבהם ורו בחר לא להמציא תשובה.</blockquote></div></section>
    </SitePage>
  );
}

function AgenciesPage() {
  return (
    <SitePage>
      <PageHero
        eyebrow="Surevo for Agencies"
        title={<>AI מכירות ללקוחות שלכם.<br /><em>בלי לבנות צוות חדש.</em></>}
        lead="מתאים לסוכנויות שמנהלות לפחות 5 חנויות WooCommerce פעילות. אתם מביאים את הלקוח והקשר. אנחנו מטפלים בהקמה, חיבורים, אימון וריפורטינג."
        primaryCta={{ label: "דברו איתנו על שותפות", href: "/agencies#partner" }}
        secondaryCta={{ label: "ראו איך ורו עובד", href: "/how-it-works" }}
      />
      <section className="section section-paper"><div className="shell"><SectionHeading eyebrow="שותפות שחוזרת כל חודש" title={<>שירות חדש.<br /><em>הכנסה חוזרת.</em></>} /><FeatureGrid items={[
        { icon: "chart", title: "עד 30% עמלה חוזרת", body: "כל לקוח פעיל מוסיף הכנסה חודשית יציבה לסוכנות." },
        { icon: "shield", title: "אנחנו מטפלים בטכנולוגיה", body: "הקמה, חיבורים, אימון ושיפור נשארים אצל צוות Surevo." },
        { icon: "users", title: "אתם שומרים על הקשר", body: "White-label או co-branded, בהתאם לדרך שבה אתם עובדים." },
      ]} /></div></section>
      <section className="section section-mint">
        <div className="shell faq-layout">
          <SectionHeading eyebrow="לפני שמציעים ללקוח" title={<>איך זה עובד<br /><em>בשותפות.</em></>} lead="מודל השותפות נבנה כך שהלקוח מקבל שירות מנוהל ואתם נשארים בעל הקשר העסקי." />
          <div className="faq-list reveal">
            {[
              ["איך עובדת העמלה?", "עמלה חוזרת נקבעת לפי סוג הלקוח, המסלול והיקף המעורבות של הסוכנות."],
              ["האם אפשר white-label?", "כן. אפשר לעבוד white-label או co-branded, בהתאם לאופן שבו אתם מנהלים לקוחות."],
              ["מי נותן תמיכה ללקוח?", "Surevo מטפלת בהקמה, חיבורים, אימון וריפורטינג. הסוכנות יכולה להישאר נקודת הקשר המסחרית."],
              ["האם יש דמו לסוכנות?", "כן. בשיחה הראשונה נציג דמו ונבדוק אילו לקוחות מתאימים לפיילוט."],
            ].map(([question, answer], index) => (
              <article className={`faq-item ${index === 0 ? "open" : ""}`} key={question}>
                <button type="button" aria-expanded={index === 0 ? "true" : "false"}><span>{question}</span><Icon name="chevron" /></button>
                <div className="faq-answer" aria-hidden={index === 0 ? "false" : "true"}><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section audit-section" id="partner"><div className="shell audit-layout"><div className="audit-copy"><p className="eyebrow">בואו נדבר שותפות</p><h2>כמה לקוחות יכולים<br /><em>להתחיל למכור יותר?</em></h2><p>ספרו לנו על הסוכנות ונחזור עם מודל שמתאים לתיק הלקוחות שלכם.</p></div><AuditForm partner /></div></section>
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
          <div><p>Surevo נבנה על ידי Fast Cybers, צוות ישראלי לפיתוח ואוטומציה לעסקים דיגיטליים. ראינו חנויות משקיעות בפרסום, במוצרים ובאתר, ואז מאבדות את הלקוח דווקא ברגע שבו הוא שאל שאלה קטנה.</p><p>בנינו את ורו כדי לענות ברגע הזה: בלי להעמיס עוד כלי על העסק ובלי להפוך שיחה אנושית לתפריט כפתורים קר.</p><p>מאחורי ורו יש צוות אנושי שבודק את ההקמה, את התשובות ואת המדידה, כדי שהשירות ירגיש אחראי ולא אוטומטי מדי.</p></div>
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
      <PageHero eyebrow="אנחנו כאן" title={<>בואו נדבר<br /><em>על החנות שלכם.</em></>} lead="השאירו פרטים לאבחון או כתבו לנו ישירות בוואטסאפ. מענה אנושי תוך יום עסקים." />
      <section className="section audit-section">
        <div className="shell audit-layout">
          <div className="contact-panel"><p className="eyebrow">צור קשר</p><h2>תשובה אנושית.<br /><em>תוך יום עסקים.</em></h2><p>אפשר להתחיל באבחון החינמי או לכתוב לנו. Surevo נבנה על ידי Fast Cybers, צוות ישראלי שעובד עם חנויות וסוכנויות בכל הארץ.</p><a className="button button-primary button-lg" href="https://wa.me/972500000000"><Icon name="whatsapp" /> דברו איתנו בוואטסאפ</a><a className="text-link contact-email" href="mailto:hello@surevo.ai">hello@surevo.ai</a><div className="contact-detail"><Vero expression="wink" /><span>נבנה בישראל<br /><small>מענה אנושי תוך יום עסקים</small></span></div></div>
          <AuditForm context="contact" />
        </div>
      </section>
    </SitePage>
  );
}

const legalSections = {
  privacy: [
    ["איזה מידע אנחנו אוספים", "אנחנו אוספים רק את הפרטים הדרושים כדי לספק אבחון, לחזור אליכם ולהפעיל את השירות: שם, פרטי קשר, כתובת חנות, מידע תפעולי ומידע שתבחרו לחבר או לשתף."],
    ["איך אנחנו משתמשים במידע", "המידע משמש להפעלת השירות, אבחון ראשוני, יצירת קשר, שיפור ביצועים, תמיכה, אבטחה ותקשורת שקשורה ישירות לבקשה או להסכם שלכם עם Surevo."],
    ["חיבור למערכות צד שלישי", "ייתכן שנשתמש בספקי תשתית, אוטומציה, אנליטיקה, WhatsApp Business Platform, מערכות CRM, ומערכות סליקה או חשבוניות לפי הצורך."],
    ["שימוש בוואטסאפ", "כאשר אתם משאירים מספר וואטסאפ ומאשרים יצירת קשר, אנחנו משתמשים במספר רק כדי לחזור אליכם לגבי הבקשה, האבחון או השירות. ניתן לבקש להפסיק לקבל הודעות בכל רגע."],
    ["שמירת מידע ומחיקה", "נשמור מידע רק כל עוד הוא נדרש למטרה שלשמה נמסר, להפעלת השירות, לעמידה בהתחייבויות או לפי דין. ניתן לפנות אלינו לבקשת מחיקה או תיקון."],
    ["מי נחשף למידע", "גישה למידע ניתנת רק לצוות Surevo ולספקים הדרושים להפעלת השירות, ובמידה הדרושה למטרה הרלוונטית."],
    ["אבטחת מידע", "אנחנו מגבילים גישה למידע ופועלים לצמצום, שמירה ואבטחה בהתאם לדין החל ולצרכים התפעוליים של השירות."],
    ["זכויות המשתמש", "ניתן לפנות אלינו כדי לבקש עיון, תיקון, מחיקה או הפסקת יצירת קשר, בהתאם לדין החל וליכולתנו הטכנית והתפעולית."],
    ["עדכון אחרון", "עודכן לאחרונה: 26 ביוני 2026."],
  ],
  terms: [
    ["הגדרת השירות", "Surevo מספקת שירות סוכן מכירות דיגיטלי מנוהל לאתר, וואטסאפ ומערכות מסחר. היקף ההקמה, החיבורים והליווי נקבע לפי המסלול וההצעה המסחרית."],
    ["שירות מנוהל ולא ייעוץ", "השירות אינו מהווה ייעוץ משפטי, חשבונאי, רפואי או מקצועי אחר. החלטות עסקיות נשארות באחריות הלקוח."],
    ["אחריות הלקוח לדיוק מידע המוצרים", "הלקוח אחראי לספק מידע מדויק, הרשאות מתאימות, מדיניות עדכנית ותוכן חוקי לשימוש במערכת ובערוצי התקשורת המחוברים."],
    ["מגבלות AI והעברה לנציג", "Surevo פועלת לפי המידע שמחובר ונמסר על ידי הלקוח. במקרים שבהם אין מידע מספיק או שיש צורך בשיקול דעת אנושי, המערכת עשויה להעביר את השיחה לנציג."],
    ["תשלומים, הקמה וביטול", "דמי הקמה, תשלום חודשי, חיבורים מיוחדים ותנאי ביטול יפורטו בהצעה המסחרית או בהסכם מול הלקוח."],
    ["אחריות 30 יום", "כאשר מוצעת אחריות הקמה, תנאיה יחולו רק לפי ההצעה המסחרית. ככלל, נמדוד יחד בחודש הראשון אם השירות מחזיר את דמי השירות החודשיים; אם לא, נפעל לפי תנאי האחריות שסוכמו."],
    ["שימוש בוואטסאפ וערוצי צד שלישי", "הפעלת השירות כפופה גם לזמינות, למדיניות ולמגבלות של WhatsApp Business Platform וספקי צד שלישי נוספים."],
    ["זמינות השירות", "אנחנו שואפים לזמינות גבוהה, אך ייתכנו תקלות, עבודות תחזוקה או מגבלות מצד ספקי צד שלישי."],
    ["קניין רוחני", "האתר, המותג, העיצובים, התוכן והטכנולוגיה של Surevo הם קניינה של Surevo או של מעניקי רישיון מטעמה."],
    ["הגבלת אחריות", "בכפוף לדין החל, Surevo לא תישא באחריות לנזקים עקיפים, אובדן רווחים או תוצאות עסקיות שלא הובטחו במפורש בהסכם."],
    ["שינויים ועדכונים", "אנחנו עשויים לעדכן את השירות ואת התנאים מעת לעת. שינוי מהותי יפורסם בצורה ברורה ובזמן סביר."],
  ],
  accessibility: [
    ["מחויבות לנגישות", "אנחנו פועלים כדי שהאתר והשירות יהיו נגישים לשימוש רחב ככל האפשר, בהתאם לעקרונות WCAG 2.1 AA."],
    ["מה כבר יישמנו", "האתר כולל ניווט מקלדת, טבעות focus ברורות, היררכיית כותרות, ניגודיות, טקסט חלופי ותמיכה בהפחתת תנועה."],
    ["רכז נגישות", "רכז נגישות: צוות Surevo. אפשר לפנות אלינו בכתובת hello@surevo.ai או דרך עמוד יצירת הקשר."],
    ["זמן מענה", "נשתדל לחזור לפניות נגישות בתוך 3 ימי עסקים."],
    ["עדכון אחרון", "עודכן לאחרונה: 26 ביוני 2026."],
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
  if (!(slug in pages) || !(slug in pageSeo)) return {};
  return getPageMetadata(slug as SeoPage);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();
  return renderPage(slug as Slug);
}
