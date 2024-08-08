import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "/context/searchListViewContext";
import { ThemeContext } from "../../../context/ThemeProvider";

const MenuAfterScanHeader = ({
	slug,
	point_id,
	item,
	setOpen,
	searchText,
	setSearchText,
	setOpenSearch,
	searchShow = true,
	onEnter = function () { },
	inputOnChange = function () { },
	clickedInfo = function () { },
}) => {
	const router = useRouter();
	const [isScroll, setIsScroll] = useState(false);
	const [inputText, setInputText] = useState("");
	const { setOpenInfo } = useContext(UserContext);
	const { t, i18n } = useTranslation("common");
	const { theme, toggleTheme } = useContext(ThemeContext)

	const [lang, setLang] = useState(i18n?.language?.toUpperCase());
	const languages = {
		en: "English",
		al: "Albanian",
		de: "German",
		es: "Spanish",
		fr: "French",
		it: "Italian",
		pt: "Portuguese",
		ru: "Russian",
		pl: "Polish",
		tr: "Turkish",
		hr: "Croatian",
	};

	useEffect(() => {
		document.addEventListener("scroll", () => {
			window.scrollY >= 50 ? setIsScroll(true) : setIsScroll(false);
		});
	}, [setIsScroll]);

	const myFunction = () => {
		// your logic here
		setSearchText(inputText);
		onEnter();
	};

	function keyPressed(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			myFunction();
		}
	}

	function handleLanguageChange(e) {
		let _lang = e.target.value;

		setLang(_lang);
		i18n.changeLanguage(_lang);

		// change the locales
		router.push(router.pathname, router.asPath, { locale: _lang });
	}

	return (
		<>
			<Head>
				<title>{""}</title>
			</Head>

			<header
				className={`header-fixed-top header-transparent scan-menu-header d-flex ${isScroll && slug == "menu" ? " header-fixed-top-scrolling  " : ""
					}`}
				style={{ border: "0" }}
			>
				<br />
				{/* <div className="container-fluid"> */}
				<div className="w-100">
					{/* <div> eed</div> */}
					<nav className="navbar style_one">
						<div className={isScroll ? "hide-on-scroll" : "nav-logo pc-menu"}>
							<Link href="/">
								<img
									src="/assets/images/ozzo-logo.svg"
									alt=""
								/>
							</Link>
						</div>

						<div
							className="nav-floating-back pc-menu"
							style={{display:isScroll ? "none" : "block"}}
							// onClick={() => router.push({ pathname: `/` })}
							// onClick={() => router.back()}
							onClick={() => {
								switch (slug) {
									case "product-details":
										router.back();
										break;
									case "restaurant-profile":
										router.back();
										break;
									case "menu":
										// get first element after restaurant-profile in the url
										let point = router.asPath.split("/")[2];
										router.push({ pathname: `/restaurant-profile/${point}` });
										break;
									default:
										router.push({ pathname: `/` });
										break;
								}
							}}
						>
							<img
								src="/assets/images/icons/icon-header-back.svg"
								alt=""
							/>
						</div>
						{slug == "menu"
							? searchShow == true && (
								<div className="nav-search pc-menu">
									<input
										type="search"
										name=""
										id="home-search-bar"
										placeholder="Search..."
										value={searchText}
										onChange={(e) => {
											setInputText(e.target.value);
											setSearchText(e.target.value);
											inputOnChange();
										}}
										onKeyDown={(e) => {
											keyPressed(e);
										}}
									/>
								</div>
							)
							: null}
						<div
							className={` ${isScroll && slug == "menu"
								? "mobile-nav-action-scrolling gray mobile-menu"
								: "mobile-nav-action gray mobile-menu"
								}`}
							// }}
							onClick={() => {
								switch (slug) {
									case "product-details":
										const {restauranId, menu} = router.query;
										router.push(`/restaurant-profile/${restauranId}/${menu}`);
										break;
									case "restaurant-profile":
										router.push('/');
										break;
									case "menu":
										// get first element after restaurant-profile in the url
										let point = router.asPath.split("/")[2];
										router.push({ pathname: `/restaurant-profile/${point}` });
										break;
									default:
										router.push({ pathname: `/` });
										break;
								}
							}}
						>
							<img
								src="/assets/icons/icon-header-back.svg"
								alt=""
								className="light-hidden"
								/>
							<img
								src="/assets/icons/icon-header-back-dark.svg"
								alt=""
								className="dark-hidden"
							/>
						</div>

						{/* change language  */}
						
						<LanguageSelector />
						{slug == "restaurant-profile" && <div
						className={` ${
							isScroll && slug == "menu"
								? "mobile-nav-action-scrolling gray mobile-menu hide-fixed-top-scrolling"
								: "mobile-nav-action gray mobile-menu"
						}`}
						// onClick={() => {
						// 	switch (slug) {
						// 		case "product-details":
						// 			setOpenInfo(true);
						// 			clickedInfo();
						// 			break;
						// 		case "restaurant-profile":
						// 			router.back();
						// 			break;
						// 		case "menu":
						// 			// get first element after restaurant-profile in the url
						// 			let point = router.asPath.split("/")[2];
						// 			router.push({ pathname: `/restaurant-profile/${point}` });
						// 			break;
						// 		default:
						// 			router.push({ pathname: `/` });
						// 			break;
						// 	}
						// 	setOpenInfo(true);
						// 	clickedInfo();
						// }}
						onClick={toggleTheme}
					>
						<img
							src="/assets/icons/themeIcon.svg"
							alt=""
							className={`${theme === "dark" && "btn_active"} theme-btn`}
						/>
					</div>}
					</nav>
				</div>
			</header>
		</>
	);

	function LanguageSelector() {
		if (slug == "menu" || slug == "product-details") {
			return (
				<div
					className="mobile-group-actions"
					style={{ cursor: "pointer" }}
				>
					<div
						className={` ${isScroll && slug == "menu"
							? "mobile-nav-action-scrolling gray mobile-menu hide-fixed-top-scrolling"
							: "mobile-nav-action gray mobile-menu"
							}`}
						onClick={() => {
							switch (slug) {
								case "product-details":
									setOpenInfo(true);
									clickedInfo();
									break;
								case "restaurant-profile":
									router.back();
									break;
								case "menu":
									// get first element after restaurant-profile in the url
									// let point = router.asPath.split("/")[2];
									// router.push({ pathname: `/restaurant-profile/${point}` });
									toggleTheme();
									break;
								default:
									router.push({ pathname: `/` });
									break;
							}
							clickedInfo();
						}}
						// onClick={toggleTheme}
					>
						<img
							src={slug === "menu" ? "/assets/icons/themeIcon.svg" : "/assets/icons/icon-info.svg"}
							alt=""
							className={`${theme === "dark" && "btn_active"} theme-btn`}
						/>
					</div>
					{slug == "menu" && (
						<div
							className={` ${isScroll && slug == "menu"
								? "mobile-nav-action-scrolling gray mobile-menu"
								: "mobile-nav-action gray mobile-menu"
								}`}
							onClick={() => {
								setOpenSearch(true);
							}}
						>
							<img
								src="/assets/images/icons/icon-header-search.svg"
								alt=""
							/>
						</div>
					)}
				</div>
			);
		} else
			return (
				<div className="mobile-group-actions">
					<select
						className="nav-dropdown-action change-language-select"
						id="lang"
						onChange={handleLanguageChange}
						value={lang}
						style={{
							border: "none",
							backgroundColor: "transparent !important",
						}}
					>
						{Object.keys(languages).map((lang) => (
							<option
								key={lang}
								value={lang}
							>
								{t(languages[lang])}
							</option>
						))}
					</select>
					<img src="/assets/icons/translateIcon.svg" style={{
						width: '24px',
						height: '24px'
					}}
					className="translationIcon"
					 />
				</div>
			);
	}
};

export default MenuAfterScanHeader;
