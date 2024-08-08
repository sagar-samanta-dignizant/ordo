import WifiCard from "./component/wifi.card";
import { WifiCardData } from "./data/wifiCard.data";
// tr
import { useTranslation } from "next-i18next";

const WifiCardList = (props) => {
  const { t } = useTranslation("common");
  return (
    <div className="mb-20 px-20">
      <h2 className="mb-12">{t("wifi_details")}</h2>
      <div
        className="card"
        style={{ padding: "16px 16px 0px 16px" }}
      >
        {/* {WifiCardData.map(({ id, name, userName, image }) => ( */}
        <WifiCard
          image={"/assets/images/menu/icon-wify-teal.svg"}
          userName={"Username"}
          name={props.data.wifi_username}
        />
        <WifiCard
          image={"/assets/images/menu/icon-lock-red.svg"}
          userName={"Password"}
          name={props.data.wifi_password}
          backroundColor="rgb(234 67 53 / 10%)"
        />

        {/* ))} */}
      </div>
    </div>
  );
};
export default WifiCardList;
