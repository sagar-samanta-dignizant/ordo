import Image from "next/image";
import Link from "next/link";
import CookiesModal from "../modal/CookiesModal";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useContext, useState } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import { useTranslation } from "next-i18next";
const Footer = () => {
  const { t } = useTranslation("common");
  const [showCoupon, setCoupon] = useState(false);
  const [open, setOpen] = useState({
    company: false,
    legalHub: false,
  });

  const openDropDown = (value) => {
    setOpen({ ...open, [value]: !open[value] });
  };

  return (
    <div className="footer-wrapper">
      {/* <div style={{display:"flex",flexDirection:'column'}}>  */}
      <div className="footer-container">
        <div className="footer-subcontainer1">
          <img src="/assets/images/OZZO.svg" alt="" height="27px" />
          <p
            style={{
              fontWeight: "100",
              color: "rgb(255 255 255 / 31%)",
              fontStyle: "normal",
            }}
          >
            {t("footer_desc")}
          </p>
          <div className="ozzo-options-container">
            <div className="ozzo-options-subcontainer">
              <img
                src="/assets/images/OZZO.svg"
                alt=""
                height="16px"
              />
              <img
                src="/assets/images/Merchant.svg"
                alt=""
                height="7.5px"
                style={{ marginTop: "3px" }}
              />
            </div>
          </div>
        </div>

        <div className="footer-subcontainer2">
          {/* <h3 onClick={() => openDropDown("company")}>
            {t("company")}
          </h3>
          <img
            className={
              open.company
                ? "expandIcon-active expandIcon"
                : "expandIcon"
            }
            src="/assets/icons/dropDownIcon.svg"
            alt=">"
          /> */}

          {/* sadessd */}

          <div id="accordion">
            <div class="">
              <div
                class="card-header position-relative"
                id="companyTitle"
                data-toggle="collapse"
                data-target="#companyLinks"
                aria-expanded="true"
                aria-controls="companyLinks"
              >
                <h3 onClick={() => openDropDown("company")}>
                  {t("company")}
                </h3>
                <img
                  className={
                    open.company
                      ? "expandIcon-active expandIcon"
                      : "expandIcon"
                  }
                  src="/assets/icons/dropDownIcon.svg"
                  alt=">"
                />
              </div>
              <div
                id="companyLinks"
                className="collapse  show "
                aria-labelledby="companyTitle"
                data-parent="#accordion"
              >
                <div className="footer-list-items">
                  <p className="footerLinkText">
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#about-us`}
                    >
                      {t("about_us")}
                    </a>
                  </p>
                  <p className="footerLinkText">
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#careers`}
                    >
                      {t("career")}
                    </a>
                  </p>
                  <p className="footerLinkText">
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#prices`}
                    >
                      {t("products")}
                    </a>
                  </p>
                  <p className="footerLinkText">
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#environment`}
                    >
                      {t("sustainablity")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-subcontainer2">
          <div>
            <div class="accordion-legalHub">
              <div
                class="card-header position-relative"
                id="headingOne"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <h3 onClick={() => openDropDown("legalHub")}>
                  {t("legal_hub")}
                </h3>
                <img
                  className={
                    open.legalHub
                      ? "expandIcon-active expandIcon"
                      : "expandIcon"
                  }
                  src="/assets/icons/dropDownIcon.svg"
                  alt="ozzo"
                />
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion-legalHub"
              >
                <div className="footer-list-items">
                  <p className="footerLinkText">
                    {" "}
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#legal-hub`}
                    >
                      {t("privacy")}
                    </a>
                  </p>
                  <p className="footerLinkText">
                    {" "}
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#legal-hub`}
                    >
                      {t("terms_conditions")}
                    </a>
                  </p>
                  <button
                    className="btn-no-style"
                    onClick={() => {
                      setCoupon(true);
                    }}
                  >
                    <p className="footerLinkText">
                      <a
                        className="footerLinkText"
                        // href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#legal-hub`}
                      >
                        {t("cookies")}
                      </a>
                    </p>
                  </button>
                  <p className="footerLinkText">
                    <a
                      className="footerLinkText"
                      href={`${process.env.NEXT_PUBLIC_FOOTER_URL}/#legal-hub`}
                    >
                      {t("policies")}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-subcontainer3">
          <h3>{t("contact")} </h3>
          <p className="bottom-space">{t("write_to_us")} </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <img src="/assets/images/footer/icon-footer-envelope.svg" />
            <p style={{ whiteSpace: "normal" }}>info@ordo.eu</p>
          </div>

          {/* <div className="hr-line"></div> */}
          <br />
          <div>
            <p className="bottom-space"> {t("call_us_on")} </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              <img src="/assets/images/footer/icon-footer-phone.svg" />
              <p>+355 (0)67 606 0882</p>
            </div>
            {/* <div className="hr-line"></div> */}
          </div>
        </div>
      </div>

      <div className="footer-info-row">
        <div className="follow-us-container">
          <p className="follow-us-text">{t("follow_us")} </p>
          <a href="https://www.instagram.com/ozzo.al">
            <img src="/assets/images/footer/instagram.svg" />
          </a>
          <a href="https://www.facebook.com/ozzo.al">
            <img src="/assets/images/footer/facebook-f.svg" />
          </a>
          <a href="https://www.linkedin.com/company/ozzoal">
            <img src="/assets/images/footer/linkedin-in.svg" />
          </a>
          <a href="https://twitter.com/ozzoeu">
            <img src="/assets/images/footer/twitter.svg" />
          </a>
          <a href="https://www.youtube.com/@ozzoeu">
            <img src="/assets/images/footer/youtube.svg" />
          </a>
        </div>
        <div>
          <p className="gray-text">
            {`@ ${new Date().getFullYear()}`} {t("ordo_all_right reserved")}{" "}
          </p>
        </div>
        <div className="from-ordo">
          <p className="gray-text">{t("from")}</p>
          <p className="ordo-green">{t("ordo")}</p>
        </div>
      </div>
      <BottomSheet open={showCoupon} className="bottom-sheet">
        <CookiesModal
          showCoupon={showCoupon}
          handleClose={() => setCoupon(false)}
        />
      </BottomSheet>
    </div>
  );
};

export default Footer;
