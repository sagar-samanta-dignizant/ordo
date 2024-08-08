import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useRef } from "react";
import { useEffect, useState } from "react";
export const CategoryTab = ({ list_obj = [], switchCat, selectedItem, setSelectedItem }) => {
  const swiperRef = useRef(null);
  let scrollTimeout = useRef(null);
  useEffect(() => {
    const positions = {};
    list_obj.forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        positions[key] = element.offsetTop;
      }
    });
    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        const scrollPosition = window.scrollY;
        let activeSection = null;
        const activationPoint = window.innerHeight * 0.1;
        for (const key in positions) {
          if (positions[key] - activationPoint <= scrollPosition) {
            activeSection = key;
          }
        }
        if (activeSection && activeSection !== selectedItem) {
          // history.replaceState(null, null, `#${activeSection}`);
          const activeIndex = list_obj.indexOf(activeSection);
          if (swiperRef.current && activeIndex !== -1) {
            swiperRef.current.slideTo(activeIndex);
            setSelectedItem(activeSection);
          }
        }
      }, 100);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      document.removeEventListener("scroll", handleScroll);
    };
  }, [list_obj, selectedItem, setSelectedItem]);
  const handleTabClick = (key) => {
    setSelectedItem(key);
    switchCat(key);
  };
  return (
    <div className="category-tab-swiper">
      <Swiper spaceBetween={25} slidesPerView={"auto"} style={{padding:"0 20px"}} onSwiper={(swiper) => (swiperRef.current = swiper)}>
        {list_obj.map(key => (
          <SwiperSlide key={key} style={{ width: "auto" }}>
            <div
              className={`category-tab-item ${selectedItem === key ? "active" : ""}`}
              onClick={() => handleTabClick(key)}
            >
              <a href={`#${key}`}>{key}</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export const CategoryAccordeon = ({ onClick, title, id, open, slug }) => {
  var openClass;
  if (open) {
    openClass = "open";
  }
  return (
    <>
      <div className="category-accordeons">
        <div
          className="category-accordeons-head"
          onClick={() => {
            onClick(id);
          }}
        // style={{borderBottom:"1px solid #E4E6E8"}}
        >
          <div
            className="title"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            {title}
          </div>
          <img src="/assets/icons/dropDown-dark.svg" className="light-hidden" style={open ? { transform: "rotate(180deg)" } : {}} />
          <img src="/assets/icons/dropDown.svg" className="dark-hidden" style={open ? { transform: "rotate(180deg)" } : {}} />
        </div>
      </div>
    </>
  );
};
export const ProductInfoTab = ({ items, activeKey, setActiveKey }) => {
  var item_list = items.map((index, key) => {
    var keyActive;
    if (activeKey == key) {
      keyActive = "active";
    }
    return (
      <div
        className={["product-information-tab-item", keyActive].join(" ")}
        onClick={() => {
          setActiveKey(key);
        }}
      >
        {index.name}
      </div>
    );
  });
  return (
    <>
      <div className="product-information-tab">{item_list} </div>
    </>
  );
};