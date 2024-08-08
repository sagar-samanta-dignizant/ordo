import Link from "next/link";
//tr
import { useTranslation } from "next-i18next";
const SectionNameWrapper = ({ name, redirect, children }) => {
    // tr
    const { t } = useTranslation("common");
  return (
    <div className="resturenSlider">
      <div className="eat-what-you-want mb-12">
        <h2 className="m-0">{name}</h2>
        <Link href={`/search-filters`}>
          <a className="hammerhead">{t("see all")}</a>
        </Link>
      </div>
      {children}
    </div>
  );
};
export default SectionNameWrapper;
