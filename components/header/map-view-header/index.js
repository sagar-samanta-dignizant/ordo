import SearchFilterTag from "/components/tag/searchFilter/searchFilter.tag";
import { UserContext } from "/context/searchListViewContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import EasyButton from "../../button/easyButton";
import { GeoLocationContext } from "/context/geoLocationContext";

import SearchLocationContainer from "/containers/search-select-location/searchLocation.container";

const MapViewHeader = ({ searchListHeader }) => {
  const router = useRouter();
  const { location, getLocationChipsName } = useContext(GeoLocationContext);
  const [isScroll, setIsScroll] = useState(false);
  const { setOpen, searchText } = useContext(UserContext);
  const { openCurrentLocation, setOpenCurrentLocation } =
    useContext(UserContext);
  const { setOpenFilterModal } = useContext(UserContext);
  
  const { searchText1, setSearchText } = useContext(UserContext);
  const { activeFilters, setActiveFilters } = useContext(UserContext);
  const [inputText, setInputText] = useState("");
  const myFunction = () => {
    // your logic here
    setSearchText(inputText);
    router.push({
      pathname: "/search-filters",
    });
  };
  function keyPressed(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      // 👇️ your logic here
      myFunction();
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 100 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);

  var searchFilterTagData = [];

  return (
    <>
      <header
        id="search-map-view"
        className={`header-fixed-top header-transparent ${searchListHeader} ${
          isScroll ? "header-shadow" : ""
        }`}
        // className="header-fixed-top search-menu-map-header"
      >
        <div className="">
          
          <nav className="navbar style_one">
            
            <div
              className="nav-floating-back"
              onClick={() => router.push({ pathname: "/" })}
            >
             <img src="/assets/images/icons/icon-header-back.svg" alt="" />
            </div>
            <div className="nav-logo">
              <Link href="/">
                <img src="/assets/images/ozzo-logo.svg" alt="" />
              </Link>
            </div>
            <div className="nav-search">
              <input
                type="search"
                name=""
                id=""
                prefix={<img src="assets/icons/icon-header-search.svg" style={{height:"16px", width:"16px"}} alt="" />}
                placeholder="Search..."
                defaultValue={searchText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                onKeyDown={(e) => {
                  keyPressed(e);
                  
                }}
                redirect={`/search-filters`}
              />
            </div>
            <div className="nav-button-action" id="merchant-action">
              <EasyButton redirect='https://merchant.ozzo.eu'>
                <b>OZZO</b> Merchant
              </EasyButton>
            </div>
            <div
              className="nav-floating-filter"
              onClick={() => {
                setOpenFilterModal(true);
                router.push({ pathname: "search-filters" });
              }}
            >
              
              <img src="/assets/images/icons/icon-filter.svg" alt="" />
            </div>
          </nav>
        </div>
      </header>
      <div className="recent-search-features">
        <ul>
          <li className="current-location">
            <div
              onClick={() => {
                setOpenCurrentLocation(true);
              }}
            >
              <a className="font-14px-20px-500 shadow-none">
                <i>
                  <img
                    src="/assets/images/location-pin-green.svg"
                    alt=""
                    srcSet=""
                  />
                </i>
                {getLocationChipsName()}
                <i className="cross-hide">
                  <img
                    src="/assets/images/search-menu/cross-icon.svg"
                    alt=""
                    srcSet=""
                  />
                </i>
              </a>
            </div>
          </li>
          {activeFilters.map(({ value, type }) => {
            var isActive = false;
            var image = null;
            var id = `${type}-${value}`;
            if (["cousines", "rating", "sort", "price-range"].includes(type)) {
              isActive = true;
              image = "/assets/images/search-menu/cross-icon.svg";
            }

            return (
              <SearchFilterTag
                key={id}
                name={value}
                image={image ? image : ""}
                isActive={isActive}
                onDelete={() => {
                  var new_list = activeFilters.filter((item) => {
                    if (item.type != type || item.value != value) {
                      return true;
                    } else {
                      return false;
                    }
                  });
                  setActiveFilters(new_list);
                }}
              />
            );
          })}
        </ul>
      </div>
      <SearchLocationContainer
        show={openCurrentLocation}
        closeModal={() => {
          setOpenCurrentLocation(false);
        }}
      />
    </>
  );
};
export default MapViewHeader;
