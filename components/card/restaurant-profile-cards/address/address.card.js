import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GeoLocationContext } from "/context/geoLocationContext";

const AddressCard = (props) => {
	const { t } = useTranslation("common");
	const [showMore, setShowMore] = useState(false);
	const [showDaily, setShowDaily] = useState(false);
	const dayList = [
		t("sunday"),
		t("monday"),
		t("tuesday"),
		t("wednesday"),
		t("thursday"),
		t("friday"),
		t("saturday"),
		t("sunday"),
	];

	var adressCardDescription = "";
	if (props.data && props.data.description) {
		adressCardDescription = props.data.description;
	}

	const { setLocation } = useContext(GeoLocationContext);
	const router = useRouter();

	var hours_list = [];
	if (props.data && props.data.work_hour_list) {
		if (props.data.work_hour_list.length > 0) {
			hours_list = props.data.work_hour_list;
		}
	}
	function formatAMPM(date) {
		var hours = date.getHours();
		var ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		var hours_text = String(date.getMinutes()).padStart(2, "0");
		var strTime = hours + ":" + hours_text + ampm;
		return strTime;
	}

	function getDayFromDate(index) {
		var shiftedIndex = (index + 1) % dayList.length;
		var date_day = dayList[shiftedIndex];
		return date_day;
	}

	function getTodayFromDate() {
		var todayDate = new Date();
		if (props.data && props.data.work_hour_list) {
			if (props.data.work_hour_list.length >= todayDate.getDay()) {
				var todayList = props.data.work_hour_list[todayDate.getDay()];
				try {
					var startDate = new Date(todayList[0][0]);
					var endDate = new Date(todayList[0][1]);
					return `${formatAMPM(startDate)} - ${formatAMPM(endDate)}`;
				} catch (e) {
					return ``;
				}
			}
		}

		return `-`;
	}

	return (
		<div className="card pt-12 mb-24">
			<h2
				className="d-flex align-items-center col-gap-14 mb-6 "
				style={{ fontFamily: "SF-Semi", fontSize: "20px" }}
			>
				{/* Address <span className="badge-dark-green">15 min</span> */}
				{t("address")}
			</h2>
			<address className="font-16px-26px-400 address-tagline m-0">
				{/* Rectory Cottage, Farleigh Court Road, Warlingham, CR6 9PX */}
				<p
					style={{ fontFamily: "SF-Regular" }}
				>{`${props.data.street}, ${props.data.city}, ${props.data.country}, ${props.data.postal_code}`}</p>
			</address>
			<div className="hr-line" />
			<div className="font-16px-26px-400 my-16">
				<p style={{ fontFamily: "SF-Regular" }} className="address-tagline">
					{showMore ? adressCardDescription : `${adressCardDescription.substring(0, 120)}`}
					<button
						className="btn"
						style={{ marginLeft: "-10px", color: "#FCCE00" }}
						onClick={() => setShowMore(!showMore)}
					>
						{adressCardDescription.length > 120 && (showMore ? "Show less" : "...more")}
					</button>
				</p>
			</div>

			<div
				className="restaurant-address-link mb-16"
				style={{ whiteSpace: "nowrap" }}
			>
				<a
					style={{ fontFamily: "SF-Semi", color: "#001921" }}
					href="#"
					className="btn btn-light btn-sm"
					onClick={() => {
						// setLocation({ type: "user", value: {
						//   city: props.data && props.data.city,
						//   country: props.data && props.data.country,
						//   description: props.data && props.data.name,
						//   latitude: props.data && props.data.latitude,
						//   longitude: props.data && props.data.longitude,
						// }});

						router.push({
							pathname: `https://www.google.com/maps/@${props.data.latitude},${props.data.longitude}`,
						});
					}}
				>
					<img
						src="/assets/images/locationArrowDarkGreen.svg"
						alt=""
						className="dark-hidden"
					/>
					<img
						src="/assets/images/foo-menu-light.png"
						alt=""
						className="light-hidden"
					/>{" "}
					{t("get_direction")}
				</a>
				<a
					style={{ fontFamily: "SF-Semi", color: "#001921" }}
					href={`tel:+${props.data && props.data.phone_number}`}
					className="btn btn-light btn-sm"
				>
					<img
						src="/assets/images/phoneDarkGreen.svg"
						alt=""
						className="dark-hidden"
					/>
					<img
						src="/assets/images/phone-light.svg"
						alt=""
						className="light-hidden"
					/>{" "}
					{t("call_us")}
				</a>
			</div>
			<div
				className="addons-card bg-light-grey py-8 px-20 radius-10"
				onClick={() => setShowDaily(!showDaily)}
				style={{ fontFamily: "SF-Semi" }}
			>
				<a
					className="d-flex justify-content-between align-items-center"
					data-bs-toggle="collapse"
					href="#collapseExample"
					role="button"
					aria-expanded={showDaily == false ? "false" : "true"}
					aria-controls="collapseExample"
				>
					<h5 className="mb-0">
						{t("today")}: {getTodayFromDate()}
					</h5>
					<div className="addons-arrow d-flex align-items-center">
						<img
							src="/assets/images/company-details/addons-right-arrow-black.svg"
							alt=""
							className="dark-hidden"
						/>
						<img
							src="/assets/images/arrow-right-light.svg"
							alt=""
							className="light-hidden"
						/>
					</div>
				</a>
				<div
					className={showDaily == false ? "collapse" : ""}
					id="collapseExample"
				>
					<div className="pt-20 pb-12">
						{/* Render from the second set of hours onwards */}
						{hours_list.slice(1).map((item, i) => {
							if (!item || item.length < 1) {
								return null;
							}
							var startDate = new Date(item[0][0]);
							var endDate = new Date(item[0][1]);
							return (
								<div
									key={i}
									className="d-flex align-items-center justify-content-between font-14px-22px-400 mb-10"
								>
									<span className="text-secondary-grey address-time">{getDayFromDate(i)}</span>
									{formatAMPM(startDate)} - {formatAMPM(endDate)}
								</div>
							);
						})}

						{/* Render the first set of hours */}
						{hours_list.length > 0 && hours_list[0] && (
							<div className="d-flex align-items-center justify-content-between font-14px-22px-400 mb-10">
								<span className="text-secondary-grey address-time">{getDayFromDate(hours_list.length - 1)}</span>
								{formatAMPM(new Date(hours_list[0][0][0]))} -{" "}
								{formatAMPM(new Date(hours_list[0][0][1]))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddressCard;
