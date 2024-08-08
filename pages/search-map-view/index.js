import { useContext, useEffect, useState } from "react";
import MapViewHeader from "/components/header/map-view-header";
import SearchMapViewContainer from "/containers/search-map-view/searchMapView.container";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { useTheme } from "../../context/ThemeProvider";
import { darkMapMode, lightMapMode } from "./../../constants/dark-map"

const SearchMapView = () => {
	const router = useRouter();
	const [libraries] = useState(["places"]);
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
		libraries,
	});
	const [toLoadMap, setToLoadMap] = useState(false);
	const { searchText, activeFilters, setActiveFilters } = useContext(UserContext);
	const { location, getLocationParamsFromCurrentLocation } = useContext(GeoLocationContext);
	const [coordinates, setCoordinates] = useState(null);
	const [data, setData] = useState({ points: [] });
	const [activeRestaurant, setActiveRestaurant] = useState(data?.points[0]?.id);

	const getData = () => {
		let params = getLocationParamsFromCurrentLocation();
		let get_url = getParamsFromActiveFilters();
		let url = process.env.NEXT_PUBLIC_API_URL;
		fetch(`${url}/points/map${get_url}`, {
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
					setData(myJson);
					setToLoadMap(true);
				}
			})
			.catch((error) => {
				setToLoadMap(true);
			});
	};

	const getParamsFromActiveFilters = () => {
		let get_url = `?nation=${process.env.NEXT_PUBLIC_NATION}`;
		// Text
		if (searchText != "" && searchText != null) {
			get_url += `&text=${searchText}`;
		}
		// sort
		var sort_list = activeFilters.filter((x) => x.type == "sort");
		if (sort_list.length > 0) {
			get_url += `&sort=${sort_list.map((u) => u.key).join(",")}`;
		}
		// Cuisines
		var cuisines = activeFilters.filter((x) => x.type == "cousines");
		if (cuisines.length > 0) {
			get_url += `&cuisine=${cuisines.map((u) => u.value).join(",")}`;
		}
		// Rating
		var priceRanges = activeFilters.filter((x) => x.type == "price-range");
		if (priceRanges.length > 0) {
			// get_url += `&cuisine=${cuisines.map(u => u.value).join(',')}`
			var price = priceRanges[0].value;
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
		if (location.value) {
			if (location.value.latitude != undefined) {
				setCoordinates({
					lat: parseFloat(location.value.latitude),
					lng: parseFloat(location.value.longitude),
				});
			}
		}
		setToLoadMap(false);
		getData();
	}, [location]);

	return (
		<>
			{isLoaded && toLoadMap && (
				<Map
					points={data.points}
					coordinates={coordinates}
					setActiveRestaurant={setActiveRestaurant}
				/>
			)}

			<MapViewHeader searchListHeader="search-menu-map-header" />
			{isLoaded && toLoadMap && <SearchMapViewContainer points={data.points} activeRestaurantId={activeRestaurant} setActiveRestaurant={setActiveRestaurant} />}
			{isLoaded && toLoadMap && <div className={`menuBtnWrapper ${data.points.length < 1 ? "menuBtnWrapperBottom" : ""}`} onClick={() => router.push("/search-filters")}>
				<img src="/assets/icons/mapMenuIcon.svg" alt="" />
			</div>}
		</>
	);
};

export default SearchMapView;

function Map({ points, coordinates, setActiveRestaurant }) {
	const { theme } = useTheme()

	if (!coordinates) return;

	return (
		<>
			<GoogleMap
				zoom={10}
				center={{ lat: coordinates.lat, lng: coordinates.lng }}
				mapContainerClassName="map-container"
				options={{
					disableDefaultUI: true,
					styles: theme === 'dark' ? darkMapMode : lightMapMode
				}}
			>
				{points.map((marker, key) => (
					<MarkerF
						key={key}
						position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
						icon={{ url: `/assets/icons/map-icons/food_location.png` }}
						onClick={() => setActiveRestaurant(marker.id)}
					/>
				))}
			</GoogleMap>
		</>
	);
}