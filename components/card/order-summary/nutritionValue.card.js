import { useTranslation } from "next-i18next";
const NutritionValueCard = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <h2 className="mb-12"> {t("nutrion_value")}</h2>
      <div className="card nutrition-card p-16 mb-30">
        <div className="nutrition-card-head">
          <h4 className="mb-12">{t("calories")}</h4>
          <h4 className="text-primary-green mb-12">1200 {t("calories")}</h4>
        </div>
        <div style={{ height: 6 }} className="progress nutrition-progress mb-8">
          <div
            className="progress-bar bg-light-red"
            role="progressbar"
            style={{ width: "30%" }}
            aria-valuenow={30}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div
            className="progress-bar bg-light-yellow"
            role="progressbar"
            style={{ width: "45%" }}
            aria-valuenow={45}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          <div
            className="progress-bar bg-light-blue"
            role="progressbar"
            style={{ width: "25%" }}
            aria-valuenow={23}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="nutrition-progress-bottom">
          <h5>
            {t("carbs")} <span className="text-light-red">(32.2g)</span>
          </h5>
          <h5>
            {t("protein")} <span className="text-light-yellow">(32.2g)</span>
          </h5>
          <h5>
            {t("fat")} <span className="text-light-blue">(32.2g)</span>
          </h5>
        </div>
      </div>
    </>
  );
};
export default NutritionValueCard;
