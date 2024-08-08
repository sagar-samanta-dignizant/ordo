import Image from "next/image";
import Link from "next/link";
import FoodTags from "../../tag/foodTags/foodTags.Tag";

const RestaurantCard = ({ item, redirect, isMapViewSmall }) => {
  var price = item.average_price;
  return (
    <div className="food-item-card">
      <div className="food-item-card-body">
        <figure className="food-item-card-img">
          <Image
            src={item.cover ? item.cover : ""}
            alt={item.cover ? item.cover : ""}
            layout="fill"
          />
        </figure>
        {item.offers && (
          <Link href="venue-offers.html">
            <a className="food-discount">{item.offers}%</a>
          </Link>
        )}

        <div className="food-item-tags">
          <FoodTags
            time={item.cooking_time}
            servingFood={true}
            bar={true}
            union={item.takeaway}
          />
        </div>
      </div>
      <div className="food-item-card-footer">
        <h2>{item.name}</h2>
        <h2>{item.restaurantName}</h2>
        <div className="type">
          <span>
            {price < 10 && "€"}
            {price >= 10 && price < 25 && "€€"}
            {price >= 25 && price < 45 && "€€€"}
            {price >= 45 && "€€€€"}
          </span>

          <ul>
            {item.cuisine_type_list &&
              item.cuisine_type_list.map((index, key) => {
                return <li key={key}>{index}</li>;
              })}
          </ul>
        </div>

        <div className="food-item-card-info">
          <ul>
            <li>
              <i>
                <img
                  src="/assets/images/search-menu/cooking-time-icon-yellow.svg"
                  alt=""
                />
              </i>
              {!isMapViewSmall && (
                <>
                  <span>{(item.average_cooking_time * 0.8).toFixed(0)}</span>
                  <span>
                    {"- "}
                    {(item.average_cooking_time * 1.2).toFixed(0)}
                  </span>{" "}
                  mins
                </>
              )}
            </li>
            {item.ratingCount > 0 && (
              <li>
                <i>
                  <img
                    src="/assets/images/search-menu/star-icon-yellow.svg"
                    alt=""
                  />
                </i>
                <span>{item.rating}</span> ({item.ratingCount}){" "}
              </li>
            )}
            <li>
              <i>
                <img
                  src="/assets/images/search-menu/euro-icon-yellow.svg"
                  alt=""
                />
              </i>
              <span>
                {price && price?.toLocaleString('en-US')}
                {item.currency == "Euro" && ` ${item.currency}`}
                {item.currency == "Lek" && ` ${item.currency}`}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <Link href={`${redirect} `}>
        <a className="stretched-link" />
      </Link>
    </div>
  );
};
export default RestaurantCard;
