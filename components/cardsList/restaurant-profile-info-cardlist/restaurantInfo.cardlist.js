import { RestaurantInfoData } from "./data/restaurantInfo.data";
import RestaurantInfoCard from "/components/card/restaurant-profile-cards/restaurant-info-card/restaurantInfo.Card";

const RestaurantInfoCardList = (props) => {
	return (
		<div className="mb-32">
			<ul className="restaurant-moreinfo">
				{RestaurantInfoData.map(({ id, image, heading, paragraph }) => (
					<RestaurantInfoCard
						key={id}
						image={image}
						heading={heading}
						paragraph={paragraph}
						data={props.data}
					/>
				))}
			</ul>
		</div>
	);
};
export default RestaurantInfoCardList;
