import TeamCard from "@/components/card/restaurant-profile-cards/team.card/team.card";
import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { TeamData } from "./data/team.data";
//tr
import { useTranslation } from "next-i18next";

const TeamSlider = () => {
  // tr
  const { t } = useTranslation("common");
  return (
    <div className="mb-24">
      <h2 className="mb-12">{t("team")}</h2>
      <OverflowSliderWrapper>
        <Swiper slidesPerView="auto">
          {TeamData.map(({ id, name, designation, experience, image }) => (
            <SwiperSlide key={id}>
              <TeamCard
                name={name}
                designation={designation}
                experience={experience}
                image={image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};
export default TeamSlider;
