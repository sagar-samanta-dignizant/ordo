import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Button from "../../components/button/Button";
import FindVenues from "../../components/card/findVenues/FindVenues.card";
import RestaurantCard from "../../components/card/restaurant/restaurant.card.js";
import CategoryCardList from "../../components/cardsList/categoryCardList/categoryCardList";
import Checkbox from "../../components/checkbox/checkbox";
import SearchListHeader from "../../components/header/search-list-view/searchList.header.js";
import RadioButton from "../../components/radioButton/radioButton";
import SearchFilterTag from "/components/tag/searchFilter/searchFilter.tag";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";
// tr
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
	if (typeof locale === "undefined") {
		locale = "en";
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])), // Will be passed to the page component as props
		},
	};
}

export default function SearchWithFilters(props) {
	const {
		setOpen,
		openFilterModal,
		setOpenFilterModal,
		searchText,
		setSearchText,
		chips,
		setChips,
		setOpenCurrentLocation,
		activeFilters,
		setActiveFilters,
	} = useContext(UserContext);
	const { location, getLocationChipsName } = useContext(GeoLocationContext);
	const [filter, setFilter] = useState();
	const [cacheFilter, setCacheFilter] = useState([]);
	const router = useRouter();
	const [mobileView, setMobileView] = useState(false);
	const [isActive, setActive] = useState("Sort");
	const [price, setPrice] = useState(null);

	const filtersMenu = ["Sort", "Cuisine", "Rating", "Cost", "Offers", "Other"];

	const priceRanges = ["€", "€€", "€€€", "€€€€"];
	const [nationalities, setNationalities] = useState([]);
	const costs = [
		{ value: "Popular", key: "popularity" },
		{ value: "Cost: Low - High", key: "average_price" },
		{ value: "Cost: High - Low", key: "-average_price" },
		{ value: "Cooking Time", key: "average_cooking_time" },
	];
	const stars = ["4.5 Star +", "4.0 Star +", "3.5 Star +", "3.0 Star +"];

	const [data, setData] = useState({ points: [] });
	const [categoriesData, setCategoriesData] = useState([]);

	const getCategoriesData = () => {
		const params = getLocationParamsFromCurrentLocation();
		let url = process.env.NEXT_PUBLIC_API_URL;
		let get_url = getParamsFromActiveFilters();
		fetch(`${url}/points/browseCategories/${get_url}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(params),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (myJson.points) {
					setCategoriesData(myJson.points);
					let data_list = myJson.points.map((i) => i._id);
					setNationalities([...new Set(data_list)]);
				}
			});
	};

	const getData = () => {
		const params = getLocationParamsFromCurrentLocation();
		let get_url = getParamsFromActiveFilters();
		let url = process.env.NEXT_PUBLIC_API_URL;
		fetch(`${url}/points/${get_url}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(params),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson);
			});
	};
	// tr
	const { t } = useTranslation("common");
	const getParamsFromActiveFilters = () => {
		let get_url = `?nation=${process.env.NEXT_PUBLIC_NATION}`;
		// Text
		if (searchText != "" && searchText != null) {
			get_url += `&text=${searchText}`;
		}
		// sort
		let sort_list = activeFilters.filter((x) => x.type == "sort");
		if (sort_list.length > 0) {
			get_url += `&sort=${sort_list.map((u) => u.key).join(",")}`;
		}
		// Cuisines
		let cuisines = activeFilters.filter((x) => x.type == "cuisine");
		if (cuisines.length > 0) {
			get_url += `&cuisine=${cuisines.map((u) => u.value).join(",")}`;
		}
		// Rating
		let priceRanges = activeFilters.filter((x) => x.type == "cost");
		if (priceRanges.length > 0) {
			// get_url += `&cuisine=${cuisines.map(u => u.value).join(',')}`
			let price = priceRanges[0].value;
			if (price == "€") {
				get_url += `&rprice=20`;
			}
			if (price == "€€") {
				get_url += `&lprice=10&rprice=25`;
			}
			if (price == "€€€") {
				get_url += `&lprice=25&rprice=45`;
			}
			if (price == "€€€€") {
				get_url += `&lprice=45`;
			}
		}

		return get_url;
	};

	useEffect(() => {
		if (searchText != "" && searchText != null) {
			getData();
		}
	}, [searchText]);

	useEffect(() => {
		if (router.query && router.query.searchText) {
			setSearchText(router.query.searchText);
		}
	}, [router.query]);

	useEffect(() => {
		getCategoriesData();
	}, [location]);

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
		setCacheFilter(activeFilters);
		getData();
	}, [activeFilters]);

	function getLocationParamsFromCurrentLocation() {
		if (location.type == "user") {
			return {
				latitude: location.value.latitude,
				longitude: location.value.longitude,
			};
		}
		if (location.type == "coords") {
			return {
				latitude: location.value.latitude,
				longitude: location.value.longitude,
			};
		}
		if (location.type == "ipapi") {
			return {
				latitude: location.value.latitude,
				longitude: location.value.longitude,
			};
		}
		return {
			latitude: process.env.NEXT_PUBLIC_LATITUDE,
			longitude: process.env.NEXT_PUBLIC_LONGITUDE,
		};
	}

	const isFilterAppliedType = cacheFilter.map((item) => {
		return item.type
	})

	const filterContainer = (
		<div className="container h-100 p-0">
			<div className="filter-sorting">
				<div className="filter-sorting-wrapper">
					<ul
						className="nav nav-pills filter-sorting-heading"
						id="filter-tab"
						role="tablist"
						aria-orientation="vertical"
					>
						{filtersMenu.map((filter, key) => (
							<li key={key}>
								<button
									className={`nav-link ${isActive == filter ? `active ${isFilterAppliedType.includes(filter.toLocaleLowerCase()) && "selected-filter"}` : ""} ${isFilterAppliedType.includes(filter.toLocaleLowerCase()) && "filterIndicator"}`}
									id={"filter"}
									data-bs-toggle="pill"
									data-bs-target="#filter-tabcontent-two"
									type="button"
									role="tab"
									aria-controls="filter-tabcontent-two"
									aria-selected="false"
									onClick={() => [setFilter(filter), setActive(filter)]}
								>
									{filter}
								</button>
							</li>
						))}
					</ul>
				</div>
				<div
					className="tab-content filter-tab-content no-scrollbar"
					id="filter-tabcontent"
				>
					{filterList(filter)}
				</div>
			</div>

			<div className="buttons-div">
				<Button
					buttonStyle="btn-gray-bg"
					buttonSize="default"
					onClick={() => {
						setActiveFilters([]);
						setOpenFilterModal(false);
					}}
				>
					{t("clear_filter")}{" "}
				</Button>
				<Button
					buttonStyle="btn-yellow"
					buttonSize="default"
					onClick={() => {
						setActiveFilters(cacheFilter);
						setOpenFilterModal(false);
					}}
				>
					{" "}
					{t("apply")}
				</Button>
			</div>
		</div>
	);
	function filterList(filter) {
		switch (filter) {
			//case "Sort":

			case "Cuisine":
				return (
					<div
						className="tab-pane show active"
						id="filter-tabcontent-two"
						role="tabpanel"
						aria-labelledby="filter-tablink-two"
					>
						<h2 className="mb-16">{t("cuisine")}</h2>
						<div className="filter-sorting-price">
							{nationalities.map((nationality, index) => {
								var obj = { type: "cuisine", value: nationality };
								const isFound = cacheFilter.some((element) => {
									if (element.type == "cuisine" && element.value == nationality) {
										return true;
									}
									return false;
								});
								return (
									<Checkbox
										key={`cuisine${index}`}
										index={`cuisine${index}`}
										value={nationality}
										checked={isFound}
										changeHandler={(item) => {
											if (item.target.checked == true) {
												setCacheFilter([...cacheFilter, obj]);
											} else {
												var new_list = cacheFilter.filter((item) => {
													if (item.type != "cuisine" || item.value != nationality) {
														return true;
													} else {
														return false;
													}
												});
												setCacheFilter(new_list);
											}
										}}
									/>
								);
							})}
						</div>
					</div>
				);
			case "Rating":
				return (
					<div
						className="tab-pane show active "
						id="filter-tabcontent-three"
						role="tabpanel"
						aria-labelledby="filter-tablink-three"
					>
						<h2 className="mb-16">{t("rating")}</h2>
						<div className="filter-sorting-price">
							{stars.map((star, index) => {
								var obj = { type: "rating", value: star };
								const isFound = cacheFilter.some((element) => {
									if (element.type == "rating" && element.value == star) {
										return true;
									}
									return false;
								});
								return (
									<Checkbox
										key={`price${index}`}
										index={`price${index}`}
										value={star}
										checked={isFound}
										changeHandler={(item) => {
											if (item.target.checked == true) {
												setCacheFilter([...cacheFilter, obj]);
											} else {
												var new_list = cacheFilter.filter((item) => {
													if (item.type != "rating" || item.value != star) {
														return true;
													} else {
														return false;
													}
												});
												setCacheFilter(new_list);
											}
										}}
									/>
								);
							})}
						</div>
					</div>
				);

			case "Cost":
				return (
					<div
						className="tab-pane show active"
						id="filter-tabcontent-four"
						role="tabpanel"
						aria-labelledby="filter-tablink-four"
					>
						<div className="filter-price-range">
							<h2 className="mb-16">{t("cost_low_high")}</h2>

							<div
								className={`food-item-ranges`}
								style={{ width: "160px" }}
							>
								{priceRanges.map((item, index) => (
									<button
										key={index}
										className={`food-item-ranges ${price == item ? "selected-button" : ""}`}
										onClick={() => {
											var obj = { type: "cost", value: item };
											var new_list = cacheFilter.filter((item) => {
												if (item.type != "cost") {
													return true;
												} else {
													return false;
												}
											});
											setCacheFilter([...new_list, obj]);
											setPrice(item);
										}}
									>
										{item}
									</button>
								))}
							</div>
						</div>
					</div>
				);
			case "Offers":
				return (
					<div
						className="tab-pane show active"
						id="filter-tabcontent-five"
						role="tabpanel"
						aria-labelledby="filter-tablink-five"
					>
						<h2 className="mb-16">{t("offers")}</h2>
						<div>No offer yet</div>
					</div>
				);

			default:
				return (
					<div
						className="tab-pane show active"
						id="filter-tabcontent-one"
						role="tabpanel"
						aria-labelledby="filter-tablink-one"
					>
						<h2 className="mb-16">{t("sort_by")}</h2>
						<div className="filter-sorting-price">
							{costs.map((cost, index) => {
								var obj = { type: "sort", value: cost.value, key: cost.key };
								const isFound = cacheFilter.some((element) => {
									if (element.type == "sort" && element.value == cost.value) {
										return true;
									}
									return false;
								});
								return (
									<RadioButton
										key={`sort${index}`}
										index={`sort${index}`}
										value={cost.value}
										checked={isFound}
										changeHandler={(item) => {
											if (item.target.checked == true) {
												var new_list = cacheFilter.filter((item) => {
													if (item.type != "sort") {
														return true;
													} else {
														return false;
													}
												});
												setCacheFilter([...new_list, obj]);
											} else {
												var new_list = cacheFilter.filter((item) => {
													if (item.type != "sort" || item.value != cost) {
														return true;
													} else {
														return false;
													}
												});
												setCacheFilter(new_list);
											}
										}}
									/>
								);
							})}
						</div>
					</div>
				);
		}
	}

	var show_data = false;
	if (activeFilters.length > 0 || (searchText != "" && searchText != null)) {
		show_data = true;
	}

	return (
		<div className="search-page-container">
			<SearchListHeader blur={false} />

			<div className="search-fitlers-layout">
			<div className="locationBtnWrapper" onClick={() => router.push("/search-map-view")}>
						<img src="/assets/images/menu/icon-location-white.svg" alt="location" />
					</div>
				<div className="filters-column-container hide-on-mobile">
					<FindVenues />

					{mobileView ? (
						<BottomSheet open={openFilterModal && mobileView} className="filter-bottom-sheet">
							<div
								className="offcanvus-close"
								onClick={() => setOpenFilterModal(false)}
							>
								<img
									src="/assets/images/menu/icon-close-grey.svg"
									alt=""
								/>
							</div>
							<h1 className="filterTitle">offcanvus-close</h1>
							<div className="filter-container" style={{ padding: "20px", paddingBottom: 0 }}>{filterContainer}</div>
						</BottomSheet>
					) : (
						<> {filterContainer}</>
					)}
				</div>

				<div
					className="browse-categories"
					style={{ flex: "1" }}
				>
					<div
						className="recent-search-features"
						style={{
							position: "relative",
							top: "0",
							margin: "0",
							left: "0",
							width: "100%",
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<ul>
							<li className="current-location">
								<div
									onClick={() => {
										setOpenCurrentLocation(true);
										// router.push({ pathname: "/search-map-view" });
									}}
								>
									<a className="font-14px-20px-500 shadow-none">
										<i>
											<img
												src="/assets/images/location-pin-green.svg"
												alt=""
												srcSet=""
											/>
										</i>
										{getLocationChipsName()}
										<i className="cross-hide">
											<img
												src="/assets/images/search-menu/cross-icon.svg"
												alt=""
												srcSet=""
											/>
										</i>
									</a>
								</div>
							</li>
							{activeFilters.map(({ value, type }) => {
								var isActive = false;
								var image = null;
								var id = `${type}-${value}`;
								if (["cuisine", "rating", "sort", "cost"].includes(type)) {
									isActive = true;
									image = "/assets/images/search-menu/cross-icon.svg";
								}

								return (
									<SearchFilterTag
										key={id}
										name={value}
										image={image}
										isActive={isActive}
										onDelete={() => {
											var new_list = activeFilters.filter((item) => {
												if (item.type != type || item.value != value) {
													return true;
												} else {
													return false;
												}
											});
											setActiveFilters(new_list);
										}}
									/>
								);
							})}
						</ul>
					</div>

					{show_data == false ? (
						<>
							<p className="title-style">{t("browse_categories")}</p>
							<CategoryCardList
								data={categoriesData}
								onClick={(item) => {
									var obj = { type: "cuisine", value: item };
									setActiveFilters([obj]);
								}}
							/>
						</>
					) : (
						<div className="row searchResturentList">
							{data.points &&
								data.points.map((item, index) => (
									<div
										key={index}
										className="col-lg-4 pb-16"
									>
										<RestaurantCard
											item={item}
											key={item.id}
											redirect={`/restaurant-profile/${item.id}`}
											isMapViewSmall={false}
										/>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
