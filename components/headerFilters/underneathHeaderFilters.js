import { Swiper, SwiperSlide } from "swiper/react";
import OverflowSliderWrapper from "/components/wrapper/overflowSlider/overflowSlider.wrapper.js";
import { offerData } from "/components/slider/offer/data/offer.data";
import OfferCard from "/components/card/offer/offer.card";
import { UserContext } from "/context/searchListViewContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { GeoLocationContext } from "/context/geoLocationContext";

const FilterSlider = () => {
  const { t } = useTranslation("common");
  const [sales, setSales] = useState([]);
  const router = useRouter();
  const { setActiveFilters } = useContext(UserContext);
  const [locationName, setLocationName] = useState("");
  const { location } = useContext(GeoLocationContext);

  useEffect(() => {
    if (location.type == "ipapi") {
      setLocationName(
        `${location.value.city}, ${location.value.country_name}`
      );
      return;
    }
    if (location.type == "user") {
      setLocationName(
        `${location.value && location.value.description}`
      );
      return;
    }
    if (location.type == "coords") {
      setLocationName(
        `${location.value.city}, ${location.value.country}`
      );
      return;
    }
    setLocationName(
      `${process.env.NEXT_PUBLIC_CITY}, ${process.env.NEXT_PUBLIC_COUNTRY}`
    );
  }, [location]);
  
  const getData = () => {
    setSales([
      { id: "near-me", name: `Near ${locationName ? locationName : "me"}` },
      { id: "30min-cooking", name: `${t("30min_cooking")}` },
      { id: "great-offers", name: `${t("great_offers")}` },
      // {id:'pure-vegan', name:'Pure Vegan'},
    ]);
  };

  useEffect(() => {
    getData();
  }, [locationName]);

  return (
    <div className="container hide-on-desktop">
      <div className="row" style={{ marginTop: "80px" }}>
        <OverflowSliderWrapper className="rest-offer-slider mb-28">
          <Swiper
            effect="fade"
            className="landingPageOfferSwiper"
            slidesPerView={2.22}
            spaceBetween={8}
          >
            {sales.map((item, index) => (
              <SwiperSlide
                key={item.id || index}
                className="scroll-swiper-slide slide-width"
              >
                <button
                  onClick={() => filterClicked(item)}
                  className="filterButtons"
                >
                  {item.id === "near-me" && 
                      <>
                        <img className="filterButtonsLocationIcon light-hidden" src="/assets/images/home/icon-location-grey-dark.svg" alt="location"/>
                        <img className="filterButtonsLocationIcon dark-hidden" src="/assets/images/home/icon-location-grey.svg" alt="location"/>
                      </>
                    }
                  {item.name}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </OverflowSliderWrapper>
      </div>
    </div>
  );

  function filterClicked(item) {
    switch (item.name) {
      case "Near Me":
        // setActiveFilters([ { type: "location", value: "Near Me", key:"near-me" }]);
        break;
      case "30min Cooking":
        setActiveFilters([
          {
            type: "sort",
            value: "Cooking Time",
            key: "average_cooking_time",
          },
        ]);
        break;
      case "Great Offers":
        setActiveFilters([{ type: "price-range", value: "€" }]);
        break;
      case "Pure Vegan":
        // setActiveFilters([ { type: "price-range", value: "€" }]);
        break;
      default:
        break;
    }
    router.push({ pathname: "/search-map-view" });
  }
};

export default FilterSlider;
