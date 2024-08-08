import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

const RestaurantProfileHeader = (props) => {
  const { t } = useTranslation("common");
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 100 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);
  const router = useRouter();
  return (
    <>
      <header
        className={`header-fixed-top header-transparent ${
          isScroll ? "header-shadow bg-white" : null
        } `}
      >
        <div className="container">
          <nav className="navbar">
            <div className="nav-action">
              <a onClick={() => router.back()}>
                <img
                  src="/assets/images/icons/icon-header-back.svg"
                  alt=""
                  // onclick="history.back()"
                />
              </a>
            </div>
            <div className="nav-action ms-auto">
              <a href="#">
                <img src="/assets/images/icons/icon-header-share.svg" alt="" />
              </a>
            </div>
            <div className="nav-action">
              <a href="#" className="heart-nav">
                <svg
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M14.3933 3.07338C14.0528 2.73271 13.6485 2.46247 13.2035 2.2781C12.7586 2.09372 12.2816 1.99883 11.8 1.99883C11.3183 1.99883 10.8414 2.09372 10.3964 2.2781C9.95142 2.46247 9.54714 2.73271 9.20663 3.07338L8.49997 3.78004L7.7933 3.07338C7.10551 2.38558 6.17266 1.99918 5.19997 1.99918C4.22728 1.99918 3.29443 2.38558 2.60663 3.07338C1.91884 3.76117 1.53244 4.69402 1.53244 5.66671C1.53244 6.6394 1.91884 7.57225 2.60663 8.26004L8.49997 14.1534L14.3933 8.26004C14.734 7.91954 15.0042 7.51525 15.1886 7.07028C15.373 6.62531 15.4678 6.14837 15.4678 5.66671C15.4678 5.18505 15.373 4.70811 15.1886 4.26314C15.0042 3.81817 14.734 3.41388 14.3933 3.07338Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width={16}
                        height={16}
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </header>
      <div className="restaurant-hero">
        <figure className="restaurant-hero-pic restaurant-hero-pic-height" style={{height:"282px"}}>
          <img src="/assets/images/menu/restaurant-cover.jpg" alt=""  />
        </figure>
        <div className="container position-relative">
          <div className="restaurant-hero-info">
            <div className="restaurant-logo">
              <Image
                src={data.point.icon ? data.point.icon : ""}
                 layout="fill"
                 style={{borderRadius:"100px"}}
              />
              
            </div>
            <div className="restaurant-name-detail">
              <h2>{data.point.name}</h2>
              <div className="available-items available-items-green" >
                <span>€€€</span>
                <ul>
                  <li>{t("thai")}</li>
                  <li>{t("chinese")}</li>
                  <li>{t("tibetian")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RestaurantProfileHeader;
