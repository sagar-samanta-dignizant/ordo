import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
//tr
import { useTranslation } from "next-i18next";
// tr
const { t } = useTranslation("common");
const PreviousOrderSlider = ({ setPreviousOrder }) => {
  return (
    <>
      <OverflowSliderWrapper>
        <Swiper>
          <SwiperSlide>
            <div className="previous-orders-card">
              <div className="previous-orders-card-top border-bottom px-20 py-14">
                <p className="font-14px-20px-500 text-black mb-8">
                  2 x {t("french_fries")}
                </p>
                <p className="font-14px-20px-500 text-black mb-0">
                  1 x {t("extravaganza_pizza")}
                </p>
              </div>
              <div className="previous-orders-card-bottom">
                <div className="total-amount">
                  <h5>{t("total")}: €65</h5>
                  <p>{t("aug")} 12, 2020 9:37 AM</p>
                </div>
                <a
                  className="btn btn-add-sm-light"
                  onClick={() => setPreviousOrder(true)}
                >
                  {t("add")}
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="previous-orders-card">
              <div className="previous-orders-card-top border-bottom px-20 py-14">
                <p className="font-14px-20px-500 text-black mb-8">
                  2 x {t("french_fries")}
                </p>
                <p className="font-14px-20px-500 text-black mb-0">
                  1 x {t("extravaganza_pizza")}
                </p>
              </div>
              <div className="previous-orders-card-bottom">
                <div className="total-amount">
                  <h5>{t("total")}: €65</h5>
                  <p>{t("aug")} 12, 2020 9:37 AM</p>
                </div>
                <a
                  className="btn btn-add-sm-light"
                  href="#bottomsheet7"
                  data-bs-toggle="offcanvas"
                  aria-controls="bottomsheet7"
                >
                  {t("add")}
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="previous-orders-card">
              <div className="previous-orders-card-top border-bottom px-20 py-14">
                <p className="font-14px-20px-500 text-black mb-8">
                  2 x {t("french_fries")}
                </p>
                <p className="font-14px-20px-500 text-black mb-0">
                  1 x {t("extravaganza_pizza")}
                </p>
              </div>
              <div className="previous-orders-card-bottom">
                <div className="total-amount">
                  <h5>{t("total")}: €65</h5>
                  <p>{t("aug")} 12, 2020 9:37 AM</p>
                </div>
                <a
                  className="btn btn-add-sm-light"
                  href="#bottomsheet7"
                  data-bs-toggle="offcanvas"
                  aria-controls="bottomsheet7"
                >
                  {t("add")}
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </OverflowSliderWrapper>
    </>
  );
};
export default PreviousOrderSlider;
444;
