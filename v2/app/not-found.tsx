import { Icon, SitePage, Vero, HOME, withBase } from "../components/site";

export default function NotFound() {
  return (
    <SitePage>
      <section className="not-found">
        <div className="shell">
          <Vero expression="thinking" size="xl" />
          <span>404</span>
          <h1>הדף לא נמצא.<br /><em>אבל ורו כאן לעזור.</em></h1>
          <p>יכול להיות שהקישור השתנה. אפשר לחזור הביתה או להתחיל באבחון קצר לחנות.</p>
          <div><a className="button button-primary button-lg" href={HOME}>חזרה לעמוד הבית <Icon name="arrow" /></a><a className="button button-outline button-lg" href={withBase("/audit")}>קבל אבחון חינם</a></div>
        </div>
      </section>
    </SitePage>
  );
}
