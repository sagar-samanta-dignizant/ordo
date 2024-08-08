import { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DeliveryCardlist from "../../components/cardsList/restaurantProfile/deliveryPartners/delivery.cardslist";
import QuickFilterCardList from "../../components/cardsList/restaurantProfile/quickFilter/quickFilter.cardList";
import ScanMenuButton from "/components/button/scanmenuButton.js";
import AddressCard from "/components/card/restaurant-profile-cards/address/address.card";
import RestaurantInfoCardList from "/components/cardsList/restaurant-profile-info-cardlist/restaurantInfo.cardlist";
import MenusCardlist from "/components/cardsList/restaurantProfile/menus/menus.cardslist";
import WifiCardList from "/components/cardsList/restaurantProfile/wifi/wifi.cardList";
import ScanMenuHeader from "/components/header/scan-menu-header";
import RestaurantProfileHeader from "/containers/restaurant-profile/restaurant-profile.header";
import ReviewPartnerCard from "../../components/card/restaurant-profile-cards/review-partner-card/review-partner-card";

export default function RestaurantProfileInfo(props) {
	const [data, setData] = useState({ point: {} });

	const getData = () => {
		var api_url = process.env.NEXT_PUBLIC_API_URL;

		fetch(`${api_url}/points/${props.id}`, {
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
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		getData();
	}, [props.id]);

	return (
		<div style={{ height: "100vh" }}>
			<ScanMenuHeader slug="restaurant-profile" />
			<RestaurantProfileHeader data={data.point} />
			<div className="bg-lightgray body-rounded px-0">
				<div className="container">
					<div className="row">
						<div className="col-md-6 px-20 pt-20 w-100">
							<div className="hide-on-desktop">
								<RestaurantInfoCardList data={data.point} />
							</div>
							<AddressCard data={data.point} />
						</div>

						<div className="col-md-6 hide-on-mobile px-0">
							<div className="hide-on-mobile">
								{" "}
								<RestaurantInfoCardList data={data.point} />{" "}
							</div>
							{data.point.wifi_username && data.point.wifi_password && (
								<WifiCardList data={data.point} />
							)}
						</div>
					</div>
					<div className="row">
						<div className="col-md-6 px-0 w-100">
							<MenusCardlist data={data.point} />
						</div>
						<div className="col-md-6 hide-on-mobile px-0">
							<DeliveryCardlist data={data.point} />
						</div>
						<ReviewPartnerCard />
						<QuickFilterCardList data={data} />
						<div className="col-md-6 hide-on-desktop px-0">
							<DeliveryCardlist data={data.point} />
						</div>
						<SocialMediaCards data={data} />
					</div>
					<div className="row">
						<div className="col-md-6  hide-on-desktop px-0">
							{data.point.wifi_username && data.point.wifi_password && (
								<WifiCardList data={data.point} />
							)}
						</div>
					</div>
				</div>
				<ScanMenuButton />
			</div>
		</div>
	);
}

function SocialMediaCards({ data }) {
	// remove duplicates from social media
	// capitalize the first letter of each social media
	if (data.point.social_media_link) {
		for (const [key, value] of Object.entries(data.point.social_media_link)) {
			if (key !== key.capitalize()) {
				data.point.social_media_link[key.capitalize()] = value;
				delete data.point.social_media_link[key];
			}
		}
	}

	return (
		<div className=" mb-24 frequently-used p-0">
			<h2
				className="mb-12 px-20"
				style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
			>
				Social Media
			</h2>
			<div
				className="category-tab-swiper "
				style={{ display: "flex" }}
			>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={16}
					slidesPerView={"auto"}
					className="px-20"
				>
					{Object.entries(data.point.social_media_link || {}).map(([name, link], index) => {
						let instagramBackground = "red";
						let icon = null;
						let backgroundColor = "";
						let containerClass = "";
						name = name.capitalize();
						if (name === "Facebook") {
							icon = (
								<img
									src="/assets/images/footer/facebook-f.svg"
									style={{ width: "100%" }}
								/>
							);
							backgroundColor = "#1877F2";
						} else if (name === "YouTube") {
							icon = <img src="/assets/images/footer/youtube.svg" style={{ width: "100%" }} />;
							backgroundColor = "#FF0000";
						} else if (name === "Instagram") {
							icon = (
								<img
									src="/assets/images/footer/instagram.svg"
									style={{ width: "100%" }}
								/>
							);

							containerClass = "instagram-container";
						} else if (name == "Google") {
							icon = (
								<img
									src="/assets/images/footer/google.svg"
									style={{ width: "100%" }}
								/>
							);
							containerClass = "google-container";
						}

						return (
							<SwiperSlide
								key={index || name}
								className="scroll-swiper-slide frequently-used-all"
								style={{ width: '110px', background: '#FFF' }}
							>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
								>
									<div
										style={{ backgroundColor, width: "52px", height: "52px", padding: '8px', marginBottom: '8px' }}
										className={`rounded-circle d-flex align-items-center justify-content-center mx-auto ${containerClass}`}
									>
										{icon}
									</div>
									<h2
										className="col-gap-14 mb-0"
										style={{ fontFamily: "SF-Regular", fontSize: "16px", fontWeight: '600' }}
									>
										{" "}
										{name}
									</h2>
								</a>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
}

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
