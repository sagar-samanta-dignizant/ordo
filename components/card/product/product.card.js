/* eslint-disable react-hooks/exhaustive-deps */
import { MenuDineValueContext } from "@/context/menuDineValueContext";
import { useContext, useEffect, useState } from "react";
import ShowMoreText from "react-show-more-text";


const ProductCard = ({
  ID,
  ImageI,
  ProductName,
  ProductDescription,
  Rating,
  ProductPrice,
  ProductID,
  handlePulsIconClick,
}) => {
  const [selectedProducts, setSelectedProductsValue] = useState();
  const { menuDineValue } = useContext(MenuDineValueContext);

  useEffect(() => {
    if (menuDineValue.find((ele) => ele.productId === ProductID) != undefined) {
      const productValues = menuDineValue.find(
        (ele) => ele.productId === ProductID
      );

      setSelectedProductsValue(productValues);
    }
  },[]);
  
  return (
    <div
      className={`category-item-card ${
        selectedProducts?.productId === ProductID ? "selected" : ""
      } `}
      key={ID}
    >
      <div className="category-item">
        <figure className="category-item-img">
          <img src={ImageI ? ImageI : ""} alt="" srcSet="" />
        </figure>
        <div className="category-item-content">
          <div className="d-flex justify-content-between gap-20 mb-8">
            <div>
              <h4>{ProductName}</h4>
              <div className="menu-item-price">
                <div className="price-value-detail">
                  <div className="old-price">€15</div>
                  <div className="font-14px-20px-500 text-content">
                    €{ProductPrice && ProductPrice.toFixed(2)}
                  </div>
                </div>
                <div className="price-value-rating">
                  <i>
                    <img
                      src="/assets/images/menu/icon-rating-star.svg"
                      alt=""
                    />
                  </i>
                  <div className="price-value-rating-text">
                    {Rating}
                    <span className="text-light-content ml-2">(56)</span>
                  </div>
                </div>
              </div>
            </div>
            <a className="category-item-add">
              <img src="/assets/images/menu/icon-plus-green.svg" alt="" />
            </a>
          </div>
          <div className="font-14px-20px-400">
            <ShowMoreText
              lines={2}
              more=""
              less=""
              className="content-css"
              expanded={false}
              width={280}
              truncatedEndingComponent={"... "}
            >
              {ProductDescription}
            </ShowMoreText>
          </div>
        </div>
        <a
          onClick={() => handlePulsIconClick(ProductID)}
          data-bs-toggle="modal"
          className="stretched-link"
        />
      </div>
      {selectedProducts?.productId === ProductID && (
        <div className="menu-item-category-size">
          <ul>
            {selectedProducts.values.map((item) => (
              <li key={item.productId}>
                <a href="#">
                  1 x {item.productName}{" "}
                  <span>{item.values.length} add ons</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default ProductCard;
