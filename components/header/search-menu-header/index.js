import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "/context/searchListViewContext";
import { useTranslation } from "next-i18next";

const SearchMenuHeader = ({ searchText, setSearchText, setOpenSearch, setOpen, mobileView }) => {
  const router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const [inputText, setInputText] = useState("");
  const { setOpenInfo } = useContext(UserContext);
  const { t } = useTranslation("common");

  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 100 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);

  const myFunction = () => {
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
        className={`header-fixed-top header-transparent search-menu-header ${isScroll ? "bg-white header-shadow" : ""
          }`}
        style={{ border: "0" }}
      >
        <div className="container-fluid">
          <nav className="navbar style_one">
            <div className="nav-logo show-pc">
              <Link href="/">
                <img
                  src="/assets/images/ozzo-logo.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="nav-search show-pc">
              <input
                type="search"
                name=""
                id="home-search-bar"
                placeholder="Search..."
                defaultValue={searchText}
                value={searchText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  keyPressed(e);
                }}
              />
            </div>

            <div
              className="mobile-nav-action gray mobile-menu"
              onClick={() => { }}
            >
              <img
                src="/assets/images/icons/icon-header-back.svg"
                alt=""
              />
            </div>

            <div className="mobile-group-actions">
              <div
                className="mobile-nav-action gray"
                onClick={() => {
                  setOpenInfo(true);
                }}
              >
                <img
                  src="/assets/images/icons/icon-about.svg"
                  alt=""
                />
              </div>

              <div
                className="mobile-nav-action gray mobile-menu"
                onClick={() => { }}
              >
                <img
                  src="/assets/images/icons/icon-search.svg"
                  alt=""
                />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default SearchMenuHeader;
