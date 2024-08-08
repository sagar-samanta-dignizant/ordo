import { useTranslation } from "next-i18next";

const NotificationSettingsCard = () => {
  const { t } = useTranslation("common");

  return (
    <div className="container pt-90 pb-100">
      <div className="card pt-20 mb-16">
        <div className="noti-settings-style-1">
          <div>
            <h5> {t("enable_all")}</h5>
            <p> {t("enable_all_desc")} </p>
          </div>
          <div className="switch">
            <label>
              <input type="checkbox" defaultChecked="" />
              <span className="switcher" />
            </label>
          </div>
        </div>
      </div>
      <div className="card pt-20 mb-16">
        <div className="noti-settings-style-2">
          <h5>{t("general_notification")}</h5>
          <p>{t("general_notification_desc")}</p>
          <div className="d-flex justify-content-between">
            <div className="push-notification">{t("push")}</div>
            <div className="switch ">
              <label>
                <input type="checkbox" defaultChecked="" />
                <span className="switcher" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="card pt-20 mb-16">
        <div className="noti-settings-style-2">
          <h5>{t("order_and_purches")}</h5>
          <p>{t("order_and_purches_desc")}</p>
          <div className="d-flex justify-content-between">
            <div className="push-notification">{t("push")}</div>
            <div className="switch ">
              <label>
                <input type="checkbox" defaultChecked="" />
                <span className="switcher" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="card pt-20 mb-16">
        <div className="noti-settings-style-2">
          <h5>
            {t("offer")} &amp; {t("promotional")}{" "}
          </h5>
          <p>{t("offer_and_promotional_desc")}</p>
          <div className="d-flex justify-content-between">
            <div className="push-notification">{t("push")}</div>
            <div className="switch ">
              <label>
                <input type="checkbox" defaultChecked="" />
                <span className="switcher" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-bottom bg-white-40-blur py-20">
        <div className="container">
          <button
            type="button"
            className="btn w-100"
            // onclick="location.href='#'"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default NotificationSettingsCard;
