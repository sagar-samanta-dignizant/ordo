import { useTranslation } from "next-i18next";
function TrackDineOrderActiveHeader() {
  const { t } = useTranslation("common");
  return (
    <header className="header-fixed-top header-default">
      <div className="container">
        <nav className="navbar">
          <div className="nav-action">
            <a href="javascript:void(0)">
              <img
                src="/assets/images/icons/icon-header-back.svg"
                alt=""
                // onclick="history.back()"
              />
            </a>
          </div>
          <h3 className="nav-center-text">{t("order_details")}</h3>
          <div
            className="nav-action"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <a href="javascript:void(0)">
              <img
                src="/assets/images/icons/icon-more-horizontal-grey.svg"
                alt=""
              />
            </a>
          </div>
          <ul className="dropdown-menu bg-white-50-blur m-0 py-6">
            <li className="m-0">
              <a
                className="d-block text-content font-14px-20px-400 px-16 py-6"
                href="#"
              >
                {" "}
                {t("mark_as_favourite")}
              </a>
            </li>
            <li className="m-0">
              <a
                className="d-block text-content font-14px-20px-400 px-16 py-6"
                href="#"
              >
                {t("share")}
              </a>
            </li>
            <li className="m-0">
              <a
                className="d-block text-content font-14px-20px-400 px-16 py-6"
                href="#"
              >
                {t("cancel_order")}
              </a>
            </li>
            <li className="m-0">
              <a
                className="d-block text-content font-14px-20px-400 px-16 py-6"
                href="#"
              >
                {t("view_invoice")}/{t("pay_now")}
              </a>
            </li>
            <li className="m-0">
              <a
                className="d-block text-content font-14px-20px-400 px-16 py-6"
                href="#"
              >
                {t("contact_support")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default TrackDineOrderActiveHeader;
