import type { Metadata } from "next";
import "./globals.css";
import { getPageMetadata, siteUrl } from "../lib/seo";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/v2";

export const metadata: Metadata = {
  ...getPageMetadata("home"),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: `${BASE}/brand/logo/surevo-appicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,500;9..40,700&family=Heebo:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
