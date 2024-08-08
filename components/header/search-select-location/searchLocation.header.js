import { useTranslation } from "next-i18next";
const SearchLocationHeader = () => {
  const { t } = useTranslation("common");
  return (
    <header className="header-fixed-top home-nav-bar-for-mobile">
      <div className="container">
        <nav className="navbar">
          <div className="nav-action">
            <a href="#">
              <img
                src="/assets/images/icons/icon-header-back.svg"
                alt=""
                // onclick="history.back()"
              />
            </a>
          </div>
          <div className="nav-search">
            <input
              type="search"
              name=""
              id=""
              placeholder={t("search_location")}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};
export default SearchLocationHeader;
