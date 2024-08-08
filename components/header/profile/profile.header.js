import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from "next-i18next";
const ProfileHeader = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <header className="header-fixed-top profile-header home-nav-bar-for-mobile">
      <div className="container">
        <nav className="navbar">
          <div className="nav-action">
            <a onClick={onBack}>
              <img
                src="/assets/images/icons/icon-header-back.svg"
                alt=""
                // onclick="history.back()"
              />
            </a>
          </div>
          <div className="nav-action ms-auto">
            <Link href="/notifications">
              <a href="notifications.html">
                <img
                  src="/assets/images/icons/icon-header-notification.svg"
                  alt=""
                />
                <span className="nav-action-badge">9+</span>
              </a>
            </Link>
          </div>
          <div className="nav-action">
            <Link href="/settings">
              <a>
                <img src="/assets/images/icons/icon-settings-grey.svg" alt="" />
              </a>
            </Link>
          </div>
        </nav>
      </div>
      <div className="profile-card">
        <div className="container">
          <figure>
            <img src="/assets/images/profile/profile-pic.png" alt="" />
          </figure>
          <div className="w-100">
            <h2 className="mb-2">{t("john_cooper")}</h2>
            <p className="font-14px-24px-400">{t("john_cooper_email")}</p>
          </div>
          <div className="profile-qr">
            <img src="/assets/images/profile/icon-qr-code-white.svg" alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default ProfileHeader;
