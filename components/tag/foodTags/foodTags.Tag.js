//tr
import { useTranslation } from "next-i18next";


// tr

const FoodTags = ({ time, servingFood, bar, union, table }) => {
  const { t } = useTranslation("common");
  return (
    <ul>
      {time && (
        <li>
          <span>
            {time} {t("min")}
          </span>
        </li>
      )}
      {servingFood && (
        <li>
          <i>
            <img
              src="/assets/images/search-menu/serving-food-icon.svg"
              alt="#"
            />
          </i>
        </li>
      )}
      {bar && (
        <li>
          <i>
            <img src="/assets/images/search-menu/bar-icon.svg" alt="#" />
          </i>
        </li>
      )}
      {union && (
        <li>
          <i>
            <img src="/assets/images/search-menu/union-icon.svg" alt="#" />
          </i>
        </li>
      )}
      {table && (
        <li className="success-tag">
          <i>
            <img src="/assets/images/search-menu/table-icon.svg" alt="#" />
          </i>
        </li>
      )}
    </ul>
  );
};
export default FoodTags;
