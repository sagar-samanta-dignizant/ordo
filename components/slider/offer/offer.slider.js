import { Swiper, SwiperSlide } from "swiper/react";
import OverflowSliderWrapper from "/components/wrapper/overflowSlider/overflowSlider.wrapper.js";
import { offerData } from "/components/slider/offer/data/offer.data";
import OfferCard from "/components/card/offer/offer.card";

import 'swiper/css';
import { useEffect, useState, useContext } from "react";
import { GeoLocationContext } from "/context/geoLocationContext";

const OfferSlider = () => {
  const [sales, setSales] = useState([]);

  const { location } = useContext(GeoLocationContext);
  const [locationName, setLocationName] = useState("");
  useEffect(() => {
    if (location.type == "ipapi") {
      setLocationName(`${location.value.city}, ${location.value.country_name}`);
    } else if (location.type == "user") {
      setLocationName(`${location.value && location.value.description}`);
    } else if (location.type == "coords") {
      setLocationName(`${location.value.city}, ${location.value.country}`);
    } else {
      setLocationName(
        `${process.env.NEXT_PUBLIC_CITY}, ${process.env.NEXT_PUBLIC_COUNTRY}`
      );
    }
    
    if (location.value) {
      var url = process.env.NEXT_PUBLIC_API_URL;
      var loc = location.value.country;
      fetch(`${url}/sales?nation=${loc}&sort=order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .catch((error) => console.log(error))
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          if (myJson.data && myJson.data.sales) {
            const mappedResponse = [];

            const sortedOffers = myJson.data.sales.sort((a, b) => {
              if (a.order > b.order) {
                return 1;
              } else {
                return -1;
              }
            });

            sortedOffers.map((item) => {
              const {
                id,
                name,
                description,
                call_to_action,
                link,
                image,
                color,
              } = item || {};

              mappedResponse.push({
                id,
                image: image ? `${process.env.NEXT_PUBLIC_URL}${image}` : "",
                color: color || "#FABA15",
                heading: name || "",
                paragraph: description || "",
                btnName: call_to_action || "",
                btnRedirect: link || "",
                cardRedirect: link || "",
                btnClassName: "",
              });
            });
            setSales(mappedResponse);
          }
        });
    }
  }, [location]);

  return (
    <div className="container margin-in-desktop" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {/* <div className="row"> */}
        <OverflowSliderWrapper className="rest-offer-slider mb-28">
          <Swiper
            // scrollbar={{ draggable: true, el: ".scroll-bar" }}
            effect="fade"
            className="landingPageOfferSwiper"
            slidesPerView={1.1}
            spaceBetween={28}
          >
            {sales.map((item, index) => (
              <SwiperSlide
                key={item.id || index}
              // className="scroll-swiper-slide"
              >
                <OfferCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </OverflowSliderWrapper>
      {/* </div> */}
    </div>
  );
};

export default OfferSlider;