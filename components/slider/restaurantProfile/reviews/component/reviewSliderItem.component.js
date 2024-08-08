//tr
import { useTranslation } from "next-i18next";


const ReviewSliderItem = () => {
  // tr
  const { t } = useTranslation("common");
  return (
    <div className="card order-item-review-card p-20 bg-white font-14px-22px-400">
      <div className="order-item-review-card-head">
        <figure className="card-content-img full-img">
          <img
            src="/assets/images/new-table-booking/order-review1.png"
            alt=""
          />
        </figure>
        <div className="order-product-rate">
          <h4>{t("bessie_cooper")}</h4>
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <img
                src="/assets/images/new-table-booking/review-star.svg"
                alt=""
              />
              <img
                src="/assets/images/new-table-booking/review-star.svg"
                alt=""
              />
              <img
                src="/assets/images/new-table-booking/review-star.svg"
                alt=""
              />
              <img
                src="/assets/images/new-table-booking/review-star-half.svg"
                alt=""
              />
              <img
                src="/assets/images/new-table-booking/review-star-grey.svg"
                alt=""
              />
            </div>
            <p className="footnote-500">3.5</p>
          </div>
        </div>
        <span className="ms-auto">3 {t("sep")},2018</span>
        <a href="restaurant-reviews.html" className="stretched-link" />
      </div>
      <h4 className="font-14px-20px-500 mb-6">{t("food_was_awesome")}..</h4>
      <p>
        {t("food_was_awesome_desc")}...{" "}
        <a href="#" className="text-secondary-grey fw-700">
          {t("read_more")}
        </a>
      </p>
    </div>
  );
};
export default ReviewSliderItem;
