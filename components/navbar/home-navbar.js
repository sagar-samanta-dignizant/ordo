import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import EasyButton from "../button/easyButton";
import { UserContext } from "/context/searchListViewContext";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
function HomeHeader() {
  // const { setActiveFilters } = useContext(UserContext);
  const router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const { t } = useTranslation("common");
  const { setSearchText } = useContext(UserContext);
  const { setOpen, searchText } = useContext(UserContext);

  const [inputText, setInputText] = useState("");
  const myFunction = () => {
    // your logic here
    setSearchText(inputText);
    // console.log(inputText);
    router.push({
      pathname: "/search-filters",
      query: { searchText: inputText },
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

  return (
    <>
      <header
        className={`header-fixed-top home-nav-bar-for-mobile ${
          isScroll ? "" : "hide-border-bottom"
        }`}
      >
        <div className="">
          <nav className="navbar style_one">
            <div className="nav-logo home-nav-bar-logo-for-mobile">
              <Link href="/">
                <img src="/assets/images/ozzo-logo.svg" alt="" />
              </Link>
            </div>
            <div className="nav-search">
              <input
                type="search"
                name=""
                id=""
                placeholder={t("search")}
                defaultValue={searchText}
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
                onKeyDown={(e) => {
                  keyPressed(e);
                }}
              />
            </div>
            <div className="nav-button-action show-pc">
              <EasyButton redirect="https://merchant.ozzo.eu">
                <b>{t("ozzo")}</b>
                {t("merchant")}
              </EasyButton>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
export default HomeHeader;
