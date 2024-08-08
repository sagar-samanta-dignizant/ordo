import RestaurantCard from "../../card/restaurant/restaurant.card";
import OverflowSliderWrapper from "../../wrapper/overflowSlider/overflowSlider.wrapper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { restaurantData } from "./data/restaurant.data";
import { useEffect, useState, useContext } from "react";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";
import { useRouter } from "next/router";
//tr
import { useTranslation } from "next-i18next";

const RestaurantSlider = ({ isMapView, isMapViewSmall, nation }) => {
  // tr
  const { t } = useTranslation("common");
  const { setActiveFilters } = useContext(UserContext);
  const router = useRouter();
  const [data, setData] = useState({ points: [] });
  const { location } = useContext(GeoLocationContext);

  const getData = () => {
    const params = getLocationParamsFromCurrentLocation();
    var url = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${url}/points`, {
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
        // if (myJson.data && myJson.data.points) {
        //   setData(myJson)
        // }
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, [location]);

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
  var cousineList = [];
  data.points.map((point, key) => {
    for (let index = 0; index < point.cuisine_type_list.length; index++) {
      const element = point.cuisine_type_list[index];
      if (!cousineList.includes(element)) {
        cousineList.push(element);
      }
    }
  });
  var cousineTypes = cousineList.map((cousine, key) => {
    var cousine_type_list = data.points.filter((point) =>
      point.cuisine_type_list.includes(cousine)
    );

    return (
      <div className="resturenSlider">
        {!isMapView && (
          <div
            className="near-me pb-10 px-20"
            style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
          >
            <h2 className=" m-0">{cousine}</h2>
            <div
              className="hammerhead"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setActiveFilters([{ type: "cuisines", value: cousine }]);
                router.push({ pathname: "/search-filters" });
              }}
            >
              {t("see_all")}
            </div>
          </div>
        )}

        <OverflowSliderWrapper
          className={`${isMapView && "pe-auto"} rest-offer-slider`}
        >
          <Swiper
            slidesPerView={1.1}
            spaceBetween={16}
            effect="fade"
            className={`${
              isMapViewSmall && "swiper-sm pb-10"
            } landingPageOfferSwiper`}
          >
            {cousine_type_list.map((item) => (
              <SwiperSlide
                key={item.id}
                className={`${
                  isMapView && "  radius-10 bg-white"
                } scroll-swiper-slide slide-width`}
                spaceBetween={16}
              >
                <RestaurantCard
                  item={item}
                  redirect={`/restaurant-profile/${item.id}`}
                  isMapViewSmall={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </OverflowSliderWrapper>
      </div>
    );
  });

  return (
    <>
      {cousineTypes}
      <div className="resturenSlider ">
        {!isMapView && (
          <div
            className="near-me pb-10  px-20"
            style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
          >
            <h2 className=" m-0">{t("all_venues")}</h2>
          </div>
        )}

          {isMapView && (
            <Link href="/search-map-view">
              <a className="note-link">
                <i>
                  <img
                    src="/assets/images/search-menu/note-book-icon.svg"
                    alt=""
                  />
                </i>
              </a>
            </Link>
          )}
          <div className="allVenueWrapper">
          {data.points.map((item) => (
                <RestaurantCard
                  item={item}
                  redirect={`/restaurant-profile/${item.id}`}
                  isMapViewSmall={false}
                />
            ))}
            </div>
      </div>
    </>
  );
};
export default RestaurantSlider;
