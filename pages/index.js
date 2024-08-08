// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useContext } from "react";
import ScanMenuButton from "../components/button/scanmenuButton";
import EatYouWantCardList from "../components/cardsList/eatCardsList/eatYouWant.cardsList";
import Filters from "../components/filters/filters";
import Footer from "../components/footer/footer";
import FilterSlider from "../components/headerFilters/underneathHeaderFilters.js";
import CategorySlider from "../components/slider/category/category.slider";
import RestaurantSlider from "../components/slider/restaurant/restaurant.slider";
import Newest from "../containers/home/newest.js";
import HomeHeader from "/components/navbar/home-navbar.js";
import OfferSlider from "/components/slider/offer/offer.slider.js";
import NearMe from "/containers/home/near-me.js";
import { GeoLocationContext } from "/context/geoLocationContext";
//  import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			// Will be passed to the page component as props
		},
	};
}

const Home = () => {
	const { nation } = useContext(GeoLocationContext);

	return (
		<div>
			<Head>
				<title>{"OZZO | Digital Menu"}</title>
				<meta
					name="description"
					content="OZZO - The future of dining. Explore nearby restaurants and their interactive digital menus with ease with OZZO. Elevate your restaurant experience with our dynamic digital menu platform. Multilingual, allergen-friendly, and data-driven digital menus. OZZO the cutting-edge Digital Menu! "
				/>
			</Head>
			<div
				style={{ fontFamily: "SF-Regular" }}
			>
				<HomeHeader />
				<h1 style={{ display: "none" }}></h1>
				<FilterSlider />
				<OfferSlider nation={nation} />
				<CategorySlider nation={nation} />

				<br />
				<NearMe nation={nation} />

				<Filters />
				<Newest nation={nation} />
				<EatYouWantCardList nation={nation} />
				<RestaurantSlider nation={nation} />
			</div>
			<Footer />
			<ScanMenuButton />
			{/* <CookieConsent	
        location="bottom"	
        buttonText="Accept"	
        cookieName="areCookiesConsented"	
        enableDeclineButton	
        flipButtons	
        declineButtonStyle={{ background: "#E5454C", color: "white" }}	
        buttonStyle={{	
          background: "#FCCE00",	
          color: "white",	
          fontSize: "13px",	
        }}	
        expires={150}	
      >	
        This website uses anonymous cookies to enhance the user experience.{" "}	
      </CookieConsent> */}
		</div>
	);
};

export default Home;
