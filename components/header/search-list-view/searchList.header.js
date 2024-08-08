import SearchFilterTag from "/components/tag/searchFilter/searchFilter.tag";
import { UserContext } from "/context/searchListViewContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import EasyButton from "../../button/easyButton";
import { useTranslation } from "next-i18next";
import { searchFilterTagData } from "./data/searchFilterTag.data";
import SearchLocationContainer from "/containers/search-select-location/searchLocation.container";

const SearchListHeader = ({ searchListHeader }) => {
  const router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const [inputText, setInputText] = useState("");
  const { setOpen, searchText, setSearchText, chips, setChips } =
    useContext(UserContext);
  const { openCurrentLocation, setOpenCurrentLocation } =
    useContext(UserContext);
  const { setOpenFilterModal } = useContext(UserContext);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 100 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);
  const { t } = useTranslation("common");
  const myFunction = () => {
    // your logic here
    setSearchText(inputText);
  };

  function keyPressed(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      // 👇️ your logic here
      myFunction();
    }
  }

  return (
    <>
      <header
        id="search-list-view"
        className={`header-fixed-top ${isScroll ? "scrolled" : ""} home-nav-bar-for-mobile`}
        // className="header-fixed-top search-menu-map-header"
      >
        <div className="">
          <nav className="navbar style_one">
            <div className="nav-logo show-pc">
              <Link href="/">
                <img src="/assets/images/ozzo-logo.svg" alt="" />
              </Link>
            </div>
            <div className="mobile-nav-action mobile-menu" onClick={() => router.push({ pathname: "/" })}>
              
              <img src="/assets/images/icons/icon-header-back.svg" alt="" />
            </div>
            <div className="nav-search">
              <input
                type="search"
                name=""
                id=""
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                onKeyDown={(e) => {
                  keyPressed(e);
                }}
              />
            </div>
            <div className="nav-button-action" id="merchant-action">
              <EasyButton redirect='https://merchant.ozzo.eu'>
                <b>{t("ozzo")}</b> {t("merchant")}
              </EasyButton>
            </div>
            <div
              className="mobile-nav-action mobile-nav-filter"
              onClick={() => {
                setOpenFilterModal(true);
              }}
            >
              <img src="/assets/images/icons/icon-filter.svg" alt="" />
            </div>
          </nav>
        </div>
      </header>
      <SearchLocationContainer
        show={openCurrentLocation}
        closeModal={() => {
          setOpenCurrentLocation(false);
        }}
      />
    </>
  );
};
export default SearchListHeader;
