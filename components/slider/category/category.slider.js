import { useContext, useEffect, useState } from "react";
import CategoryItemButton from "../../button/categoryItem.button";
import { UserContext } from "/context/searchListViewContext";
import { Swiper, SwiperSlide } from "swiper/react";
import OverflowSliderWrapper from "../../wrapper/overflowSlider/overflowSlider.wrapper";

const CategorySlider = () => {
  const [data, setData] = useState({ categories: [] });
  const { searchText, setSearchText } = useContext(UserContext);

  const getData = () => {
    var api_url = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${api_url}/categories`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="container px-0"
     
    >
      <OverflowSliderWrapper className="rest-offer-slider">

        <Swiper
          slidesPerView={4.6}
          // freeMode={true}
          effect="fade"
          className={`landingPageOfferSwiper`}
          spaceBetween={20}
        >
          <ul>
            {data.categories.map(({ id, name, image }) => (
              <SwiperSlide
                key={name}
                className={`scroll-swiper-slide slide-width`}
              >
                <CategoryItemButton
                  key={name}
                  name={name}
                  image={`${image ? image : ""}`}
                  redirect={`/search-filters`}
                  onClick={() => {
                    setSearchText(name);
                  }}
                />
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </OverflowSliderWrapper>
    </div>
  );
};

export default CategorySlider;
