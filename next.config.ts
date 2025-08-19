/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "my-app"; // <-- CHANGE to your repo name

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
