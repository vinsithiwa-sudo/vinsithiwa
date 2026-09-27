/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vinsithiwa.vercel.app";

const nextSitemapConfig = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/api", "/order-confirmation"] },
    ],
  },
  exclude: ["/admin/*", "/api/*", "/order-confirmation/*"],
};

module.exports = nextSitemapConfig;
