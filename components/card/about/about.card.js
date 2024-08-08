import Link from 'next/link';
import { useTranslation } from "next-i18next";

const AboutCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="container pt-80 pb-20">
      <div className="card p-20">
        <div className="card-list-group">
          <div className="card-content">
            <figure className="card-content-img img-sm">
              <img src="/assets/images/icons/icon-info-green.svg" alt="" />
            </figure>
            <div className="card-content-info">
              <h5>{t("about_ordo")}</h5>
              <p className="footnote-400">  {t("about_ordo_description")}</p>
            </div>
            <div className="card-content-arrow">
              <img src="/assets/images/icons/card-content-arrow.svg" alt="" />
            </div>
            <Link href="/about-ordo">
              <a className="stretched-link" />
            </Link>
          </div>
          <div className="card-content">
            <figure className="card-content-img img-sm">
              <img src="/assets/images/icons/icon-checklist-green.svg" alt="" />
            </figure>
            <div className="card-content-info">
              <h5>{t("terms_of_use")}</h5>
              <p className="footnote-400">{t("terms_of_use_desc")}</p>
            </div>
            <div className="card-content-arrow">
              <img src="/assets/images/icons/card-content-arrow.svg" alt="" />
            </div>
            <Link href="/terms-of-use">
              <a className="stretched-link" />
            </Link>
          </div>
          <div className="card-content">
            <figure className="card-content-img img-sm">
              <img
                src="/assets/images/icons/icon-privacy-tick-green.svg"
                alt=""
              />
            </figure>
            <div className="card-content-info">
              <h5>{t("privacy_policy")}</h5>
              <p className="footnote-400">
              {t("privacy_policy_desc")}
               {' '}
              </p>
            </div>
            <div className="card-content-arrow">
              <img src="/assets/images/icons/card-content-arrow.svg" alt="" />
            </div>
            <Link href="/privacy-policy">
              <a className="stretched-link" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutCard;
