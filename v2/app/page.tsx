import { readFileSync } from "node:fs";
import path from "node:path";
import Script from "next/script";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/v2";

function withBase(pathname: string) {
  return `${BASE}${pathname}`;
}

function getLandingMarkup() {
  const template = readFileSync(path.join(process.cwd(), "template.html"), "utf8");
  const match = template.match(/<body[^>]*>([\s\S]*?)<script src="\.\/app\.js"><\/script>\s*<\/body>/);

  if (!match) {
    throw new Error("Could not extract the Surevo landing page markup.");
  }

  return match[1]
    .replaceAll("../brand/logo/", withBase("/brand/logo/"))
    .replace(/href="\/v2(\/[^"]*)?"/g, (_match, pathname = "") => `href="${BASE}${pathname || "/"}"`);
}

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: getLandingMarkup() }} />
      <Script src={withBase("/app.js")} strategy="afterInteractive" />
    </>
  );
}
