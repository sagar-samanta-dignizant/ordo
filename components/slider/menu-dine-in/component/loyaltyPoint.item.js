//tr
import { useTranslation } from "next-i18next";
// tr
const { t } = useTranslation("common");
const LoyaltyPointItem = ({ setCoupon }) => {
  return (
    <div className="loyalty-point-card">
      <div className="loyalty-progress-bar">
        <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.5 4.49375C12.7798 4.49375 4.9 12.3735 4.9 22.0937C4.9 31.814 12.7798 39.6937 22.5 39.6937C32.2202 39.6937 40.1 31.814 40.1 22.0937C40.1 12.3735 32.2202 4.49375 22.5 4.49375ZM0.5 22.0937C0.5 9.94348 10.3497 0.09375 22.5 0.09375C34.6503 0.09375 44.5 9.94348 44.5 22.0937C44.5 34.244 34.6503 44.0937 22.5 44.0937C10.3497 44.0937 0.5 34.244 0.5 22.0937Z"
            strokeWidth={2}
            fill="#001921"
            fillOpacity="0.1"
          />
          <path
            className="progress"
            data-anim={1.0}
            fillOpacity={0}
            d="M4.39197 29.5944L6.23973 28.829L4.39197 29.5944C5.87545 33.1758 8.38763 36.2369 11.6108 38.3906C14.834 40.5442 18.6235 41.6938 22.5 41.6938C22.6105 41.6938 22.7 41.7833 22.7 41.8937C22.7 42.0042 22.6105 42.0938 22.5 42.0938C18.5444 42.0938 14.6776 40.9208 11.3886 38.7231C8.65671 36.8978 6.42539 34.4335 4.88039 31.5568L4.97256 31.5186L4.20719 29.6709L3.44183 27.8231L3.34966 27.8613C2.408 24.7347 2.24331 21.4144 2.8843 18.192C3.65601 14.3123 5.56082 10.7487 8.35787 7.95162C11.1549 5.15457 14.7186 3.24976 18.5982 2.47805C21.8207 1.83706 25.1409 2.00175 28.2676 2.94341L28.2372 3.01664L30.085 3.78201L31.9327 4.54737L31.9631 4.47414C34.8398 6.01914 37.304 8.25046 39.1294 10.9824C41.327 14.2713 42.5 18.1381 42.5 22.0938C42.5 22.2042 42.4105 22.2938 42.3 22.2938C42.1895 22.2938 42.1 22.2042 42.1 22.0938C42.1 18.2172 40.9505 14.4278 38.7968 11.2046C36.6431 7.98138 33.582 5.4692 30.0006 3.98572C26.4192 2.50224 22.4783 2.1141 18.6762 2.87037C14.8742 3.62664 11.3818 5.49336 8.64072 8.23447C5.89961 10.9756 4.03289 14.468 3.27662 18.27C2.52035 22.072 2.90849 26.0129 4.39197 29.5944Z"
            stroke="#2CBD53"
            strokeWidth={4}
            strokeLinecap="round"
          />
        </svg>
        <div className="loyalty-point-count font-14px-20px-500 text-secondary-grey">
          25
        </div>
      </div>
      <div className="font-14px-20px-400">
        {t("get")}
        <strong className="fw-600">+5 {t("loyalty_points")}</strong>{" "}
        {t("to_have_a_free_meal")}
      </div>
      <a onClick={() => setCoupon(true)} className="stretched-link" />
    </div>
  );
};
export default LoyaltyPointItem;
