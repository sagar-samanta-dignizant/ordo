import RestaurantCard from "/components/card/restaurant/restaurant.card";
import OverflowSliderWrapper from "../../components/wrapper/overflowSlider/overflowSlider.wrapper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";
//tr
import { useTranslation } from "next-i18next";

const NearMe = ({ isMapView, isMapViewSmall }) => {
  // tr
  const { t } = useTranslation("common");
  const [data, setData] = useState({ points: [] });
  const { location, nation } = useContext(GeoLocationContext);
  const { activeFilters, setActiveFilters } = useContext(UserContext);
  const router = useRouter();

  const getData = () => {
    const params = getLocationParamsFromCurrentLocation();
    var url = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${url}/points?nation=${nation}&distance=10`, {
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

  useEffect(() => {
    if (!location.value) return;

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

  if (data.points.length == 0) {
    return null;
  }

  return (
    <div className="resturenSlider">
      {!isMapView && (
        <div className="near-me pb-10 px-20" style={{fontFamily:"SF-Semi" , fontSize:"20px"}}>
          <h2 className=" m-0">{t("near_me")}</h2>
          <div
            onClick={() => {
              router.push({ pathname: "search-filters" });
            }}
            className="hammerhead"
            style={{ cursor: "pointer" }}
          >
            {t("see_all")}
          </div>
        </div>
      )}
      <OverflowSliderWrapper className={`${isMapView ? "pe-auto" : ""} rest-offer-slider`}>
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
        <Swiper
          slidesPerView={1.1}
          effect="fade"
          className={`${isMapViewSmall ? "swiper-sm pb-10" : ""} landingPageOfferSwiper`}
          spaceBetween={16}
        >
          {data.points.map((item) => (
            <SwiperSlide
              key={item.id}
              className={`${isMapView ? "p-16 radius-10 bg-white" : ""} scroll-swiper-slide slide-width`}
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
};
export default NearMe;
