/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "my-app"; // <-- CHANGE to your repo name

module.exports = {
  output: "export", // enables `next export`
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true }, // makes next/image work with static export
  trailingSlash: true, // helps with GitHub Pages routing
};
