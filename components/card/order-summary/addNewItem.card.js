import { useTranslation } from "next-i18next";
const AddNewItemCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="card p-16 mb-24">
      <div className="card-content">
        <figure className="card-content-img bg-primary-green">
          <img src="images/company-details/new-dish.svg" alt="" />
        </figure>
        <div className="card-content-info">
          <h5>{t("add_new_items")}</h5>
        </div>
        <div className="card-content-arrow">
          <img src="images/icons/card-content-arrow.svg" alt="" />
        </div>
        <a href="#" className="stretched-link" />
      </div>
    </div>
  );
};
export default AddNewItemCard;
