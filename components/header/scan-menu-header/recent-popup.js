import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
const ScanMenuMenuRecentPopup = ({
	menu,
	show,
	mobileView = false,
	inputText,
	setInputText,
	results = [],
	closeModal = function () {},
	selectLocation,
	inputOnChange = function () {},
}) => {
	if (show) {
		const { t } = useTranslation("common");
		const router = useRouter();
		return (
			<>
				<div
					className="search-location-modal-container"
					style={{ zIndex: "400000" }}
				>
					{/* <div className="container pt-20 pb-20"> */}
					<div className="">
						<div className="p-20 searchHeader" style={{ display: "flex", gap: "16px" }}>
							<div
								className="mobile-action-small"
								style={{ width: "36px", height: "36px", minWidth: "36px" }}
								onClick={() => {
									closeModal();
								}}
							>
								<img
									src="/assets/images/icons/icon-header-back.svg"
									alt=""
								/>
							</div>
							<div
								className=""
								style={{ width: "100%" }}
							>
								<div className="nav-search mobile-menu">
									<input
										className="menuSearchInput"
										type="search"
										name=""
										id=""
										placeholder="Search..."
										value={inputText}
										onChange={(e) => {
											setInputText(e.target.value);
											inputOnChange();
										}}
									/>
								</div>
							</div>
						</div>
						<div className="recent-search-list">
							{inputText != "" && (
								<div className="d-flex justify-content-between align-items-center mt-8 px-20 searchedText">
									<h2 className="mb-0">
										{t("showing_results_for")} '{inputText}'
									</h2>
									{/* <a href="#" className="clear-search"> Clear All </a> */}
								</div>
							)}
							<div className="recent-search-listing p-20">
								<ul>
									{results.map((result, key) => {
										var currency_text = "";
										if (
											result.currency == "Euro" ||
											result.currency == "EUR" ||
											result.currency == "€"
										) {
											var currency_text = "€";
										}
										if (result.currency == "Lek") {
											var currency_text = "Lek";
										}
										if (result.currency == "Dollar") {
											var currency_text = "$";
										}
										const formattedPrice = result.price ? result.price?.toFixed(2) : "";
										// console.log(result);
										return (
											<li key={key}>
												{/* <a
                          href={`/product-details/${result.item_id.id}`}
                          className="font-16px-24px-400"
                        > */}
												<div
													className="font-16px-24px-400"
													onClick={() =>
														router.push({
															pathname: `/product-details/${result.item_id.id}`,
															query: { menu: menu },
														})
													}
												>
													{mobileView == true ? (
														<div className="card-after-menu">
															<div>
																<img
																	src={`${result.item_id ? result.item_id.image : ""}`}
																	alt=""
																	height="50px"
																	width="50px"
																/>
															</div>

															<div>
																<div
																	className="title"
																	style={{
																		fontFamily: "Inter",
																		fontStyle: "normal",
																		fontWeight: "600",
																		fontSize: "16px",
																	}}
																>
																	{result.item_id.name}
																</div>
																<div className="price">
																	{result.old_price && (
																		<span className="old">
																			{(result.currency == "Euro" ||
																				result.currency == "EUR" ||
																				result.currency == "€") &&
																				"€"}
																			{result.old_price && result.old_price.toFixed(2)}
																		</span>
																	)}
																	<span
																		style={{
																			fontSize: "14px",
																			fontWeight: "500",
																			fontStyle: "normal",
																		}}
																	>
																		{/* {result.currency == "Euro" && "€"} */}
																		{formattedPrice} {currency_text}
																		{/* {result.price && result.price.toFixed(2)} */}
																	</span>
																</div>
																<div
																	className="desct"
																	style={{
																		fontFamily: "Inter",
																		fontSize: "14px",
																		color: "#57616A",
																	}}
																>
																	{result.item_id.description &&
																		result.item_id.description.substring(0, 30)}
																	{result.item_id.description &&
																	result.item_id.description.length > 30
																		? "..."
																		: null}
																</div>
															</div>
														</div>
													) : (
														<div>{result.item_id.name}</div>
													)}
													{/* </a> */}
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return null;
	}
};
export default ScanMenuMenuRecentPopup;
