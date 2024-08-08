import { useTranslation } from "next-i18next";
const GrandTotalCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="card p-0">
      <div className="grand-total-top">
        <ul>
          <li>
            <span> {t("item_total")}</span> <span>€282.00</span>
          </li>
          <li className="text-primary-green">
            <span>
              {t("promo")} - ({t("tasty")})
            </span>{" "}
            <span>- €23.00</span>
          </li>
          <li>
            <span>{t("tip_to_waiter")} </span> <span>€20.00</span>
          </li>
          <li>
            <span>{t("tax")}</span> <span>€10.00</span>
          </li>
        </ul>
      </div>
      <div className="grand-total-bottom">
        <h4>{t("grand_total")}</h4>
        <h4>€289</h4>
      </div>
    </div>
  );
};
export default GrandTotalCard;
