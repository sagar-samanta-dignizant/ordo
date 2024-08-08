import { useTranslation } from "next-i18next";
const CompanyDetailsCard = () => {
  const { t } = useTranslation("common");
  return (
    <div className="card p-20 pt-16 mb-20">
      <h2 className="mb-16"> {t("pixocrafts_inc")}</h2>
      <div className="d-flex col-gap-20 align-items-center justify-content-between font-14px-22px-400 border-top py-10 fw-500">
        <span>{t("id")}</span>U72900WB2021PTC242510
      </div>
      <div className="d-flex col-gap-20 align-items-center justify-content-between font-14px-22px-400 border-top py-10 fw-500">
        <span>{t("vat_number")}</span>19AALCP7186Q1Z7
      </div>
      <div className="d-flex col-gap-20 align-items-center justify-content-between font-14px-22px-400 border-top py-10 fw-500">
        <span>{t("person")}</span>Subhodeep Pal
      </div>
      <div className="d-flex col-gap-20 align-items-center justify-content-between font-14px-22px-400 border-top py-10 fw-500 text-end">
        <span>{t("address")}</span>12 Gibson Close, Waterbeach, CB25 9HY
      </div>
      <a
        href="#"
        className="btn btn-light-grey btn-sm right-arrow mt-16"
        data-bs-toggle="offcanvas"
        data-bs-target="#bottomsheet4"
        aria-controls="bottomsheet4"
      >
        {t("edit_company_details")}
      </a>
    </div>
  );
};
export default CompanyDetailsCard;
