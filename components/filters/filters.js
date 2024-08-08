import FindVenues from "../card/findVenues/FindVenues.card";
import Checkbox from "../checkbox/checkbox";
import RadioButton from "../radioButton/radioButton";
import Button from "/components/button/Button";
// import FoodTags from "../tag/foodTags/foodTags.Tag";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";

function Filters() {
	const [cacheFilter, setCacheFilter] = useState([]);
	const { setActiveFilters } = useContext(UserContext);
	const { location } = useContext(GeoLocationContext);
	const [price, setPrice] = useState(null);
	const [nationalities, setNationalities] = useState([]);
	const router = useRouter();
	const { t } = useTranslation("common");

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

	function getCuisineData() {
		const params = getLocationParamsFromCurrentLocation();
		var url = process.env.NEXT_PUBLIC_API_URL;
		fetch(`${url}/points/browseCategories`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.points) {
					var data_list = data.points.map((i) => i._id);
					// remove duplicates from
					data_list = [...new Set(data_list)];
					setNationalities(data_list);
				}
			});
	}

	useEffect(() => {
		getCuisineData();
	}, [location]);

	const costs = [
		{ value: `${t("popular")}`, key: "popularity" },
		{ value: `${t("cost_low_high")}`, key: "average_price" },
		{ value: `${t("cost_high_low")}`, key: "-average_price" },
		{ value: `${t("cooking_time")}`, key: "average_cooking_time" },
	];
	const priceRanges = ["€", "€€", "€€€", "€€€€"];
	return (
		<div className="container px-20">
			<div className="row">
				<div className="col-lg-4">
					<div
						className="filters-map-container"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<FindVenues />
					</div>
				</div>
				<div className="col-lg-8">
					<div className="filters-item-container">
						<div className="filters-right-top">
							<div
								className="tab-pane show active "
								id="filter-tabcontent-one"
								role="tabpanel"
								aria-labelledby="filter-tablink-one"
							>
								<h2 className="mb-16">{t("sort_by")}</h2>
								<div className="filter-sorting-price">
									{costs.map((cost, index) => {
										var obj = {
											type: "sort",
											value: cost.value,
											key: cost.key,
										};
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

							<div
								className="tab-pane show active"
								id="filter-tabcontent-two"
								role="tabpanel"
								aria-labelledby="filter-tablink-two"
							>
								<h2 className="mb-16"> {t("cuisine")}</h2>
								<div
									className="tab-pane cuisine-columns"
									id="filter-tabcontent-two"
									role="tabpanel"
									aria-labelledby="filter-tablink-two"
								>
									{" "}
									<div className="filter-sorting-price col-lg-6 col-md-6 col-sm-6 col-xs-12">
										<div className="form-check filter-sorting-button">
											{nationalities.map((nationality, index) => {
												var obj = { type: "cousines", value: nationality };
												const isFound = cacheFilter.some((element) => {
													if (element.type == "cousines" && element.value == nationality) {
														return true;
													}
													return false;
												});
												return (
													<Checkbox
														key={`cousine${index}`}
														index={`cousine${index}`}
														value={nationality}
														checked={isFound}
														changeHandler={(item) => {
															if (item.target.checked == true) {
																setCacheFilter([...cacheFilter, obj]);
															} else {
																var new_list = cacheFilter.filter((item) => {
																	if (item.type != "cousines" || item.value != nationality) {
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
								</div>
							</div>
						</div>

						<div className="filter-right-bottom">
							<div className="filter-price-range">
								<h2 className="mb-16">{t("price_range")}</h2>

								<div
									className={`food-item-ranges`}
									style={{ width: "160px" }}
								>
									{priceRanges.map((item) => (
										<button
											key={item}
											className={`food-item-ranges ${price == item ? "selected-button" : ""}`}
											onClick={() => {
												var obj = { type: "price-range", value: item };
												var new_list = cacheFilter.filter((item) => {
													if (item.type != "price-range") {
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
							<Button
								buttonStyle="btn-yellow"
								buttonSize="default"
								onClick={() => {
									setActiveFilters(cacheFilter);
									router.push({ pathname: "/search-filters" });
								}}
							>
								{" "}
								{t("apply")}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Filters;
