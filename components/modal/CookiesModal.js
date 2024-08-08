import { useTranslation } from "next-i18next";
import Button from "../button/Button";

const CookiesModal = ({ handleClose }) => {
  const { t } = useTranslation("common");
  return (
    <div>
      {/* <div className="offcanvus-close" onClick={handleClose}>
        <img src="/assets/images/menu/icon-close-grey.svg" alt="" />
      </div> */}
      <div className="container p-0">
        <div className="centered-content">
          <img src="/assets/images/cookie.svg" />
          <h1 style={{
            fontFamily: 'SF-Semi'
          }}>Confirm our Cookies!</h1>

          <h4>Please review and confirm our cookies for an optimal experience on OZZO!</h4>
          <div className="buttons-div">
            <Button buttonStyle="btn-gray-bg" buttonSize="default" onClick={handleClose}>
              {t("review")}{" "}
            </Button>
            <Button buttonStyle="btn-yellow" buttonSize="default" onClick={handleClose}>
              {" "}
              {t("accept_all")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesModal;
