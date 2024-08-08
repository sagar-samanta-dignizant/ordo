import { useRouter } from "next/router";
import Button from "./Button";

import { useTranslation } from "next-i18next";

const ScanMenuButton = ({ image }) => {
	const { t } = useTranslation("common");
	const router = useRouter();
	return (
		<div
			className="scanMenuBtnContainer"
			style={{ fontFamily: "SF-Semi", fontSize: "19px", zIndex: "20003" }}
		>
			<Button
				buttonStyle="btn-yellow"
				buttonSize="default"
				onClick={() => {
					router.push("/scan-menu");
				}}
			>
				{" "}
				{t("scan_menu")}
			</Button>
		</div>
	);
};

export default ScanMenuButton;
