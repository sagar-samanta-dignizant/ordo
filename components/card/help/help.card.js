import { useTranslation } from "next-i18next";
// tr
import { useTranslation } from "next-i18next";
const HelpCard = () => {
  // tr
  const { t } = useTranslation("common");
  return (
    <div className="container pt-90 pb-20">
      <div className="help-banner-img">
        <img src="/assets/images/contact/contact-banner-img.svg" alt="" />
      </div>
      <div className="text-center mb-32">
        <h1 className="mb-6"> {t("how_can_we_help_you")}</h1>
        <p className="font-16px-24px-400 text-light-content">
          {t("how_can_we_help_you_desc")}{" "}
        </p>
      </div>
      <div className="clearfix">
        <div className="contact-block">
          <figure>
            <img src="/assets/images/contact/contact-phone-icon.svg" alt="" />
          </figure>
          <div>
            <p className="font-14px-22px-400 content-color-light mb-2">
              Call Us
            </p>
            <h3 className="text-content m-0">+23-254698</h3>
          </div>
          <a href="tel:+23-254698" className="stretched-link" />
        </div>
        <div className="contact-block">
          <figure>
            <img
              src="/assets/images/contact/contact-envelope-icon.svg"
              alt=""
            />
          </figure>
          <div>
            <p className="font-14px-22px-400 content-color-light mb-2">
              {t("email_us")}
            </p>
            <h3 className="text-content m-0">info@ozzo.ai</h3>
          </div>
          <a href="mailto:info@ozzo.ai" className="stretched-link" />
        </div>
        <div className="text-center pt-36">
          <a href="otp.html" className="hammerhead text-light-content">
            {t("delete_account")}
          </a>
        </div>
      </div>
    </div>
  );
};
export default HelpCard;
