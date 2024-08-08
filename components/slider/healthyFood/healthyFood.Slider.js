import RestaurantCard from "@/components/card/restaurant/restaurant.card";
import OverflowSliderWrapper from "@/components/wrapper/overflowSlider/overflowSlider.wrapper";
import SectionNameWrapper from "@/components/wrapper/secetionName/sectionName.wrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import { restaurantData } from "../restaurant/data/restaurant.data";

const HealthyFoodSlider = () => {
	return (
		<SectionNameWrapper
			name="Delicious Healthy Food"
			redirect="search-list-view"
		>
			<OverflowSliderWrapper>
				<Swiper
					slidesPerView="auto"
					effect="fade"
					className="swiper-sm"
				>
					{restaurantData.map(({ id, offers, restaurantName, price, rating, image, redirect }) => (
						<SwiperSlide key={id}>
							<RestaurantCard
								offers={offers}
								restaurantName={restaurantName}
								price={price?.toFixed(2) || 0}
								rating={rating}
								image={image}
								redirect={redirect}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</OverflowSliderWrapper>
		</SectionNameWrapper>
	);
};
export default HealthyFoodSlider;
