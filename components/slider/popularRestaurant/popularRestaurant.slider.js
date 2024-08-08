import RestaurantCard from "@/components/card/restaurant/restaurant.card";
import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { restaurantData } from "../restaurant/data/restaurant.data";
//tr
import { useTranslation } from "next-i18next";

// tr
const { t } = useTranslation("common");
const PopularRestaurantSlider = () => {
  return (
    <div className="resturenSlider">
      <div className="d-flex justify-content-between align-items-center mb-12">
        <h2 className="m-0">{t("popular_restaurants")}</h2>
        <Link href="/search-list-view">
          <a className="hammerhead">{t("see_all")}</a>
        </Link>
      </div>
      <OverflowSliderWrapper>
        <Swiper slidesPerView="auto" effect="fade">
          {restaurantData.map(
            ({
              id,
              offers,
              restaurantName,
              price,
              rating,
              image,
              redirect,
            }) => (
              <SwiperSlide key={id}>
                <RestaurantCard
                  offers={offers}
                  restaurantName={restaurantName}
                  price={price && price.toFixed(2)}
                  rating={rating}
                  image={image}
                  redirect={redirect}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};
export default PopularRestaurantSlider;
