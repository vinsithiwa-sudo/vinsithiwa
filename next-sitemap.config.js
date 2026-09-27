/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

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
