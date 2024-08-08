const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: [`${SITE_URL}/server-sitemap.xml`],
	},
};

module.exports = config;
