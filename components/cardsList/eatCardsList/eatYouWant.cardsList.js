import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import EatYouWantCard from "../../card/eatYouWant/eatYouWant.card";
import { UserContext } from "/context/searchListViewContext";

const EatYouWantCardList = ({ nation }) => {
	const { t } = useTranslation("common");
	const router = useRouter();
	const [data, setData] = useState({ cuisines: [] });
	const { setActiveFilters } = useContext(UserContext);

	const getData = () => {
		const params = getLocationParamsFromCurrentLocation();
		let url = process.env.NEXT_PUBLIC_API_URL;
		let get_url = `?nation=${process.env.NEXT_PUBLIC_NATION}`;
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
					setData(myJson.points.slice(0, 6));
				}
			});
	};

	const getLocationParamsFromCurrentLocation = () => {
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
	};

	useEffect(() => {
		getData();
	}, [nation]);

	if (data.length > 0) {
		return (
			<div
				className="container p-20"
				style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
			>
				<div className="near-me pb-10">
					<h2 className=" m-0">{t("eat_what_you_want")}</h2>
					<div
						onClick={() => {
							var obj = {
								type: "sort",
								value: "Newest",
								key: "creation_date",
							};

							router.push({ pathname: "search-filters" });
						}}
						className="hammerhead"
						style={{ cursor: "pointer" }}
					>
						{t("see_all")}
					</div>
				</div>

				<div className="food-choose-options">
					<ul>
						{data.map(({ _id }) => (
							<EatYouWantCard
								key={_id}
								name={_id}
								image={`/assets/images/search-menu/cuisines/${_id?.replace(/ /g, "")}.png`}
								redirect={`/search-filters`}
								onClick={() => setActiveFilters([{ type: "cousines", value: _id }])}
							/>
						))}
					</ul>
				</div>
			</div>
		);
	} else {
		return null;
	}
};
export default EatYouWantCardList;
