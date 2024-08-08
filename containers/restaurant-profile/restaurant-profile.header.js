import EasyButton from "../../components/button/easyButton";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

export default function RestaurantProfileHeader(props) {
  const router = useRouter()
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 50 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);

  return (
    <div className="restaurant-hero" style={{ height: "300px" }}>
      <figure className="restaurant-hero-pic" style={{ height: "100%" }}>
        {/* <img src="/assets/images/menu/restaurant-cover.jpg" alt="" /> */}
        <img src={props.data.cover} alt="" />
      </figure>
      <div className="container position-relative ">
        <div
          className={
            isScroll && props.slug == "menu"
              ? "logo-fixed-scrolling"
              : "restaurant-hero-info d-flex justify-content-between align-items-center"
          }
        >
          <div className={"d-flex col-gap-12 w-100 align-items-start"}>
            <div className="restaurant-logo">
              {props.data && props.data.icon && (
                <Image
                  src={props.data.icon}
                  className="img"
                  layout="fill"
                  objectFit="contain"
                  onClick={() => router.push(`/restaurant-profile/${props.data.id}`)}
                />
              )}
            </div>

            <div
              className={
                isScroll
                  ? "restaurant-name-detail-scrolling"
                  : "restaurant-name-detail w-100"
              }
            >
              <h2 style={{ fontFamily: "SF-Semi" }}>{props.data.name}</h2>
              <div
                className={
                  isScroll ? "available-items-scrolling" : "available-items"
                }
              >
                <span>€€€</span>
                <ul style={{ whiteSpace: "nowrap", fontFamily: "SF-Regular" }}>
                  {props.data.cuisine_type_list &&
                    props.data.cuisine_type_list.map((cuisine, key) => {
                      return <li key={key}>{cuisine}</li>;
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
