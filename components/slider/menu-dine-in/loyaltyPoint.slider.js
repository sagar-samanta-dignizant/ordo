import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import LoyaltyPointItem from "./component/loyaltyPoint.item";
//tr
import { useTranslation } from "next-i18next";
// tr
const { t } = useTranslation("common");
const LoyaltyPointSlider = ({ setCoupon }) => {
  return (
    <>
      <OverflowSliderWrapper>
        <Swiper slidesPerView="auto">
          <SwiperSlide>
            <LoyaltyPointItem setCoupon={setCoupon} />
          </SwiperSlide>
          <SwiperSlide>
            <div className="loyalty-point-card">
              <div className="loyalty-progress-bar full-img" style={{}}>
                <img
                  src="/assets/images/loyalty-points/offer-img-5.svg"
                  alt=""
                />
              </div>
              <div className="font-14px-20px-400">
                {t("use")}{" "}
                <strong className="fw-600" style={{ color: "#8E6AF4" }}>
                  CHRISTMAS22s
                </strong>{" "}
                {t("to_get")} 25% {t("discount")}
              </div>
              <a onClick={() => setCoupon(true)} className="stretched-link" />
            </div>
          </SwiperSlide>
        </Swiper>
      </OverflowSliderWrapper>
    </>
  );
};
export default LoyaltyPointSlider;
