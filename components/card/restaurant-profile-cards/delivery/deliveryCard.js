import Link from "next/link";
import Image from "next/image";

const DeliveryCard = ({ name, link }) => {
  var image;

  name = name.capitalize();

  if (name === "Baboon") {
    image = "https://www.baboon.al/images/baboon-search-logo.jpg";
  } else if (name === "Foodini") {
    image =
      "https://foodinipresentation.al/wp-content/uploads/2020/12/foodini-logo-ngjyra.png";
  } else if (name === "Foodora") {
    image =
      "https://play-lh.googleusercontent.com/lANj2dwLChH-G6Z7BD4-BYN9I4Q9_dpiA3qDgGrXGkW-g0fn2uXZi0F8KN0fmnCO5qWG";
  } else if (name === "Lieferando") {
    image =
      "https://play-lh.googleusercontent.com/0pby-eZjVgUVhtDzf6yMvyUtBR5wIz3INIZAaOR5jb-vCMw4SeNRxyz3yXefnJI9tH_E";
  } else if (name === "Wolt") {
    image =
      "https://play-lh.googleusercontent.com/qp3dvrnvMAYmJj6ok1AtYJdCP0l4BD_PnyEpXde3nPeufoOc7WH_hIzIlIKVEjYdEAtq";
  } else if (name === "Glovo") {
    image = "https://play.google.com/store/apps/details?id=com.glovo&hl=it";
  } else {
    image =
      "https://freerangestock.com/sample/120211/location-pin-vector-icon.jpg";
  }
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="card-content">
        {/* <figure className="card-content-img" > */}
        <figure style={{ width: "42px" }}>
          <img
            className="rounded-circle"
            src={image}
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
          {/* <Image src={image} className="img" layout="fill" objectFit="contain" /> */}
        </figure>
        <div
          className="card-content-info "
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h5>{name}</h5>
          <ul className="card-content-lists">
            {/* <li>{days}</li>
          <li>{duration}</li> */}
          </ul>
          <div className="card-content-arrow d-flex" style={{ paddingRight: '18px', width: '12px' }}>
            <img src="/assets/images/icons/card-content-arrow.svg" alt="" style={{
              height: '12px'
            }}/>
          </div>
        </div>
      </div>
    </a>
  );
};
export default DeliveryCard;

// capitalize the first letter of a string
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
