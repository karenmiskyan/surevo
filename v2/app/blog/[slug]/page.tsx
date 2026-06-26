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

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
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
          <aside><b>במאמר הזה</b><a href="#moment">הרגע שלפני ההזמנה</a><a href="#questions">שאלות טובות</a><a href="#measure">מה מודדים</a></aside>
          <div className="article-copy">
            <p className="article-lead">לקוח שכותב לחנות כבר עשה כמעט את כל הדרך. הוא ראה מוצר, עצר ושאל. עכשיו השיחה צריכה לעזור לו להתקדם בלי להפוך ללחץ.</p>
            <h2 id="moment">הרגע שלפני ההזמנה</h2>
            <p>הרבה חנויות מתייחסות לוואטסאפ כערוץ שירות בלבד. אבל רוב השאלות שמגיעות אליו הן סימן לכוונת רכישה: יש מידה? זה מגיע עד חמישי? מה יתאים לעור רגיש? כל תשובה טובה מורידה עוד שכבה קטנה של חוסר ודאות.</p>
            <blockquote>״שיחת מכירה טובה לא מרגישה כמו מכירה. היא מרגישה כמו מישהו שעזר בדיוק בזמן.״</blockquote>
            <h2 id="questions">לשאול לפני שמציעים</h2>
            <p>המלצה מדויקת מתחילה בשאלה קצרה. במקום לשלוח קישור לכל הקטלוג, כדאי להבין מה הלקוח מחפש ומה חשוב לו באמת.</p>
            <ul><li>לבדוק את ההקשר לפני שמציעים מוצר.</li><li>לענות ישירות לשאלה ורק אז להוסיף המלצה.</li><li>להשתמש בהנחה רק כשהיא פותרת חסם אמיתי.</li></ul>
            <div className="article-cta"><Vero expression="wink" /><div><b>רוצה לראות את זה על החנות שלך?</b><p>האבחון החינמי כולל דמו קצר עם המוצרים האמיתיים שלך.</p></div><a className="button button-primary" href={withBase("/audit")}>קבל אבחון <Icon name="arrow" /></a></div>
            <h2 id="measure">מה מודדים בסוף</h2>
            <p>לא את כמות ההודעות. מודדים הזמנות שהושלמו, סלים שחזרו, זמן תגובה ושאלות שחוזרות על עצמן. כך השיחה הופכת למערכת שלומדת ומשתפרת בכל חודש.</p>
            <div className="author"><Vero /><div><b>צוות Surevo</b><span>בונים את ורו בישראל, יחד עם חנויות שמוכרות בישראל.</span></div></div>
          </div>
        </div>
      </article>
    </SitePage>
  );
}
