import { useState, useEffect, useContext } from "react";

export default function Home(props) {
  const [mobileView, setMobileView] = useState(false);

  //const [image, setImage] = useState("");
  useEffect(() => {
    if (window.innerWidth > 991) {
      setMobileView(false);
    } else if (window.innerWidth < 991) {
      setMobileView(true);
    }
    const handleResize = () => {
      if (window.innerWidth > 991) {
        setMobileView(false);
      } else if (window.innerWidth < 991) {
        setMobileView(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!mobileView ? (
        <>
          <div className="restaurant-hero">
            <figure className="restaurant-hero-pic">
              <img src="/assets/images/menu/restaurant-cover.jpg" alt="" />
            </figure>
          </div>
        </>
      ) : (
        <div className="restaurant-hero">
          <figure className="item-hero-pic" style={{ height: "360px" }}>
            <img src={props.headerImageMobile} alt="" />
          </figure>
        </div>
      )}
    </>
  );
}
