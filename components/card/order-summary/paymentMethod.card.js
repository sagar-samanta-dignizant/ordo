import { useTranslation } from "next-i18next";
const PaymentMethodCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="btn-fixed-btm bg-white-40-blur p-0 border-top z-index-3">
      <div className="container p-0">
        <div className="d-flex justify-content-between px-20 py-12">
          <h4 className="mb-0">{t("add_payment_method")}</h4>
          <a
            href="#"
            data-bs-toggle="offcanvas"
            data-bs-target="#bottomsheet3"
            aria-controls="bottomsheet3"
          >
            <img src="/assets/images/existing-card/plus-grey.svg" alt="" />
          </a>
        </div>
        <div className="d-flex justify-content-between align-items-center px-20 py-12 border-top">
          <div className="payment-details">
            <span className="footnote-400 mb-4">{t("total")} (20 Items)</span>
            <h3 className="mb-0">
              €<span id="main-amount">600.00</span>
            </h3>
          </div>
          <a href="#" className="btn right-arrow payment-button">
            {t("pay_now")}
          </a>
        </div>
      </div>
    </div>
  );
};
export default PaymentMethodCard;
