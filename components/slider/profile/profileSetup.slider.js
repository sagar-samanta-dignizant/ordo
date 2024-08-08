import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import ProfileSetupItem from "./component/profileSetup.items";
import { ProfileSliderData } from "./data/profileSlider.data";

const ProfileSetupSlider = () => {
  return (
    <OverflowSliderWrapper className="mb-24">
      <Swiper
        slidesPerView="auto"
        effect="fade"
      >
        {ProfileSliderData.map(({ id, image, heading, paragraph }) => (
          <SwiperSlide key={id}>
            <ProfileSetupItem
              image={image}
              heading={heading}
              paragraph={paragraph}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </OverflowSliderWrapper>
  );
};
export default ProfileSetupSlider;
