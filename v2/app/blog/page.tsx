import type { Metadata } from "next";
import { Icon, PageHero, SectionHeading, SitePage, withBase } from "../../components/site";
import { posts } from "../../lib/blog";
import { getPageMetadata } from "../../lib/seo";

export const metadata: Metadata = getPageMetadata("blog");

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <SitePage>
      <PageHero eyebrow="Surevo Journal" title={<>מחשבות שימושיות<br /><em>על שיחות שמוכרות.</em></>} lead="מדריכים קצרים לחנויות שרוצות להחזיר יותר הכנסה מהטראפיק שכבר מגיע אליהן." />
      <section className="section section-paper">
        <div className="shell">
          <SectionHeading eyebrow="חדש בבלוג" title={<>בלי רעש.<br /><em>רק דברים שאפשר ליישם.</em></>} />
          <a className="featured-post reveal" href={withBase(`/blog/${featured.slug}`)}>
            <div><span>{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><b>לקריאה <Icon name="arrow" /></b></div>
            <div className="post-art"><i /><i /><i /><strong>01</strong></div>
          </a>
          <div className="post-grid">
            {rest.map((post, index) => (
              <a className="post-card reveal" href={withBase(`/blog/${post.slug}`)} key={post.slug}>
                <span>{post.category}</span><small>{post.date} · {post.read}</small><h3>{post.title}</h3><p>{post.excerpt}</p><b>לקריאה <Icon name="arrow" /></b><em>0{index + 2}</em>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
