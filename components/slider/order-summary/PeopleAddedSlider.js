import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import PeopleAddedItem from "./component/peopleAdded.item";
import { PeopleAddedData } from "./data/peopleAdded.data";

const PeopleAddedSlider = () => {
  return (
    <OverflowSliderWrapper className="best-selling-slider pl-20 mb-24">
      <Swiper slidesPerView="auto">
        {PeopleAddedData.map(({ id, name, image, price }) => (
          <SwiperSlide key={id}>
            <PeopleAddedItem
              name={name}
              image={image}
              price={price && price.toFixed(2)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </OverflowSliderWrapper>
  );
};
export default PeopleAddedSlider;
