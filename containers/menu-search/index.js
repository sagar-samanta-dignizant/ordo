import { useEffect, useState } from "react";
import {
  CategoryTab,
  CategoryAccordeon as Accordion,
} from "/components/tab/Tab";
import Link from "next/link";
//tr
import { useTranslation } from "next-i18next";

export const MenuSearchBody = ({ mobileView }) => {
  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/menus/6375fa9b4161771a9e91c0b8`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMenus(myJson.data.menus);
      });
  };

  useEffect(() => {
    // getData()
  }, []);

  var result_data = [0, 2, 3, 4];
  var result_list = result_data.map((index, key) => {
    return (
      <>
        <Card key={key} />
      </>
    );
  });
  // tr
  const { t } = useTranslation("common");
  return (
    <>
      <div
        className={[
          "body-rounded",
          "bg-white",
          mobileView == true ? "top-0" : "",
        ].join(" ")}
      >
        <div className="container">
          <h2>{t("showing_result_for_pizza")}</h2>
          <div className="row">{result_list}</div>
        </div>
      </div>
    </>
  );
};

const Card = ({
  image,
  title,
  description,
  price,
  old_price,
  currency,
  id,
}) => {
  var currency_text = "";
  if (currency == "Euro" || currency == "EUR" || currency == "€") {
    var currency_text = "€";
  }
  return (
    <>
      <div className="col-lg-3">
        <Link href={`/product-details/${id}`}>
          <div className="card-after-menu">
            <img src={image ? image : ""} alt="" />
            <div>
              <div className="title">{title}</div>
              <div className="price">
                {old_price ? (
                  <span className="old">
                    {old_price && old_price.toFixed(2)} {currency_text}
                  </span>
                ) : null}{" "}
                {price && price.toFixed(2)} {currency_text}
              </div>
              <div className="desct">
                {description}
                {id}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
