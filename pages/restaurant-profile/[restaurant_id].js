import Head from "next/head";
import { useRouter } from "next/router";
import RestaurantProfileInfo from "/containers/restaurant-profile/restaurant-profile.info";
// tr
import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}

export async function getStaticPaths({ slug }) {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking", //indicates the type of fallback
	};
}

export default function Home(props) {
	const { t } = useTranslation("common");
	const router = useRouter();
	return (
		<div>
			<Head>
				<title>{router.query.restaurant_id}</title>
			</Head>

			<RestaurantProfileInfo id={router.query.restaurant_id} />
		</div>
	);
}
