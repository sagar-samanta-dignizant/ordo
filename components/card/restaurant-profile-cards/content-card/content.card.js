import { useTranslation } from "next-i18next";
const ContentCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="card select-table mb-32 border-0">
      <div className="card-content">
        <figure
          className="card-content-img"
          style={{ backgroundColor: '#07A279' }}
        >
          <img src="/assets/images/booking-table/icon-timer-white.svg" alt="" />
        </figure>
        <div className="card-content-info">
          <h5>{t("leslie_alexander")}</h5>
          <ul className="card-content-lists">
            <li>45 {t("mins")}</li>
            <li>3 {t("people")}</li>
            <li>3 {t("hours")}</li>
          </ul>
        </div>
        <div className="card-content-arrow">
          <img
            src="/assets/images/booking-table/icon-right-arrow-green-shade.svg"
            alt=""
          />
        </div>
        <a href="#" className="stretched-link" />
      </div>
    </div>
  );
};
export default ContentCard;
