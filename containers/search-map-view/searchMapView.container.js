// import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import RestaurantCard from "/components/card/restaurant/restaurant.card";
import OverflowSliderWrapper from "/components/wrapper/overflowSlider/overflowSlider.wrapper";
import { useEffect, useRef } from "react";
// SwiperCore.use([Navigation]);
const SearchMapViewContainer = ({ isMapView, isMapViewSmall, points, activeRestaurantId, setActiveRestaurant}) => {

	const swiperRef = useRef(null);

    const getSlideIndexById = (id) => {
        return points.findIndex((item) => item.id === id);
      };

    useEffect(() => {
        if (activeRestaurantId && swiperRef.current) {
          const swiperInstance = swiperRef.current.swiper;
          const slideIndex = getSlideIndexById(activeRestaurantId);
          if (slideIndex !== -1) {
            swiperInstance.slideTo(slideIndex, 500);
          }
        }
      }, [activeRestaurantId, points]);

	  const handleSlideChange = () => {
        if (swiperRef.current) {
          const swiperInstance = swiperRef.current.swiper;
          setActiveRestaurant(swiperInstance.activeIndex);
        }
      };

	return (
		<>
			<div className="recent-search-container bottom_fixed_map_slided">
				<div className="container p-0">
					<div>
						<OverflowSliderWrapper className={`${isMapView && "pe-auto"}`}>
							<Swiper
								// modules={[Navigation, Pagination, Scrollbar, A11y]}
								scrollbar={{ draggable: true, el: ".scroll-bar" }}
								// pagination={{ clickable: true }}
								slidesPerView={1.1}
								className={`${isMapViewSmall && "swiper-sm pb-10"} landingPageOfferSwiper`}
								spaceBetween={16}
								ref={swiperRef}
								onSlideChange={handleSlideChange}
							>
								{points.map((item) => (
									<SwiperSlide
										key={item.id}
										// style={{ marginRight: "30px" }}
										className={`${isMapView && "radius-10 bg-white"}`}
									>
										<RestaurantCard
											item={item}
											redirect={`/restaurant-profile/${item.id}`}
											isMapViewSmall={false}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						</OverflowSliderWrapper>
					</div>
				</div>
			</div>
		</>
	);
};
export default SearchMapViewContainer;
