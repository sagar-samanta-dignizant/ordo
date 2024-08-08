const RestaurantInfoCard = ({ data, image, heading, paragraph }) => {
	var currency_text = "";
	if (data.currency == "Euro" || data.currency == "EUR" || data.currency == "€") {
		var currency_text = "€";
	}
	if (data.currency == "Lek") {
		var currency_text = "Lek";
	}
	if (data.currency == "Dollar") {
		var currency_text = "$";
	}
	return (
		<li>
			<div className="more-info-card">
				<figure>
					<img
						src={image ? image : ""}
						alt=""
					/>
				</figure>
				<div className="more-info-list-detail">
					{paragraph == "Cooking time" && (
						<h3 style={{ fontFamily: "SF-Semi" }}>
							{(data.average_cooking_time * 0.8).toFixed(0)} -{" "}
							{(data.average_cooking_time * 1.2).toFixed(0)} min{" "}
						</h3>
					)}
					{paragraph == "Per Person" && (
						<h3 style={{ fontFamily: "SF-Semi" }}>
							{data.average_price?.toLocaleString('en-US')} {currency_text}{" "}
						</h3>
					)}
					<p style={{ fontFamily: "SF-Regular" }}>{paragraph}</p>
				</div>
			</div>
		</li>
	);
};
export default RestaurantInfoCard;
