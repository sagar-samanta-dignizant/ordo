import DeliveryCard from "/components/card/restaurant-profile-cards/delivery/deliveryCard";
import { MenuData } from "../menus/data/menu.data";
import { useTranslation } from "next-i18next";

const DeliveryCardlist = (props) => {
  const { t } = useTranslation("common");
  var list = [];

  // remove the delivery partners that do not have a link
  if (props.data.delivery_partners) {
    Object.entries(props.data.delivery_partners).forEach((key, value) => {
      if (key[1] == "") {
        delete props.data.delivery_partners[key[0]];
      }
    });
  }

  // create a card for each delivery partner
  if (props.data.delivery_partners) {
      list = Object.entries(props.data.delivery_partners).map((key, value) => {
      return <DeliveryCard key={value} name={key[0]} link={key[1]} />;
    });
  }
  // here we show the box if there is at least one delivery partner
  return (
    props.data.delivery_partners &&
    Object.keys(props.data.delivery_partners).length > 0 && (
      <div className="mb-20 px-0 delivery-card">
        <h2
          className="mb-12 px-20"
          style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
        >
          {t("delivery_partners")}
        </h2>

        <div className="card-list-group-100 px-20">
          <div
            className="card mb-16"
            style={{
              padding: "0px 4px",
              fontFamily: "SF-Semi",
              fontSize: "16px",
            }}
          >
            {list}
          </div>
        </div>
      </div>
    )
  );
};
export default DeliveryCardlist;
