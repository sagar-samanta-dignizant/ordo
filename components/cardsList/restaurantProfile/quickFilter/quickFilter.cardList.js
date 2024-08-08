import { Swiper, SwiperSlide } from "swiper/react";
import OverflowSliderWrapper from "/components/wrapper/overflowSlider/overflowSlider.wrapper.js";
import CategoryItemButton from "../../../../components/button/categoryItem.button";
import { QuickFilterData } from "./data/quickFilter.data";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const QuickFilterCardList = () => {
  return (
    <div className=" mb-24 px-0 frequently-used">
      <h2 className="mb-12 px-20" style={{ fontFamily: "SF-Semi", fontSize: "20px" }}>Frequently Used Allergens</h2>
      <div
        className="category-tab-swiper "
        style={{ display: "flex", justifyContent: "center" }}
      >

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={16}
          slidesPerView={"auto"}
          style={{
            padding: '0 20px',
        }}
        >
          {QuickFilterData.map(({ id, name, image, redirect }) => (
            <SwiperSlide
              key={id || name}
              className="scroll-swiper-slide frequently-used-all "
              style={{
                width: '110px',
                background: '#FFF'
              }}
            >
              <CategoryItemButton
                key={id}
                name={name}
                image={image}
                redirect={redirect}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="used-allergen-slides">
        <OverflowSliderWrapper className="rest-offer-slider mb-28">
          <ul>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              scrollbar={{ draggable: true, el: ".scroll-bar" }}
              pagination={{ clickable: true }}
              // slidesPerView="auto"
              slidesPerView="auto"
              effect="fade"
            >
              {QuickFilterData.map(({ id, name, image, redirect }) => (
                <SwiperSlide key={id || name} className="scroll-swiper-slide">
                  <CategoryItemButton
                    key={id}
                    name={name}
                    image={image}
                    redirect={redirect}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </ul>
        </OverflowSliderWrapper>
      </div> */}
    </div>
  );
};

export default QuickFilterCardList;
