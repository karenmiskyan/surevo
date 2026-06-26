import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://surevo.ai";

const ogImagePath = "/og/surevo-whatsapp-sales-agent-he.png";
const ogImageUrl = `${siteUrl}${ogImagePath}`;

export const sharedOg = {
  image: ogImageUrl,
  width: 1200,
  height: 630,
  alt: "Surevo - סוכן מכירות לוואטסאפ לחנויות WooCommerce בישראל",
};

export const pageSeo = {
  home: {
    path: "/",
    title: "Surevo | סוכן מכירות לוואטסאפ לחנויות WooCommerce בישראל",
    description:
      "Surevo הוא סוכן מכירות מנוהל לאתר ולוואטסאפ של חנויות WooCommerce בישראל. עונה בעברית טבעית לפי קטלוג, מלאי ומדיניות החנות — ומעביר לנציג כשצריך. קבלו אבחון מכירות חינם תוך 24 שעות.",
    ogTitle: "Surevo | סוכן מכירות לוואטסאפ לחנויות WooCommerce בישראל",
    ogDescription:
      "המוכר הדיגיטלי שלך לאתר ולוואטסאפ. Surevo עונה לפי המידע האמיתי של החנות, מוביל שיחות להזמנה ומעביר לנציג כשצריך.",
    twitterTitle: "Surevo | סוכן מכירות לוואטסאפ",
    twitterDescription:
      "סוכן מכירות מנוהל לחנויות WooCommerce בישראל. אתר + וואטסאפ + עברית טבעית + אבחון חינם.",
  },
  audit: {
    path: "/audit",
    title: "אבחון מכירות חינם לחנות WooCommerce | Surevo",
    description:
      "קבלו אבחון מכירות חינם לחנות WooCommerce בישראל. בתוך 24 שעות נשלח שלוש הזדמנויות לשיפור מכירות בוואטסאפ ובאתר, כולל דמו של ורו על החנות שלכם.",
  },
  pricing: {
    path: "/pricing",
    title: "תמחור Surevo | סוכן מכירות מנוהל לאתר ולוואטסאפ",
    description:
      "מסלולי Surevo לחנויות WooCommerce בישראל: הקמה מנוהלת, אתר + וואטסאפ, סנכרון קטלוג ומלאי, חיבורים ישראליים ודוח ביצועים חודשי.",
  },
  results: {
    path: "/results",
    title: "תוצאות ומדדים | Surevo",
    description:
      "כך מודדים הצלחה עם Surevo: הכנסות שחזרו לחנות, שיחות שקיבלו מענה בזמן, סלים שניצלו ושיפור בשיחות מכירה באתר ובוואטסאפ.",
  },
  agencies: {
    path: "/agencies",
    title: "Surevo לסוכנויות | AI מכירות ללקוחות WooCommerce",
    description:
      "שותפות Surevo לסוכנויות דיגיטל שמנהלות חנויות WooCommerce: שירות מכירות AI מנוהל, white-label או co-branded, ועד 30% עמלה חוזרת.",
  },
  agent: {
    path: "/agent",
    title: "הכירו את ורו | סוכן המכירות הדיגיטלי של Surevo",
    description:
      "ורו הוא סוכן מכירות לאתר ולוואטסאפ: מכיר את המוצרים, עונה בעברית טבעית, מוביל להזמנה ומעביר לנציג כשצריך.",
  },
  "how-it-works": {
    path: "/how-it-works",
    title: "איך Surevo עובד | מחיבור ראשון לשיחה שסוגרת",
    description:
      "כך Surevo עובד: מחברים קטלוג, מלאי, תשלומים, חשבוניות ווואטסאפ; מלמדים את ורו את שפת המכירה; עולים לאוויר וממשיכים לשפר כל חודש.",
  },
  about: {
    path: "/about",
    title: "אודות Surevo | נבנה בישראל בשביל מסחר ישראלי",
    description:
      "Surevo נבנה בישראל עבור חנויות שמוכרות בישראל. סוכן מכירות שמבין עברית, וואטסאפ, שקלים ואת הדרך שבה לקוחות ישראליים באמת קונים.",
  },
  contact: {
    path: "/contact",
    title: "צור קשר | Surevo",
    description:
      "דברו עם Surevo על סוכן מכירות לאתר ולוואטסאפ של החנות שלכם. אפשר להתחיל באבחון חינם או לפנות ישירות בוואטסאפ.",
  },
  privacy: {
    path: "/privacy",
    title: "מדיניות פרטיות | Surevo",
    description:
      "מדיניות הפרטיות של Surevo: איזה מידע אנחנו אוספים, איך אנחנו משתמשים בו, איך שומרים עליו ואיך אפשר ליצור איתנו קשר.",
  },
  terms: {
    path: "/terms",
    title: "תנאי שימוש | Surevo",
    description:
      "תנאי השימוש של Surevo: היקף השירות, אחריות הלקוח, תשלומים, שימוש בערוצי צד שלישי, מגבלות השירות ויצירת קשר.",
  },
  accessibility: {
    path: "/accessibility",
    title: "הצהרת נגישות | Surevo",
    description:
      "הצהרת הנגישות של Surevo: אנחנו פועלים כדי לאפשר חוויית שימוש נגישה באתר ובשירות בהתאם לעקרונות WCAG 2.1 AA.",
  },
  blog: {
    path: "/blog",
    title: "בלוג Surevo | מכירות בוואטסאפ, WooCommerce ו-AI מקומי",
    description:
      "מדריכים קצרים לחנויות WooCommerce בישראל שרוצות להפוך יותר שיחות בוואטסאפ להזמנות, לשפר מענה ולמדוד הכנסה שחזרה לחנות.",
  },
} as const;

export type SeoPage = keyof typeof pageSeo;

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getPageMetadata(page: SeoPage, options: { noindex?: boolean } = {}): Metadata {
  const item = pageSeo[page];
  const canonical = absoluteUrl(item.path);
  const ogTitle = "ogTitle" in item ? item.ogTitle : item.title;
  const ogDescription = "ogDescription" in item ? item.ogDescription : item.description;
  const twitterTitle = "twitterTitle" in item ? item.twitterTitle : item.title;
  const twitterDescription = "twitterDescription" in item ? item.twitterDescription : item.description;

  return {
    metadataBase: new URL(siteUrl),
    title: item.title,
    description: item.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "he_IL",
      url: canonical,
      siteName: "Surevo",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: sharedOg.image,
          width: sharedOg.width,
          height: sharedOg.height,
          alt: sharedOg.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: [sharedOg.image],
    },
    robots: options.noindex ? { index: false, follow: true } : undefined,
  };
}
