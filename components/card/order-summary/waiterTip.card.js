import { useTranslation } from "next-i18next";
const WaiterTipCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="card p-0 mb-28">
      <div className="waiter-tip-card input-bg">
        <h3>{t("add_tip_for_the_waiter")}</h3>
        <div className="waiter-payment">
          <div className="tips-card-checkbox">
            <input
              className="form-check-input tip-percent-value"
              type="radio"
              name="yes-no"
              id="radio1"
              defaultValue={5}
            />
            <label
              className="form-check-label tip-percent tip1"
              htmlFor="radio1"
            />
            <input
              className="form-check-input tip-percent-value"
              type="radio"
              name="yes-no"
              id="radio2"
              defaultValue={10}
            />
            <label className="form-check-label tip-percent" htmlFor="radio2" />
            <input
              className="form-check-input tip-percent-value"
              type="radio"
              name="yes-no"
              id="radio3"
              defaultValue={20}
            />
            <label className="form-check-label tip-percent" htmlFor="radio3" />
            <input
              className="form-check-input tip-percent-other"
              type="radio"
              name="yes-no"
              id="radio4"
            />
            <label className="form-check-label custom-tip" htmlFor="radio4">
              Other
            </label>
          </div>
          <div className="custom-payment mt-16">
            <div className="input-wrapper input-sm mb-0">
              <div className="input-group">
                <span className="input-group-text me-0">€</span>
                <input
                  type="number"
                  className="form-control input-tip-amount"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="btn btn-sm save-tip">{t("save")}</div>
          </div>
          <div
            style={{ height: 46 }}
            className="total-tip-amount alert alert-success alert-dismissible fade show tip-payment-alert justify-content-between align-items-center mt-16 mb-0"
            role="alert"
          >
            {t("tip_amount")}
            <span className="font-14px-20px-400 mr-14">
              $<span id="show-tip-amount" />
            </span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaiterTipCard;
