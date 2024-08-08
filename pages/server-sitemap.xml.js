const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

function generateSiteMap(points) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${points
	?.map((point) => {
		const restaurant = `
	   <url>
	       <loc>${`${CLIENT_URL}/restaurant-profile/${point.id}`}</loc>
				 <changefreq>daily</changefreq>
				 <priority>0.7</priority>
	   </url>			 
	 `;
		const menu = point.menus
			?.map((menuId) => {
				return `
			 <url>
					 <loc>${`${CLIENT_URL}/restaurant-profile/${point.id}/${menuId}`}</loc>
					 <changefreq>daily</changefreq>
					 <priority>0.7</priority>
			 </url>
		 `;
			})
			?.join("");
		return restaurant + menu;
	})
	?.join("")}
   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
	// We make an API call to gather the URLs for our site
	const response = await fetch(`${API_URL}/points/ids`);
	const data = await response.json();
	const points = data.points;

	// We generate the XML sitemap with the posts data
	const sitemap = generateSiteMap(points);

	res.setHeader("Content-Type", "text/xml");
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default SiteMap;
