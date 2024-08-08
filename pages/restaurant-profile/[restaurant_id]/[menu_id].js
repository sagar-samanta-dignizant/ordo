import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MenuAfterScanBody } from "../../../containers/menu-after-scan";
import ScanMenuHeader from "/components/header/scan-menu-header";
import ScanMenuMenuRecentPopup from "/components/header/scan-menu-header/recent-popup.js";
import RestaurantProfileHeader from "/containers/restaurant-profile/restaurant-profile.header";

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
export default function Menu(props) {
	useEffect(() => {
		var addScript = document.createElement("script");
		addScript.setAttribute(
			"src",
			"//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
		);
		document.body.appendChild(addScript);
		window.googleTranslateElementInit = googleTranslateElementInit;
	}, []);
	var duplicate_google_translate_counter = 0;

	function googleTranslateElementInit() {
		if (duplicate_google_translate_counter == 0) {
			new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
		}
		duplicate_google_translate_counter++;
	}

	const router = useRouter();
	const [searchText, setSearchText] = useState("");
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [mobileView, setMobileView] = useState(false);
	const [resultsList, setResultsList] = useState([]);
	const [menus, setMenus] = useState({});
	const [data, setData] = useState({ point: {} });
	const [isScroll, setIsScroll] = useState(false);
	const { hideHeader } = router.query;

	const getPointData = () => {
		var api_url = process.env.NEXT_PUBLIC_API_URL;
		fetch(`${api_url}/points/${router.query.restaurant_id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (myJson.data) {
					setData(myJson.data);
				}
			})
			.catch(function (e) {
				console.log(e);
			});
	};

	const getMenuData = () => {
		var url = process.env.NEXT_PUBLIC_API_URL;
		if (router.query.menu_id) {
			fetch(`${url}/menus/${router.query.menu_id}?populate_categories=true`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (myJson) {
					setMenus(myJson.data.menus);
				})
				.catch(function (e) {
					console.log(e);
				});
		}
	};

	const getResultsData = () => {
		var url = process.env.NEXT_PUBLIC_API_URL;
		fetch(`${url}/menus/${router.query.menu_id}?text=${searchText}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setResultsList(myJson.data.menus.items);
			});
	};

	useEffect(() => {
		if (window.innerWidth > 991) {
			setMobileView(false);
		} else if (window.innerWidth < 991) {
			setMobileView(true);
		}
		const handleResize = () => {
			if (window.innerWidth > 991) {
				setMobileView(false);
			} else if (window.innerWidth < 991) {
				setMobileView(true);
			}
		};
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (data.point.id) {
			getMenuData();
		}
	}, [data, router]);

	useEffect(() => {
		getPointData();
	}, [router]);

	useEffect(() => {
		document.addEventListener("scroll", () => {
			window.scrollY >= 50 ? setIsScroll(true) : setIsScroll(false);
		});
	}, [setIsScroll]);

	var show_search_modal = false;
	if (mobileView == true && openSearchModal) {
		show_search_modal = true;
	} else if (searchText != "" ? true : false) {
		show_search_modal = true;
	}

	return (
		<div>
			<Head>
				<title>{menus.name ? menus.name : ""}</title>
			</Head>
			{!hideHeader && (
				<>
					<ScanMenuHeader
						searchText={searchText}
						setSearchText={setSearchText}
						setOpenSearch={setOpenSearchModal}
						onEnter={() => {
							getResultsData();
						}}
						searchShow={true}
						slug="menu"
					/>

					<RestaurantProfileHeader
						key="header"
						data={data.point}
						slug="menu"
					/>

					<div
						id="google_translate_element"
						style={isScroll && mobileView == true ? { display: "none" } : { display: "block" }}
					></div>
				</>
			)}

			<MenuAfterScanBody
				menus={menus}
				pointData={data.point}
				hideHeader={hideHeader}
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
					setSearchText("");
				}}
				menu={router.query.menu_id}
			/>
		</div>
	);
}
