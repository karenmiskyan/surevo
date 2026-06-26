import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon, SitePage, Vero, withBase } from "../../../components/site";
import { getPost, posts } from "../../../lib/blog";
import { absoluteUrl, sharedOg } from "../../../lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: `${post.title} | Surevo`,
    description: post.excerpt,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      type: "article",
      locale: "he_IL",
      url,
      siteName: "Surevo",
      title: `${post.title} | Surevo`,
      description: post.excerpt,
      images: [{ url: sharedOg.image, width: sharedOg.width, height: sharedOg.height, alt: sharedOg.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Surevo`,
      description: post.excerpt,
      images: [sharedOg.image],
    },
  };
}

const articleBodies = {
  "whatsapp-sales-guide": {
    nav: [
      ["intent", "כוונת קנייה"],
      ["recommend", "המלצה עדינה"],
      ["close", "סגירה טבעית"],
    ],
    lead: "לקוח ששואל בוואטסאפ לא תמיד רוצה עוד מידע. הרבה פעמים הוא מחפש ביטחון קטן לפני הזמנה: מידה, משלוח, התאמה או דרך תשלום. המטרה היא לעזור לו להתקדם בלי להפוך את השיחה ללחץ.",
    sections: [
      {
        id: "intent",
        title: "לזהות אם זו שאלה או חסם קנייה",
        paragraphs: [
          "שאלה כמו ״יש את זה במידה 39?״ נשמעת טכנית, אבל היא כמעט תמיד רגע קנייה. תשובה טובה צריכה לענות ישירות, ואז להציע את הצעד הבא: קישור למוצר, צבע חלופי או בדיקה של משלוח.",
          "ורו בודק את הקטלוג, המלאי ומדיניות החנות לפני שהוא עונה. אם אין מידע בטוח, הוא לא ממציא תשובה אלא מעביר לנציג.",
        ],
      },
      {
        id: "recommend",
        title: "להמליץ בלי להישמע כמו מכירה אגרסיבית",
        quote: "המלצה טובה לא מתחילה במוצר. היא מתחילה בהבנה למה הלקוח שאל עכשיו.",
        paragraphs: [
          "במקום לשלוח חמישה קישורים, עדיף לשאול שאלה אחת קצרה ולהציע עד שתי אפשרויות מדויקות. כך הלקוח מרגיש שמבינים אותו, לא שדוחפים לו קטלוג.",
        ],
        list: [
          "לענות קודם לשאלה המקורית.",
          "להוסיף המלצה אחת עם סיבה ברורה.",
          "להשאיר ללקוח בחירה פשוטה: ״רוצה שאשלח קישור להזמנה?״",
        ],
      },
      {
        id: "close",
        title: "לסגור עם פעולה קטנה וברורה",
        paragraphs: [
          "השלב האחרון הוא לא נאום מכירה. זו פעולה קטנה: לשלוח קישור, לשמור מוצר, לבדוק צבע, או להעביר לנציג אם יש צורך אנושי.",
          "בסוף מודדים לא רק כמה הודעות נשלחו, אלא כמה שיחות התקדמו להזמנה, כמה שאלות חזרו על עצמן, וכמה פעמים ורו ידע לעצור במקום לנחש.",
        ],
      },
    ],
  },
  "abandoned-cart-recovery": {
    nav: [
      ["timing", "תזמון ההודעה"],
      ["blocker", "החסם האמיתי"],
      ["measure", "מדידת הצלה"],
    ],
    lead: "סל נטוש הוא לא תמיד לקוח שאיבד עניין. לפעמים הוא פשוט נעצר בשאלה שלא קיבלה תשובה: משלוח, תשלום, מידה, אחריות או חשש קטן לפני חיוב.",
    sections: [
      {
        id: "timing",
        title: "לפנות בזמן שבו זה עדיין רלוונטי",
        paragraphs: [
          "הודעה מהירה מדי מרגישה פולשנית, והודעה מאוחרת מדי מגיעה אחרי שהלקוח כבר עבר הלאה. בפיילוט נכון מגדירים חלון זמן ברור, שפה עדינה, ומתי עדיף לא לשלוח בכלל.",
          "המסר צריך להישמע כמו עזרה, לא כמו אזעקה: ״ראינו שנשאר לך מוצר בעגלה. אפשר לעזור עם משלוח, מידה או תשלום?״",
        ],
      },
      {
        id: "blocker",
        title: "לפתור חסם לפני שנותנים הנחה",
        quote: "הנחה היא כלי, לא ברירת מחדל. לפעמים מה שחסר ללקוח הוא ביטחון, לא מחיר נמוך יותר.",
        paragraphs: [
          "הרבה חנויות קופצות מיד לקופון, אבל זה לא תמיד מה שעוצר את ההזמנה. אם החסם הוא משלוח, זמינות או התאמה, הנחה לא תפתור אותו.",
        ],
        list: [
          "לשאול אם הייתה בעיה בתשלום או במשלוח.",
          "להציע תשובה קצרה לפי מדיניות החנות.",
          "לשלוח קישור חזרה לעגלה רק אחרי שהחסם ברור.",
        ],
      },
      {
        id: "measure",
        title: "למדוד הכנסה שחזרה, לא רק הודעות שנשלחו",
        paragraphs: [
          "המדד החשוב הוא כמה סלים באמת חזרו להזמנה, כמה לקוחות ביקשו עזרה, וכמה בחרו לא לקבל הודעות נוספות.",
          "כך הצלת סל הופכת מתזכורת כללית למערכת עדינה שמבינה מתי לעזור, מתי להציע, ומתי פשוט לא להפריע.",
        ],
      },
    ],
  },
  "hebrew-ai-agent": {
    nav: [
      ["context", "עברית והקשר"],
      ["trust", "אמון לפני מהירות"],
      ["launch", "בדיקות לפני השקה"],
    ],
    lead: "עברית טובה במסחר היא לא רק תרגום נכון. היא קצב, פנייה, קיצור, סלנג, שקלים, משלוחים, ותשובה שמרגישה כאילו מישהו מהחנות באמת הבין את הלקוח.",
    sections: [
      {
        id: "context",
        title: "עברית טבעית היא הבנת הקשר",
        paragraphs: [
          "לקוח ישראלי יכול לכתוב ״יש מצב מגיע עד חמישי?״, ״מה עם אחריות?״ או ״זה קטן במידות?״. אלה לא רק משפטים לתרגום, אלא כוונות שצריך להבין בתוך הקשר של מוצר, מלאי ומדיניות.",
          "ורו נבנה לשיחות מסחר בעברית: תשובות קצרות, מחירים בשקלים, והעברה לנציג כשהשאלה דורשת שיקול אנושי.",
        ],
      },
      {
        id: "trust",
        title: "לשמור על אמון גם כשאין תשובה",
        quote: "AI טוב למכירות לא נמדד רק במה שהוא יודע לענות. הוא נמדד גם במה שהוא מסרב להמציא.",
        paragraphs: [
          "הסכנה בצ׳אטבוטים היא תשובה שנשמעת בטוחה אבל לא נכונה. במכירה, טעות קטנה על משלוח, מלאי או החזרות יכולה להפוך להזמנה בעייתית.",
        ],
        list: [
          "להסתמך על קטלוג ומדיניות אמיתיים.",
          "להציג אי-ודאות בצורה ברורה כשצריך.",
          "להעביר לנציג במקום לענות על מידע חסר.",
        ],
      },
      {
        id: "launch",
        title: "מה בודקים לפני שנותנים לסוכן לדבר עם לקוחות",
        paragraphs: [
          "לפני עלייה לאוויר בודקים שאלות נפוצות, ניסוחים רגישים, מקרי קצה, וסוגי שיחות שבהם חייבת להיות העברה לאדם.",
          "אחרי ההשקה מודדים אי-הבנות, תיקונים, העברות לנציג ושיחות שהתקדמו להזמנה. זו הדרך להפוך עברית טבעית ליתרון מכירה אמיתי.",
        ],
      },
    ],
  },
} as const;

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const article = articleBodies[post.slug];
  return (
    <SitePage>
      <article className="article">
        <header className="article-head">
          <div className="shell article-shell">
            <a href={withBase("/blog")} className="breadcrumb">בלוג <Icon name="arrow" /></a>
            <span>{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            <small>{post.date} · {post.read} קריאה</small>
          </div>
        </header>
        <div className="shell article-layout">
          <aside>
            <b>במאמר הזה</b>
            {article.nav.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
          </aside>
          <div className="article-copy">
            <p className="article-lead">{article.lead}</p>
            {article.sections.map((section, index) => (
              <div key={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {"quote" in section && section.quote && <blockquote>{section.quote}</blockquote>}
                {"list" in section && section.list && <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul>}
                {index === 1 && (
                  <div className="article-cta">
                    <Vero expression="wink" />
                    <div><b>רוצה לראות את זה על החנות שלך?</b><p>האבחון החינמי כולל דמו קצר עם המוצרים האמיתיים שלך.</p></div>
                    <a className="button button-primary" href={withBase("/audit")}>קבל אבחון <Icon name="arrow" /></a>
                  </div>
                )}
              </div>
            ))}
            <div className="author"><Vero /><div><b>צוות Surevo</b><span>בונים את ורו בישראל, יחד עם חנויות שמוכרות בישראל.</span></div></div>
          </div>
        </div>
      </article>
    </SitePage>
  );
}
