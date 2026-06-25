import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/v2";
const output = process.env.NEXT_OUTPUT === "export" ? "export" : undefined;

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  ...(output ? { output, trailingSlash: true } : {}),
};

export default nextConfig;
