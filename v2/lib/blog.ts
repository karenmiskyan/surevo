export const posts = [
  {
    slug: "whatsapp-sales-guide",
    category: "מכירות בוואטסאפ",
    title: "איך להפוך שאלות בוואטסאפ להזמנות בלי להישמע לוחצים",
    excerpt: "שש נקודות קטנות שהופכות שיחת שירות טובה לשיחת מכירה טבעית ומדויקת.",
    date: "1 ביוני 2026",
    read: "6 דקות",
  },
  {
    slug: "abandoned-cart-recovery",
    category: "המרות",
    title: "הסל נשאר מאחור. הלקוח לא חייב להיעלם איתו.",
    excerpt: "מתי נכון לשלוח הודעה, מה לשאול, ואיך לעזור לפני שמציעים הנחה.",
    date: "25 במאי 2026",
    read: "5 דקות",
  },
  {
    slug: "hebrew-ai-agent",
    category: "AI מקומי",
    title: "למה עברית טבעית היא יתרון מכירה ולא רק תרגום טוב",
    excerpt: "לקוחות ישראליים מדברים בקצב אחר. סוכן מכירות צריך להבין גם את מה שלא נאמר.",
    date: "14 במאי 2026",
    read: "7 דקות",
  },
] as const;

export type BlogPost = (typeof posts)[number];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
