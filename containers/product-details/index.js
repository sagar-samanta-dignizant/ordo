import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import CustomIcon from "../../components/AllergensIcons";
import Header from "./profile-details.header";
import { ModalItem as Modal } from "/components/modal";
import { CategoryAccordeon as Accordion, ProductInfoTab } from "/components/tab/Tab";
import { GeoLocationContext } from "/context/geoLocationContext";
import { UserContext } from "/context/searchListViewContext";
export const ProductDetails = ({ id, setHeaderImageMobile }) => {
	const [accordeonsItems, setAccordeonsItems] = useState({});
	const [mobileView, setMobileView] = useState(false);
	const [openAllergensModal, setOpenAllergensModal] = useState(false);
	const [allergensModalData, setAllergensModalData] = useState({});
	const { openInfo, setOpenInfo } = useContext(UserContext);
	const { location } = useContext(GeoLocationContext);
	// const [openCustomizersModal, setOpenCustomizersModal] = useState(false)
	const [customizersModals, setCustomizersModals] = useState([]);
	const [activeCustomizer, setActiveCustomizer] = useState(false);
	const [cacheCustomizer, setCacheCustomizer] = useState({});
	const [data, setData] = useState();
	const [item, setItem] = useState();
	const [image1, setImage1] = useState();

	const router = useRouter();

	const getData = () => {
		const urlParams = router.query;
		var menu_id = urlParams.menu;

		var url = process.env.NEXT_PUBLIC_API_URL;

		fetch(`${url}/items/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson.data);
				if (myJson.data && myJson.data.items) {
					setHeaderImageMobile(myJson.data.items.image);
				}
			});

		fetch(`${url}/menus/${menu_id}/item/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setItem(myJson.item);
			});
	};

	useEffect(() => {
		if (window.innerWidth > 991) {
			setMobileView(false);
		} else if (window.innerWidth < 991) {
			setMobileView(true);
		}
		const handleResize = () => {
			if (window.innerWidth > 991) {
				setMobileView(false);
			} else if (window.innerWidth < 991) {
				setMobileView(true);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		getData();
	}, [router]);
	// console.log("menu_id", menu_id);
	if (data == null || item == null) {
		return null;
	}
	var currency_text = "";
	if (item.currency == "Euro" || item.currency == "EUR" || item.currency == "€") {
		var currency_text = "€";
	} else if (item.currency == "Lek") {
		var currency_text = "Lek";
	} else if (item.currency == "dollar") {
		var currency_text = "$";
	} else {
		var currency_text = item.currency;
	}
	//Sizes
	// console.log(currency_text);
	if (item?.sizes) {
		var sizes_list = item.sizes.map((size, key) => {
			return (
				<div
					className="customizer-item"
					key={"sizes" + key}
				>
					<div className="customizer-item-title">{size.name}</div>
					<div className="customizer-item-item">
						{/* +{currency_text} {size.final_price && size.final_price.toFixed(2)} */}
						{size.final_price && size.final_price.toFixed(2)} {currency_text}
					</div>
				</div>
			);
		});

		var size_container = (
			<div
				key={"size-key"}
				style={{ marginTop: "30px" }}
			>
				<Accordion
					title={"Size"}
					id={"Size"}
					onClick={toggle_accordeon}
					open={!(accordeonsItems["Size"] == false)}
					slug="product-details"
				/>
				<hr />
				{accordeonsItems["Size"] != false ? (
					<div className="row gutter-gap">{sizes_list}</div>
				) : null}
				{/* <div>{sizes_list}</div> */}
			</div>
		);
	}
	// console.log("data", data.items);
	// console.log("currency", data.items.currency);
	// Customizers

	if (data.items.customizers) {
		var customizers_list = data.items.customizers.map((customizer, key) => {
			var mini_customizers_list;
			if (customizer.customizers_list) {
				mini_customizers_list = customizer.customizers_list.map((mini_customizer, key) => {
					return (
						<div
							className="customizer-item"
							key={mini_customizer + key}
							onClick={() => requestModalForItem(mini_customizer)}
						>
							<div className="customizer-item-title">{mini_customizer.customizer_id.name}</div>
							<div className="customizer-item-icon-arrow"></div>
						</div>
					);
				});
			}
			var mini_items_list;

			if (customizer.items_list) {
				mini_items_list = customizer.items_list.map((mini_item, key) => {
					return (
						<div
							className="customizer-item"
							key={mini_item + key}
						>
							<div className="customizer-item-title">{mini_item.item_id.name}</div>
							<div className="customizer-item-item">
								{`+${mini_item.price && mini_item.price.toFixed(2)} ${currency_text}`}
							</div>
						</div>
					);
				});
			}

			var mini_ingredients_list;
			if (customizer.ingredients_list) {
				mini_ingredients_list = customizer.ingredients_list.map((mini_item, key) => {
					return (
						<div
							className="customizer-item"
							key={mini_item + key}
						>
							<div className="customizer-item-title">{mini_item.name}</div>
							<div className="customizer-item-item">
								{" "}
								${currency_text} {mini_item.price && mini_item.price.toFixed(2)}
							</div>
						</div>
					);
				});
			}

			return (
				<div
					key={key}
					style={{ marginTop: "20px" }}
				>
					<Accordion
						key={key + customizer.name}
						title={customizer.name}
						id={customizer.name}
						onClick={toggle_accordeon}
						open={!accordeonsItems[customizer.name]}
					/>
					{accordeonsItems[customizer.name] != true ? (
						<div>
							{/* {customizers_options_list} */}
							{mini_customizers_list}
							{mini_items_list}
							{mini_ingredients_list}
						</div>
					) : null}
				</div>
			);
		});

		var customizers_modal_content = customizersModals.map((item, key) => {
			return (
				<div key={key}>
					<CustomizersModal
						// setOpenCustomizersModal={setOpenCustomizersModal}
						show={item.id == activeCustomizer.id}
						item={item}
						requestModalForItem={(item) => requestModalForItem(item)}
						closeCustomizersModal={(item) => closeCustomizersModal(item)}
					/>
				</div>
			);
		});
	}

	// Calcolating the calories of an item based on its ingredients
	var itemCalories = 0;
	data.ingredients?.forEach((ingredient) => {
		itemCalories += ingredient.calories;
	});

	return (
		<>
			<div className="body-rounded productInfoWrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							{/* image1 */}

							<div className="hideOnMobile">
								{data.items.image && (
									<Image
										src={data.items.image ? data.items.image : ""}
										width={"520px"}
										height={"568px"}
										objectFit={"cover"}
									/>
								)}
							</div>
						</div>
						<div className="col-lg-9 px-20 pt-20">
							<div className="product-details-info-container">
								<div style={{ flex: "1" }}>
									<div className="product-details-title"> {data.items.name}</div>
									<div
										className=" hide-on-mobile product-details-desc"
										style={{ marginTop: "20px" }}
									>
										{data.items.description}
									</div>
								</div>
								<div
									className="d-flex"
									style={{ marginTop: "14.5px" }}
								>
									<div className="profile-details-calories">
										{itemCalories ? itemCalories / 1000 : "-"}{" "}
										<span className="profile-details-calories-light">Cal</span>
									</div>
									<div
										className="profile-details-allergens"
										onClick={() => toggle_allergens({ id: "Allergens" })}
									>
										View Allergens
									</div>
								</div>

								{ data.items.description && <div
									className=" hide-on-desktop product-details-desc"
									style={{ marginTop: "20.5px" }}
								>
									{data.items.description}
								</div>}
							</div>
							{size_container}
							{customizers_list}
						</div>
					</div>
					{openAllergensModal ? (
						<AllergensModal
							mobileView={mobileView}
							openAllergensModal={openAllergensModal}
							setOpenAllergensModal={setOpenAllergensModal}
							productData={data.items.allergenes}
						/>
					) : null}

					{openInfo ? (
						<ProductInfoModal
							setOpenInfoModal={setOpenInfo}
							items_data={data.items}
						/>
					) : null}
					{/* {openCustomizersModal ? (<CustomizersModal setOpenCustomizersModal={setOpenCustomizersModal} item={activeCustomizer}/>) : null } */}
					{customizers_modal_content}
				</div>
			</div>
		</>
	);
	function toggle_accordeon(id) {
		var toggle = accordeonsItems[id] != false ? false : true;
		setAccordeonsItems({
			...accordeonsItems,
			[id]: !accordeonsItems[id],
		});
	}

	function requestModalForItem(item = {}) {
		// Should Fetch data

		setCacheCustomizer(activeCustomizer);
		setActiveCustomizer(item);
		setCustomizersModals([...customizersModals, item]);
	}

	function closeCustomizersModal(item = {}) {
		var list = customizersModals.filter((i) => i.id != item.id);
		setCustomizersModals(list);
		setActiveCustomizer(cacheCustomizer);
	}

	function toggleInfoModal() {
		setOpenInfoModal(!openInfoModal);
	}

	function toggle_allergens(item = {}) {
		setAllergensModalData(item);
		setOpenAllergensModal(!openAllergensModal);
	}
};
export default ProductDetails;
export const ProfileHeader = Header;
const CustomizersModal = ({ item, show, closeCustomizersModal, requestModalForItem }) => {
	const [customizerData, setcustomizerData] = useState(null);
	const [customizer, setCustomizer] = useState({});
	if (!show && customizerData) {
		return null;
	}
	const [accordeonsItems, setAccordeonsItems] = useState({});

	const getData = () => {
		var url = process.env.NEXT_PUBLIC_API_URL;

		fetch(`${url}/customizers/${item.customizer_id._id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				if (myJson.data && myJson.data.customizers) {
					setCustomizer(myJson.data.customizers);
				}
			});
	};

	useEffect(() => {
		getData();
	}, [item]);

	var mini_customizers_list;

	if (customizer.customizers_list) {
		mini_customizers_list = customizer.customizers_list.map((mini_customizer, key) => {
			return (
				<div
					className="customizer-item"
					key={mini_customizer + key}
					onClick={() => requestModalForItem(mini_customizer)}
				>
					<div className="customizer-item-title">{mini_customizer.customizer_id.name}</div>
					<div className="customizer-item-icon-arrow"></div>
				</div>
			);
		});
	}
	var mini_items_list;
	if (customizer.items_list) {
		mini_items_list = customizer.items_list.map((mini_item, key) => {
			return (
				<div
					className="customizer-item"
					key={mini_item + key}
				>
					<div className="customizer-item-title">{mini_item.item_id.name}</div>
					<div className="customizer-item-item">
						{" "}
						{`+ ${mini_item.price && mini_item.price.toFixed(2)}`}
					</div>
				</div>
			);
		});
	}
	var mini_ingredients_list;
	if (customizer.ingredients_list) {
		mini_ingredients_list = customizer.ingredients_list.map((mini_item, key) => {
			return (
				<div
					className="customizer-item"
					key={mini_item + key}
				>
					<div className="customizer-item-title">{mini_item.name}</div>
					<div className="customizer-item-item">{`+${
						mini_item.price && mini_item.price.toFixed(2)
					} ${currency_text}`}</div>
				</div>
			);
		});
	}
	var customizers_list;
	if (customizer) {
		customizers_list = (
			<div
				key={customizer.name}
				style={{ marginTop: "20px" }}
			>
				<Accordion
					key={customizer.name}
					title={customizer.name}
					id={customizer.name}
					onClick={toggle_accordeon}
					open={accordeonsItems[customizer.name]}
				/>
				{accordeonsItems[customizer.name] == true ? (
					<div>
						{/* {customizers_options_list} */}
						{mini_customizers_list}
						{mini_items_list}
						{mini_ingredients_list}
					</div>
				) : null}
			</div>
		);
	}

	return (
		<>
			<div className="full-screen-modal-mobile">
				<Modal
					show={true}
					closeAction={() => {
						closeCustomizersModal(item);
					}}
					closeIconColor={"#FCCE00"}
				>
					{/* <Modal.Head title={item.name} /> */}
					<Modal.Head title={"Add customizer"} />
					<hr />
					<Modal.Body>{customizers_list}</Modal.Body>
				</Modal>
			</div>
		</>
	);

	function toggle_accordeon(id) {
		setAccordeonsItems({
			...accordeonsItems,
			[id]: !accordeonsItems[id],
		});
	}
};
const AllergensModal = ({ mobileView, openAllergensModal, setOpenAllergensModal, productData }) => {
	const { t, i18n } = useTranslation("common");
	var allergensBody = (
		<div className="row">
			{productData.map((item, key) => {
				return (
					<div
						className="card-content mb-20 col-lg-6"
						key={key}
					>
						<figure
							className="card-content-img full-img"
							style={{ backgroundColor: "unset" }}
						>
							<CustomIcon type={item.toLowerCase()} />
						</figure>

						<div className="card-content-info">
							<h5 className="m-0">{item}</h5>
						</div>
					</div>
				);
			})}
		</div>
	);

	return (
		<>
			{mobileView ? (
				<BottomSheet
					open={openAllergensModal}
					className="bottom-sheet top-line"
					onDismiss={() => setOpenAllergensModal(false)}
				>
					<div className="offcanvas-body px-24">
						<div className="container p-0">
							<div className="mb-32">
								<h1 className="modal-h1 mb-2">{t("allergens_used")}</h1>
								<p className="font-16px-24px-400 letter">{t("allergenes_used_description")}</p>
							</div>
							<div className="clearfix">{allergensBody}</div>
						</div>
					</div>
				</BottomSheet>
			) : (
				<Modal
					show={openAllergensModal}
					closeAction={() => {
						setOpenAllergensModal(false);
					}}
					style={{ minWidth: "850px" }}
				>
					<Modal.Head title="Allergens Used" />
					<hr />
					<Modal.Body>{allergensBody}</Modal.Body>
				</Modal>
			)}
		</>
	);
};
const ProductInfoModal = ({ setOpenInfoModal, items_data }) => {
	const [activeKey, setActiveKey] = useState(0);
	var items = [
		{ key: 0, name: "Ingredients" },
		{ key: 1, name: "Nutrition" },
	];

	console.log('items_data :>> ', items_data.sizes[0].ingredients);

	var nutrientValues = initializeNutritionalValues(items_data.sizes[0].ingredients);
	var nutrientPercentages = initializeNutritionalPercentages(nutrientValues);

	var nutrionContent = (
		<>
			<NutritionValueCard
				nutrientValues={nutrientValues}
				nutrientPercentages={nutrientPercentages}
			/>
			<h3>Nutrient Fact</h3>
			<div style={{ display: "flex" }}>
				<div
				className="nutrientText"
					style={{
						flex: 1,
						fontWeight: "500",
						fontSize: "13px",
					}}
				>
					Values per specified service size
				</div>
				<div className="nutrientText" style={{ fontWeight: "700", fontSize: "13px" }}>% Daily Value*</div>
			</div>

			<div className="product-information-category-container mt-3">
				{/* <div className="product-information-subdesc">Ac curabitur condimentum</div> */}
				<div className="product-information-category">
					<div className="product-information-category-text">Calories</div>
					<div className="product-information-category-value">
						{nutrientValues.calories ? nutrientValues.calories.toFixed(0) : 0}
						cal
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.calories && nutrientPercentages.calories.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Energy (kj)</div>
					<div className="product-information-category-value">
						{nutrientValues.energy ? nutrientValues.energy : 0}kj
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.energy && nutrientPercentages.energy.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Total Fat</div>
					<div className="product-information-category-value">{nutrientValues.total_fat}g</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.total_fat && nutrientPercentages.total_fat.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Saturated Fat</div>
					<div className="product-information-category-value">
						{nutrientValues.saturated_fat ? nutrientValues.saturated_fat : 0}g
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.saturated_fat && nutrientPercentages.saturated_fat.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Trans Fat</div>
					<div className="product-information-category-value">
						{nutrientValues.trans_fat ? nutrientValues.trans_fat : 0}g
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.trans_fat && nutrientPercentages.trans_fat.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Cholesterol</div>
					<div className="product-information-category-value">
						{nutrientValues.cholesterol ? nutrientValues.cholesterol.toFixed(0) : 0}
						mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.cholesterol && nutrientPercentages.cholesterol.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Sodium</div>
					<div className="product-information-category-value">
						{nutrientValues.sodium ? nutrientValues.sodium.toFixed(0) : 0}
						mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.sodium && nutrientPercentages.sodium.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Total Carbohydrate</div>
					<div className="product-information-category-value">
						{nutrientValues.total_carbohydrates ? nutrientValues.total_carbohydrates.toFixed(0) : 0}
						mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.total_carbohydrates &&
							nutrientPercentages.total_carbohydrates.toFixed(1)}
						%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Dietary Fiber</div>
					<div className="product-information-category-value">
						{nutrientValues.dietary_fiber ? nutrientValues.dietary_fiber : 0}g
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.dietary_fiber && nutrientPercentages.dietary_fiber.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Total Sugars</div>
					<div className="product-information-category-value">
						{nutrientValues.total_sugar ? nutrientValues.total_sugar : 0}g
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.total_sugar && nutrientPercentages.total_sugar.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Protein</div>
					<div className="product-information-category-value">
						{nutrientValues.protein ? nutrientValues.protein.toFixed(0) : 0}g
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.protein && nutrientPercentages.protein.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category">
					<div className="product-information-category-text">Vitamins</div>
				</div>

				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Vitamin A</div>
					<div className="product-information-category-value">
						{nutrientValues.vitamin_A ? nutrientValues.vitamin_A : 0}mcg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.vitamin_A && nutrientPercentages.vitamin_A.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Vitamin B</div>
					<div className="product-information-category-value">
						{nutrientValues.vitamin_B ? nutrientValues.vitamin_B : 0}mcg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.vitamin_B && nutrientPercentages.vitamin_B.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Vitamin C</div>
					<div className="product-information-category-value">
						{nutrientValues.vitamin_C ? nutrientValues.vitamin_C : 0}mcg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.vitamin_C && nutrientPercentages.vitamin_C.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Vitamin D</div>
					<div className="product-information-category-value">
						{nutrientValues.vitamin_D ? nutrientValues.vitamin_D : 0}mcg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.vitamin_D && nutrientPercentages.vitamin_D.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Calcium</div>
					<div className="product-information-category-value">
						{nutrientValues.calcium ? nutrientValues.calcium : 0}mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.calcium && nutrientPercentages.calcium.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Iron</div>
					<div className="product-information-category-value">
						{nutrientValues.iron ? nutrientValues.iron : 0}mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.iron && nutrientPercentages.iron.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Potassium</div>
					<div className="product-information-category-value">
						{nutrientValues.potassium ? nutrientValues.potassium : 0}mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.potassium && nutrientPercentages.potassium.toFixed(1)}%
					</div>
				</div>
				<div className="product-information-category subcategory">
					<div className="product-information-category-text">Magnesium</div>
					<div className="product-information-category-value">
						{nutrientValues.magnesium ? nutrientValues.magnesium : 0}mg
					</div>
					<div className="product-information-category-desc">
						{nutrientPercentages.magnesium && nutrientPercentages.magnesium.toFixed(1)}%
					</div>
				</div>

				<div
					className="product-information-paragraph-text"
				>
					*The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to
					a daily diet. 2,000 calories a day is used for general nutrition advice. ** One serving
					adds 17g of sugar to your diet and represents 34% of the Daily Value for Added Sugars.
				</div>
			</div>
		</>
	);

	var ingredientContent = (
		<>
			<div className="row product-info-ingredient-row">
				<div className="col-lg-6">
					<h6 className="mb-10">Ingredients</h6>

					{items_data.sizes[0].ingredients.map((ingredient, key) => {
						return (
							<div
								className="card-content mb-20 col-lg-6"
								key={`ingredients-${key}`}
							>
								<figure className="card-content-img full-img">
									<img
										src={ingredient.ingredient_id.image}
										alt=""
									/>
								</figure>
								<div className="card-content-info">
									<h5 className="m-0">{ingredient.ingredient_id.name}</h5>
								</div>
							</div>
						);
					})}
				</div>
				<div className="col-lg-6">
					<h6 className="mb-10 mt-3">Allergens</h6>

					{items_data.allergenes.map((item, key) => {
						return (
							<div
								className="card-content mb-20 col-lg-6"
								key={`allergens-${key}`}
							>
								<figure className="card-content-img full-img">
									<CustomIcon type={item.toLowerCase()} />
								</figure>
								<div className="card-content-info">
									<h5 className="m-0">{item}</h5>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
	return (
		<>
			<div className="full-screen-modal-mobile no_mobile_br">
				<Modal
					show={true}
					closeAction={() => {
						setOpenInfoModal();
					}}
				>
					<Modal.Head title="Product Information" />
					<Modal.Body>
						<ProductInfoTab
							items={items}
							activeKey={activeKey}
							setActiveKey={setActiveKey}
						/>
						{activeKey == 0 ? ingredientContent : nutrionContent}
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};
const NutritionValueCard = ({ nutrientValues, nutrientPercentages }) => {
	var total_grams =
		(nutrientPercentages.total_carbohydrates || 0) +
		(nutrientPercentages.protein || 0) +
		(nutrientPercentages.total_fat || 0);
	var carbs_percentage = (nutrientPercentages.total_carbohydrates / total_grams) * 100;
	var protein_percentage = (nutrientPercentages.protein / total_grams) * 100;
	var fat_percentage = (nutrientPercentages.total_fat / total_grams) * 100;

	return (
		<>
			<div className="card nutrition-card p-0 my-30">
				<div className="nutrition-card-head">
					<h4 className="m-0">Calories</h4>
					<h4 className="mb-0">
						{nutrientValues.calories ? nutrientValues.calories.toFixed(1) : 0} Calories
					</h4>
				</div>
				<div
					style={{ height: 10 }}
					className="progress nutrition-progress"
				>
					<div
						className="progress-bar bg-light-red"
						role="progressbar"
						style={{ width: `${carbs_percentage}%` }}
						aria-valuenow={nutrientPercentages.total_carbohydrates}
						aria-valuemin={0}
						aria-valuemax={100}
					/>

					<div
						className="progress-bar bg-light-yellow"
						role="progressbar"
						style={{ width: `${protein_percentage}%` }}
						aria-valuenow={nutrientPercentages.protein}
						aria-valuemincarbs={0}
						aria-valuemax={100}
					/>
					<div
						className="progress-bar bg-light-blue"
						role="progressbar"
						style={{ width: `${fat_percentage}%` }}
						aria-valuenow={nutrientPercentages.total_fat}
						aria-valuemin={0}
						aria-valuemax={100}
					/>
				</div>
				<div className="nutrition-progress-bottom">
					<h5>
						Carbs <span className="text-light-red">({nutrientValues.total_carbohydrates}g)</span>
					</h5>
					<h5>
						Protein <span className="text-light-yellow">({nutrientValues.protein}g)</span>
					</h5>
					<h5>
						Fat <span className="text-light-blue">({nutrientValues.total_fat}g)</span>
					</h5>
				</div>
			</div>
		</>
	);
};
export const HeaderImage = ({ id }) => {
	const [data, setData] = useState();
	const [item, setItem] = useState();
	const [image1, setImage1] = useState();

	const router = useRouter();

	const getData = () => {
		const urlParams = router.query;
		var menu_id = urlParams.menu;

		var url = process.env.NEXT_PUBLIC_API_URL;

		fetch(`${url}/items/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setData(myJson.data);
			});
		// console.log("22",menu_id);
		fetch(`${url}/menus/${menu_id}/item/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setItem(myJson.item);
			});
	};

	useEffect(() => {
		getData();
		// console.log("getData");
	}, []);

	if (data == null) {
		return null;
	}

	return (
		<>
			{data.items.image && (
				// <Image
				//   src={data.items.image ? data.items.image : ""}
				//   // width={"100%"}
				//   // height={"100%"}
				// />
				<Image src={data.items.image} />
			)}
		</>
	);
};
export function initializeNutritionalValues(ingredients) {
	let nutVal = {
		added_sugar: 0,
		calcium: 0,
		calories: 0,
		total_carbohydrates: 0,
		cholesterol: 0,
		dietary_fiber: 0,
		energy: 0,
		iron: 0,
		magnesium: 0,
		potassium: 0,
		protein: 0,
		saturated_fat: 0,
		sodium: 0,
		total_fat: 0,
		total_sugar: 0,
		trans_fat: 0,
		vitamin_A: 0,
		vitamin_B: 0,
		vitamin_C: 0,
		vitamin_D: 0,
	};

	ingredients.forEach((ingredient) => {
		nutVal.added_sugar += ingredient?.added_sugar ? ingredient?.added_sugar : 0;
		nutVal.calcium += ingredient?.calcium ? ingredient?.calcium : 0;
		nutVal.calories += ingredient?.calories ? ingredient?.calories : 0;
		nutVal.total_carbohydrates += ingredient?.total_carbohydrates
			? ingredient?.total_carbohydrates
			: 0;
		nutVal.cholesterol += ingredient?.cholesterol ? ingredient?.cholesterol : 0;
		nutVal.dietary_fiber += ingredient?.dietary_fiber ? ingredient?.dietary_fiber : 0;
		nutVal.energy += ingredient?.energy ? ingredient?.energy : 0;
		nutVal.iron += ingredient?.iron ? ingredient?.iron : 0;
		nutVal.magnesium += ingredient?.magnesium ? ingredient?.magnesium : 0;
		nutVal.potassium += ingredient?.potassium ? ingredient?.potassium : 0;
		nutVal.protein += ingredient?.protein ? ingredient?.protein : 0;
		nutVal.saturated_fat += ingredient?.saturated_fat ? ingredient?.saturated_fat : 0;
		nutVal.sodium += ingredient?.sodium ? ingredient?.sodium : 0;
		nutVal.total_fat += ingredient?.total_fat ? ingredient?.total_fat : 0;
		nutVal.total_sugar += ingredient?.total_sugar ? ingredient?.total_sugar : 0;
		nutVal.trans_fat += ingredient?.trans_fat ? ingredient?.trans_fat : 0;
		nutVal.vitamin_A += ingredient?.vitamin_A ? ingredient?.vitamin_A : 0;
		nutVal.vitamin_B += ingredient?.vitamin_B ? ingredient?.vitamin_B : 0;
		nutVal.vitamin_C += ingredient?.vitamin_C ? ingredient?.vitamin_C : 0;
		nutVal.vitamin_D += ingredient?.vitamin_D ? ingredient?.vitamin_D : 0;
	});
	return nutVal;
}
export function initializeNutritionalPercentages(nutritionalValues) {
	const nutritionalValuesPerDay = {
		calories: 2000,
		protein: 112,
		total_carbohydrate: 249,
		dietary_fiber: 37,
		total_sugars: 77,
		total_fat: 62,
		saturated_fat: 12,
		trans_fat: 0,
		cholesterol: 170,
		sodium: 2240,
	};

	let nutVal = {};
	nutVal.calories = Math.round(100 * nutritionalValues.calories) / nutritionalValuesPerDay.calories;
	nutVal.energy = Math.round(100 * nutritionalValues.energy) / nutritionalValuesPerDay.energy;
	nutVal.total_fat =
		Math.round(100 * nutritionalValues.total_fat) / nutritionalValuesPerDay.total_fat;
	nutVal.calcium = Math.round(100 * nutritionalValues.calcium) / nutritionalValuesPerDay.calcium;
	nutVal.saturated_fat =
		Math.round(100 * nutritionalValues.saturated_fat) / nutritionalValuesPerDay.saturated_fat;
	nutVal.trans_fat =
		Math.round(100 * nutritionalValues.trans_fat) / nutritionalValuesPerDay.trans_fat;
	nutVal.cholesterol =
		Math.round(100 * nutritionalValues.cholesterol) / nutritionalValuesPerDay.cholesterol;
	nutVal.sodium = Math.round(100 * nutritionalValues.sodium) / nutritionalValuesPerDay.sodium;
	nutVal.total_carbohydrates =
		Math.round(100 * nutritionalValues.total_carbohydrates) /
		nutritionalValuesPerDay.total_carbohydrate;
	nutVal.dietary_fiber =
		Math.round(100 * nutritionalValues.dietary_fiber) / nutritionalValuesPerDay.dietary_fiber;
	nutVal.total_sugar =
		Math.round(100 * nutritionalValues.total_sugar) / nutritionalValuesPerDay.total_sugars;
	nutVal.protein = Math.round(100 * nutritionalValues.protein) / nutritionalValuesPerDay.protein;
	nutVal.vitamin_A =
		Math.round(100 * nutritionalValues.vitamin_A) / nutritionalValuesPerDay.vitamin_A;
	nutVal.vitamin_B =
		Math.round(100 * nutritionalValues.vitamin_B) / nutritionalValuesPerDay.vitamin_B;
	nutVal.vitamin_C =
		Math.round(100 * nutritionalValues.vitamin_C) / nutritionalValuesPerDay.vitamin_C;
	nutVal.vitamin_D =
		Math.round(100 * nutritionalValues.vitamin_D) / nutritionalValuesPerDay.vitamin_D;
	nutVal.calcium = Math.round(100 * nutritionalValues.calcium) / nutritionalValuesPerDay.calcium;
	nutVal.iron = Math.round(100 * nutritionalValues.iron) / nutritionalValuesPerDay.iron;
	nutVal.potassium =
		Math.round(100 * nutritionalValues.potassium) / nutritionalValuesPerDay.potassium;
	nutVal.magnesium =
		Math.round(100 * nutritionalValues.magnesium) / nutritionalValuesPerDay.magnesium;
	return nutVal;
}
