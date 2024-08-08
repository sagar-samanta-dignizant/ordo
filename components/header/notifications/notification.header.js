import { NotificationContext } from "@/context/notificationContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useTranslation } from "next-i18next";
const NotificationsHeader = () => {
  const { t } = useTranslation("common");
  const { isActive, setIsActive } = useContext(NotificationContext);
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const closePopup = () => {
    if (isActive) {
      setIsActive(false);
    }
  };
  return (
    <>
      <header className="header-fixed-top header-default" onClick={closePopup}>
        <div className="container">
          <nav className="navbar">
            <div className="nav-action">
              <a onClick={onBack}>
                <img src="/assets/images/icons/icon-header-back.svg" alt="" />
              </a>
            </div>
            <h3 className="nav-center-text"> {t("notifications")}</h3>
            <div
              className={!isActive ? "nav-action" : "nav-action show"}
              data-bs-toggle="dropdown"
              aria-expanded={isActive}
              onClick={handleClick}
            >
              <a href="#">
                <img
                  src="/assets/images/icons/icon-more-horizontal-grey.svg"
                  alt=""
                />
              </a>
            </div>
            <ul
              className={
                !isActive
                  ? "dropdown-menu bg-white-50-blur m-0 py-6"
                  : "dropdown-menu bg-white-50-blur m-0 py-6 show"
              }
              data-bs-popper={!isActive ? "" : "none"}
            >
              <li className="m-0">
                <a
                  className="d-block text-content font-14px-20px-400 px-16 py-6"
                  href="#"
                  id="mark-all"
                >
                  {" "}
                  {t("mark_all_as_read")}
                </a>
              </li>
              <li className="m-0">
                <a
                  className="d-block text-content font-14px-20px-400 px-16 py-6"
                  href="notification-settings.html"
                >
                  {t("notifications_settings")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
export default NotificationsHeader;
