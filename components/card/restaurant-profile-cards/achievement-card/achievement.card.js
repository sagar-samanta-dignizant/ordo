import { useTranslation } from "next-i18next";
const AchievementCard = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="achievment-card mb-16">
        <i>
          <img src="/assets/images/restaurant-profile/guide-icon.png" alt="" />
        </i>
        <span className="hammerhead">{t("michelin_guide_england")}</span>
      </div>
      <div className="achievment-card mb-16">
        <i>
          <img
            src="/assets/images/restaurant-profile/guide-icon-1.png"
            alt=""
          />
        </i>
        <i>
          <img
            src="/assets/images/restaurant-profile/guide-icon-1.png"
            alt=""
          />
        </i>
        <i>
          <img
            src="/assets/images/restaurant-profile/guide-icon-1.png"
            alt=""
          />
        </i>
        <span className="hammerhead"> {t("michelin_star")}</span>
      </div>
    </>
  );
};
export default AchievementCard;
