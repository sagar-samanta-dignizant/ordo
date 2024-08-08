import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import ScanMenuMenuRecentPopup from "/components/header/scan-menu-header/recent-popup.js";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ScanMenuHeader from "/components/header/scan-menu-header";
import ProductDetails, { ProfileHeader } from "/containers/product-details";

export async function getStaticProps({ locale }) {
	console.log(locale);
	if (typeof locale === "undefined") {
		locale = "en";
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])), // Will be passed to the page component as props
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
	const router = useRouter();
	const [searchText, setSearchText] = useState("");
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [mobileView, setMobileView] = useState(false);
	const [resultsList, setResultsList] = useState([]);
	const [headerImageMobile, setHeaderImageMobile] = useState("");

	const getResultsData = () => {};
	console.log(resultsList);
	var show_search_modal = false;
	if (mobileView == true && openSearchModal) {
		show_search_modal = true;
	} else if (searchText != "" ? true : false) {
		show_search_modal = true;
	}

	// console.log('router', router)

	return (
		<div>
			<Head>
				<title>{router.query.product_slug}</title>
			</Head>
			<ScanMenuHeader
				searchText={searchText}
				setSearchText={setSearchText}
				setOpenSearch={setOpenSearchModal}
				onEnter={() => {
					getResultsData();
				}}
				searchShow={false}
				slug={"product-details"}
			/>
			<ProfileHeader
				mobileView={mobileView}
				headerImageMobile={headerImageMobile}
			/>

			<ProductDetails
				id={router.query.product_slug}
				setHeaderImageMobile={setHeaderImageMobile}
			/>

			<ScanMenuMenuRecentPopup
				show={show_search_modal}
				setInputText={setSearchText}
				inputText={searchText}
				results={resultsList}
				mobileView={mobileView}
				inputOnChange={() => {
					getResultsData();
				}}
				closeModal={() => {
					setOpenSearchModal(false);
				}}
			/>
		</div>
	);
}
