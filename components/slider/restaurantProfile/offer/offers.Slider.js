import OffersCard from "@/components/card/restaurant-profile-cards/offers/offers.card";
import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { OffersData } from "./data/offer.data";
//tr
import { useTranslation } from "next-i18next";


const OffersSlider = () => {
  // tr
  const { t } = useTranslation("common");
  return (
    <div className="mb-24">
      <h2 className="mb-12">{t("offers")}</h2>
      <OverflowSliderWrapper>
        <Swiper slidesPerView="auto" effect="fade">
          {OffersData.map(({ id, icon, points, description }) => (
            <SwiperSlide key={id}>
              <OffersCard
                icon={icon}
                points={points}
                description={description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};
export default OffersSlider;
