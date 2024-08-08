import { useTranslation } from "next-i18next";
const CouponCard = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="apply-promo bg-white text-content with-close mb-20 w-100">
        <span className="text-primary-green fw-600">{t("festive")}</span> 25{" "}
        {t("has_been_applied")}
        <a className="promo-close" href="#">
          <img src="/assets/images/icons/icon-promocode-close.svg" alt="" />
        </a>
      </div>
      <a
        className="apply-promo mb-24 w-100 apply-promo-before d-none"
        href="order-summary-with-data.html"
      >
        {t("apply_promo_code")}
      </a>
    </>
  );
};
export default CouponCard;
