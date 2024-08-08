import { useContext, useState } from "react";
import { useTranslation } from "next-i18next";
const QrScanModal = ({
  isModal,
  setModal,
  onAccept = function () {},
  onChange,
}) => {
  const [data, setData] = useState("");
  const { t } = useTranslation("common");
  const onOK = async () => {
    try {
      const tagData = await mutationByTag.mutateAsync({ data });
      if (tagData.data.xmlContent) {
        const newData = tagData.data.xmlContent.SelectProductByTag2;
        const restaurantInfo = {
          image: newData.ImageI,
          logo: newData.LogoI,
          name: newData.Name,
          description: newData.Description,
          foodKeyWords: newData.FoodKeyWords,
        };
        // eslint-disable-next-line no-unused-vars
        const serviceCode =
          newData.CartItemTable.Rows.CartItem.ServiceProviderCode;

        const searchCodeData = await mutationBySearchCode.mutateAsync({
          serviceCode: "P220",
        });
        if (searchCodeData.data.xmlContent) {
          const productDetails = [...searchCodeData.data.xmlContent.EDs.ED];
          const newProductDetails = createServiceProviderData(productDetails);
          menuDineActions.updateAllProducts(productDetails);
          menuDineActions.updateRestaurantDetails(restaurantInfo);
          menuDineActions.updateServiceProviderData(newProductDetails);
          router.push(appRoutes.MAIN.subRoutes.MENU_DINE_IN.pathname);
        }
      }
    } catch (e) {}
    // const newProductDetails = createServiceProviderData(API_DATA);
    // menuDineActions.updateServiceProviderData(newProductDetails);
    // router.push(appRoutes.MAIN.subRoutes.MENU_DINE_IN.pathname);
  };
  return (
    <>
      <div
        className={`modal ${isModal ? "show" : ""}`}
        id="staticBackdrop"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-hidden="true"
        style={isModal ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-dialog modal-dialog-centered location-modal">
          <div className="modal-content">
            <div className="modal-body">
              <h3>{t("enter_location_tag")}</h3>
              <p>{t("enter_location_tag_desc")}</p>
              <input
                type="text"
                name="Enter location tag"
                placeholder={t("enter_location_tag")}
                className="locatuion-field"
                onChange={onChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                onClick={() => setModal(false)}
              >
                {t("cancel")}
              </button>
              <button
                type="button"
                className="btn bg-primary-green"
                // onclick="location.href='menu-dine-in.html'"
                onClick={() => {
                  onAccept();
                }}
              >
                {t("ok")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="modal1" className="modal location-tag-modal">
        <h4 className="heading">{t("enter_location_tag")}</h4>
        <p>{t("enter_location_tag_desc")}</p>
        <input
          type="text"
          name="Enter location tag"
          placeholder={t("enter_location_tag")}
          className="locatuion-field"
          color="grey"
        />
        <div className="location-modal-action">
          <button type="button" className="btn modal-close" onClick={setModal}>
            {t("cancel")}
          </button>
          <button type="button" className="btn">
            {t("ok")}
          </button>
        </div>
      </div>
    </>
  );
};
export default QrScanModal;
