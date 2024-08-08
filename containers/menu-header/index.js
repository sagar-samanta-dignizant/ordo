import Link from "next/link";
import Image from "next/image";

export default function MenuProfileHeader({ item }) {
 
  if (item == null) {
    return null;
  }
  var price = item.average_price;
  return (
    <div className="restaurant-hero">
      <figure className="restaurant-hero-pic">
        <Image
          src={`${item.image ? item.image : ""}`}
          alt={`${item.image ? item.image : ""}`}
          height="57px"
          width="57px"
        />
      </figure>
      <div className="container position-relative ">
        <div className="restaurant-hero-info d-flex justify-content-between align-items-center">
          <div className="d-flex col-gap-24">
            <div className="restaurant-logo">
              {item._id && (
                <Image
                  src={`${item.icon ? item.icon : ""}.png`}
                  alt={`${item.icon ? item.icon : ""}.png`}
                  height="57px"
                  width="57px"
                />
                
              )}
            </div>

            <div className="restaurant-name-detail ">
              <h2>{item.name}</h2>
              <div className="available-items">
                {price && (
                  <span>
                    {price < 20 && "€"}
                    {price >= 20 && price < 100 && "€€"}
                    {price >= 100 && "€€€"}
                  </span>
                )}
                {item.cuisine_type_list && (
                  <ul>
                    {item.cuisine_type_list.map((index, key) => {
                      return <li key={key}>{index}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
