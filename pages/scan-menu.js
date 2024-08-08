import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import QrScanModal from "../components/modal/qrScanModal";
// import {QrReader} from 'react-qr-reader';
import dynamic from "next/dynamic";
// tr
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
	console.log(locale);
	if (typeof locale === "undefined") {
		locale = "en";
	}
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])), // Will be passed to the page component as props
		},
	};
}

const QrReader = dynamic(() => import("react-qr-reader"), {
	ssr: false,
});

function ScanMenu() {
	// tr
	const { t } = useTranslation("common");
	const [isModal, setModal] = useState(false);
	const [tagText, setTagText] = useState("");
	const router = useRouter();

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			router.push({ pathname: `/qr-code/${tagText}` });
		}
	};

	const onAccept = (event) => {
		router.push({ pathname: `qr-code/${tagText}` });
	};

	const handleScan = (data) => {
		if (data) {
			router.push("https://" + data);
		}
	};
	const handleError = (err) => {
		console.error(err);
	};

	useEffect(() => {
		if (router.query && router.query.wrongTag) {
			alert("Wrong Tag");
		}
	}, [router.query.wrongTag]);

	return (
		<>
			<div className="header-buttons">
				<header className="header-fixed-top bg-transparent">
					<div className="container-fluid">
						<nav className="navbar style_one">
							<div className="nav-button-action">
								<div>
									<a href="https://ozzo.eu">
										<img
											src="/assets/images/ozzo-logo.svg"
											alt=""
										/>
									</a>
								</div>
							</div>
							<div className="nav-search"></div>
							<div className="nav-button-action">
								<div>
									<a href="https://merchant.ozzo.eu">
										<div className="undefined easy-button">
											<b>{t("ozzo")}</b> {t("merchant")}
										</div>
									</a>
								</div>
							</div>
						</nav>
					</div>
				</header>
			</div>
			<div className="scanMenuContainer">
				{/* <div className="scanMenuBackground"></div> */}
				<div className="scanMenuQrCode">
					<div className="vectorItemsContainer">
						<div className="scanqr-code">
							<div className="vector-top">
								<img
									src="assets/images/qr-code/dining-qr-code.svg"
									alt=""
								/>
							</div>{" "}
							<br />
							<div className="scan-code">{t("scan_the_qr_code")}</div>
							<div className="scan-info">{t("scan_the_qr_code_desc")}</div>
						</div>
					</div>
				</div>

				<div className="cameraContainer">
					<div className="camera-fixes">
					<div className="scannerLine" />
						<QrReader
							delay={300}
							onError={handleError}
							onScan={handleScan}
							onResult={handleScan}
							resolution={600}
							style={{ width: "100%" }}
							key="environment"
							// constraints={{
							//   facingMode: 'environment'
							// }}
						/>
					</div>
				</div>

				{/* <div className="line1"></div> */}
			</div>
			<div className="scanMenuTextContainer">
				<div className="enterLocationTag">{t("enter_the_location_tag")}</div>
				<div className="pleaseEnterLocationTag">{t("enter_the_location_tag_desc")}</div>
				<div className="locationTagFormContainer">
					<input
						type="locationTag"
						placeholder="Enter location tag"
						onKeyDown={handleKeyDown}
						onChange={(e) => {
							setTagText(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className="qr-code-footer">
				<ul>
					<li>
						<a
							className=""
							onClick={() => {
								setModal(true);
							}}
						>
							<img
								src="/assets/images/qr-code/qr-code-number.svg"
								alt=""
							/>
						</a>
					</li>
					<li>
						<a className="">
							<img
								src="/assets/images/qr-code/torch.svg"
								alt=""
							/>
						</a>
					</li>
				</ul>
			</div>

			{isModal && (
				<QrScanModal
					isModal={isModal}
					setModal={setModal}
					onAccept={onAccept}
					onChange={(e) => {
						setTagText(e.target.value);
					}}
				/>
			)}
			{/* </div> */}
		</>
	);
}
export default ScanMenu;
