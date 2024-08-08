import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  CategoryAccordeon as Accordion,
  CategoryTab,
} from "/components/tab/Tab";
// tr
import { useTranslation } from "next-i18next";

const AdScript = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

    // Append script to the head
    document.head.appendChild(script);

    // Define Google Tag Slot after the script loads
    script.onload = () => {
      window.googletag = window.googletag || { cmd: [] };
      window.googletag.cmd.push(function () {
        window.googletag
          .defineSlot(
            "/23008832479/XCY/Ordo_ad_320_50",
            [320, 50],
            "div-gpt-ad-1722430392568-0"
          )
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.pubads().collapseEmptyDivs();
        window.googletag.enableServices();
      });
    };

    // Cleanup script element on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      id="div-gpt-ad-1722430392568-0"
      style={{ width: "100%", height: "50px",boxShadow: "0px 0px 9.7px 0px #0000001A inset"}}
      className="adsBox"
    />
  );
};

export const MenuAfterScanBody = ({ menus, pointData, hideHeader }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const cookies = new Cookies();
  const [accordeonsItems, setAccordeonsItems] = useState({});
  const [closeAccordeonsItems, setCloseAccordeonsItems] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [activeCat, setActiveCat] = useState("");
  const [nipt, setNipt] = useState();
  const [auth, setAuth] = useState();
  const [pageUrl, setPageUrl] = useState();

  const payUpay = async () => {
    const form = document.forms[0];
    const body = {
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    };
    let response;
    response = await axios.post("/token/api/auth/login", body);
    setAuth(response.data.data.token);

    response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/${pointData.company_id}/nipt`
    );
    setNipt(response.data.data.company.ID);

    form.submit();
  };

  // scrolling effect
  const [isScroll, setIsScroll] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      window.scrollY >= 280 ? setIsScroll(true) : setIsScroll(false);
    });
  }, [setIsScroll]);

  var main_categories_shown = [];
  var main_categories = [];

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

    setPageUrl(window.location.href);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  var items = [];
  var sub_categories = [];
  var active_items_list = [];
  var sub_categories_order = {};
  var main_categories_order = {};
  var items_without_category = [];
  var sub_categories_items = {};

  if (menus.items) {
    var obj = accordeonsItems;
    var active_items_list = menus.items.filter((item) => item.active == true);

    var items = [];
    var main_categories = [];
    var sub_categories = [];
    var main_categories_shown = [];
    var items_without_category = [];

    // Sort the active items list by category index
    active_items_list.sort(
      (a, b) => (a.category?.index || 0) - (b.category?.index || 0)
    );

    var main_category_items = active_items_list.map((item, key) => {
      items.push(item);

      if (!main_categories.includes(item.category?.name)) {
        main_categories.push(item.category?.name);
        sub_categories.push([]);
        main_categories_shown.push(true);
      }

      if (
        item.has_subcategory &&
        !sub_categories[main_categories.indexOf(item.category?.name)].includes(
          item.subcategory?.name
        )
      ) {
        sub_categories[main_categories.indexOf(item.category?.name)].push(
          item.subcategory?.name
        );
      }

      if (!item.has_subcategory && item.category) {
        items_without_category.push(item);
      }

      var menu_category = item.menu_category;
      obj[menu_category] =
        accordeonsItems[menu_category] == false ? false : true;
      return true;
    });

    if (activeCat === "") {
      setActiveCat(main_categories[0]);
    }
  }

  main_categories.sort(function (a, b) {
    return main_categories_order[a] - main_categories_order[b];
  });
  // remove null and empty values from the categories
  main_categories = main_categories.filter(function (el) {
    return el != null && el != "";
  });

  sub_categories.map((sub_cat, key) => {
    sub_cat.sort(function (a, b) {
      return sub_categories_order[a] - sub_categories_order[b];
    });
  });

  main_categories_shown[0] = true;

  var all_list = Object.entries(main_categories).map(([key, value]) => {
    var category_item = active_items_list.filter(
      (x) => x.category?.name == value && !x.has_subcategory
    );

    var category_items_sub = active_items_list.filter(
      (x) => x.category?.name == value && x.has_subcategory
    );

    category_items_sub.sort(function (a, b) {
      return a.index - b.index;
    });

    var sub_category = sub_categories[key];

    var items_without_category_filter = items_without_category.filter(
      (x) => x.category?.name == value
    );

    items_without_category_filter.sort(function (a, b) {
      return a.index - b.index;
    });

    if ((activeCat == "" || activeCat == undefined) && main_categories[0]) {
      setActiveCat(main_categories[0]);
    }

    var items_without_category_map = items_without_category_filter.map(
      (index, k2) => {
        return (
          <Card
            key={index.item_id.id}
            image={`${process.env.NEXT_PUBLIC_URL}/${index.item_id.image}`}
            id={index.item_id.id}
            title={index.item_id.name}
            description={index.item_id.description}
            price={index.price.toLocaleString("en-US")}
            old_price={index.old_price}
            currency={pointData.currency}
            menu={menus._id}
            final_price={index.price && index.price.toFixed(2)}
          />
        );
      }
    );
    // console.log("activeItems", active_items_list);
    // console.log("---");
    // console.log("items", items);
    var subs = sub_category.map((sub_c, k) => {
      var sub_items = category_items_sub.map((index, key) => {
        if (index.subcategory?.name == sub_c) {
          return (
            <Card
              key={`${sub_c}-${key}`}
              image={`${process.env.NEXT_PUBLIC_URL}/${index.item_id.image}`}
              id={index.item_id.id}
              title={index.item_id.name}
              description={index.item_id.description}
              price={index.price && index.price.toFixed(2)}
              old_price={index.old_price && index.old_price.toFixed(2)}
              currency={pointData.currency}
              menu={menus._id}
              final_price={index.price && index.price.toFixed(2)}
            />
          );
        }
      });

      return (
        <div
          key={`sub_${k}`}
          style={{
            marginTop: "0px",
            borderBottom: " solid 1px",
            borderColor: "#E4E6E8",
            paddingBottom: "30px",
          }}
          data-spy="scroll"
          data-target="#navbar-example2"
          data-offset="0"
        >
          <Accordion
            title={sub_c}
            id={k}
            onClick={toggle_accordeon}
            open={accordeonsItems[k]}
          />
          {/* subcategories close */}
          {/* {accordeonsItems[k] == true ? (
            <div className="row gutter-gap" style={{ marginTop: "0px" }}>
              {sub_items}
            </div>
          ) : null} */}
          {/* open subcategories */}
          <div className="row gutter-gap" style={{ marginTop: "0px" }}>
            {sub_items}
          </div>
        </div>
      );
    });
    var sub_items_list = [];
    for (const [key, value] of Object.entries(sub_categories_items)) {
      sub_items_list.push(value);
    }
    var sub_items = sub_items_list.map((item_sc, key_sc) => {
      return (
        // <Card
        //   key={item_sc.item_id.id}
        //   // image={`${process.env.NEXT_PUBLIC_URL}/${item_sc.item_id.image}`}
        //   id={item_sc.item_id.id}
        //   title={item_sc.item_id.name}
        //   description={item_sc.item_id.description}
        //   price={item_sc.price}
        //   old_price={item_sc.old_price}
        //   currency={item_sc.currency}
        //   menu={menus._id}
        //   final_price={item_sc.price && item_sc.price.toFixed(2)}
        // />
        <div>yy</div>
      );
    });
    function isClosedAccordeon(value) {
      if (value in closeAccordeonsItems) {
        return closeAccordeonsItems[value];
      } else {
        return false;
      }
    }

    function toggleClosedAccordeon(id) {
      var isClose = true;
      if (id in closeAccordeonsItems) {
        isClose = !closeAccordeonsItems[id];
      }
      setCloseAccordeonsItems({ ...closeAccordeonsItems, [id]: isClose });
    }

    return (
      <div key={key} id={value} className="jump-target">
        <div
        className="menuWrapper"
          style={{
            marginTop: "46px",
            marginBottom: "20px",
          }}
        >
          <Accordion
            title={value}
            id={value}
            onClick={toggleClosedAccordeon}
            open={!isClosedAccordeon(value)}
          />
          {isClosedAccordeon(value) === false ? (
            <div className="row gutter-gap" style={{ marginTop: "0px", gap:"20px", paddingBottom:"14px" }}>
              {items_without_category_map}
              {subs}
              {sub_items}
            </div>
          ) : null}
        </div>
          <AdScript />
      </div>
    );
  });

  return (
    <div id="menu-start">
      <div
        data-spy="scroll"
        className={hideHeader ? "" : "body-rounded pb-0 restaurantMenuListWrapper"}
      >
        <div className="reviewWrapper">
          <h1 className="title">Leave a Review</h1>
          <div className="reviewOptionWrapper">
            {reviewData.map((data, ind) => {
              return (
                <div className="reviewOptionCard" key={ind}>
                  <img src={data.logo} alt={data.company} />
                  <div className="cardText">
                    {data.company}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container p-0">
          {/* Remove comment to reenable the upay header */}
          {/*!hideHeader && (pointData?.country == "AL" || pointData?.country == "Albania") && (
						<div
							// className="upay-payment-div p-3 mb-3"
							className="upay-payment-div p-1 "
							onClick={
								cookies.get("table_name") ? payUpay : () => router.push({ pathname: "/scan-menu" })
							}
						>
							<div className="d-flex">
								<div>
									<svg
										className="mr-12"
										width="64"
										height="64"
										viewBox="10 0 22 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											width="44"
											height="44"
											rx="12"
											fill="white"
										/>
										<path
											d="M16.841 33.1704C18.4437 30.8656 21.0834 23.4712 19.1979 22.2227C17.3124 20.9743 11.4673 26.2561 9.86461 28.5608C8.26193 30.8656 8.54475 33.8426 10.5245 35.091C12.41 36.4354 15.2383 35.5711 16.841 33.1704Z"
											fill="#0776BD"
										/>
										<path
											d="M16.0866 33.0744C17.595 30.8657 20.2347 23.9514 18.4435 22.703C16.6522 21.5506 11.1843 26.6403 9.67584 28.849C8.16744 31.0577 8.35599 33.8427 10.1472 34.995C11.9385 36.1474 14.5782 35.2831 16.0866 33.0744Z"
											fill="#364CA0"
										/>
										<path
											d="M28.6252 30.0973C27.9653 27.7925 24.8542 22.0306 23.063 22.7029C21.2717 23.279 21.5546 30.0013 22.2145 32.306C22.8744 34.6108 24.8542 35.9552 26.6455 35.379C28.3424 34.7068 29.2852 32.4021 28.6252 30.0973Z"
											fill="#2B347A"
										/>
										<path
											d="M28.2481 30.1934C27.6825 27.9847 24.6656 22.6069 23.063 23.0871C21.4603 23.6632 21.7431 30.0013 22.3088 32.2101C22.8744 34.4188 24.7599 35.7632 26.3626 35.187C27.9653 34.6109 28.8138 32.4021 28.2481 30.1934Z"
											fill="#5EC7F0"
										/>
										<path
											d="M30.888 16.5571C28.7197 16.9412 23.5345 18.9579 24.2887 20.3023C25.1372 21.6468 31.5479 21.8388 33.7163 21.5507C35.8846 21.1666 38.2415 18.8618 37.393 17.5174C36.7331 16.0769 33.0563 16.173 30.888 16.5571Z"
											fill="#F15B6B"
										/>
										<path
											d="M31.0763 16.8449C29.0023 17.133 24.0999 19.0536 24.8541 20.302C25.6083 21.5504 31.7363 21.6465 33.8103 21.3584C35.8844 21.0703 38.147 18.7655 37.3928 17.5171C36.6386 16.3647 33.1504 16.5568 31.0763 16.8449Z"
											fill="#FAA731"
										/>
										<path
											d="M27.2112 14.2521C25.7028 16.0767 22.5917 17.5172 21.2719 16.3648C19.952 15.2125 20.8948 11.7553 22.4032 10.0267C23.9116 8.20215 26.1742 7.72199 27.4941 8.9704C28.8139 10.1228 28.7196 12.5236 27.2112 14.2521Z"
											fill="#0F943E"
										/>
										<path
											d="M8.35602 19.246C10.2415 19.9182 17.3122 20.4944 18.4435 19.5341C20.8004 17.5174 15.4267 15.8849 13.4469 15.2127C11.4671 14.5404 8.16747 15.2127 6.94189 16.269C5.81058 17.2293 6.37623 18.5738 8.35602 19.246Z"
											fill="#7B3996"
										/>
										<path
											d="M8.45033 19.1499C10.2416 19.7261 16.7466 20.3023 17.7836 19.438C19.9519 17.6134 14.8611 16.173 13.0698 15.5007C11.2786 14.9245 8.16751 15.5007 7.13047 16.365C6.09344 17.2293 6.65909 18.4777 8.45033 19.1499Z"
											fill="#C14398"
										/>
										<path
											d="M27.0974 13.9802C25.6618 15.7218 22.7007 17.0967 21.4445 15.9968C20.1883 14.8968 21.0856 11.597 22.5213 9.94704C23.9569 8.20546 26.1104 7.74714 27.3666 8.93875C28.6228 10.0387 28.5331 12.3303 27.0974 13.9802Z"
											fill="#2CB45C"
										/>
									</svg>
								</div>

								<div>
									<span className="digital_wallet_span">
										{
											// {cookies.get("table_name")
											//? t("pay_your_order_bill_with_your_upay_wallet")
											//: t("scan_the_qr_code_to_pay_your_order")}
										}
										Paguaj faturën e porosisë tënde me portofolin
									</span>{" "}
									<span
										className="digital_wallet_span"
										id="uPay-p"
									>
										UPay
									</span>
								</div>
								<div>
									<img
										src="/assets/images/icons/btn-arrow-right-content-grey.svg"
										alt=""
									/>
								</div>
							</div>
							<form
								method="post"
								action="https://merchant.upay.al/pay/client"
								target="_blank"
							>
								<input
									className="form-control"
									hidden
									id="URL"
									name="URL"
									value={pageUrl}
								/>
								<input
									className="form-control"
									hidden
									id="MerchantNipt"
									name="MerchantNipt"
									value={nipt}
								/>
								<input
									className="form-control"
									hidden
									id="Authorization"
									name="Authorization"
									value={auth}
								/>
								<input
									className="form-control"
									hidden
									id="Description"
									name="Description"
									value={cookies.get("table_name")}
								/>
							</form>
						</div>
					)*/}

          <div
            style={{
              top: hideHeader && isScroll ? "0px" : "88px",
              // marginBottom: "-136px",
            }}
            className={` ${isScroll ? "category-tab-swiper-scrolling" : ""} `}
          >
            {" "}
            <CategoryTab
              list_obj={main_categories}
              switchCat={switchCat}
              // selectedItem={true}
              selectedItem={activeCat}
              setSelectedItem={setActiveCat}
            />
          </div>
          {all_list}
          {/* {accordeon_list} */}
        </div>
      </div>
    </div>
  );
  function toggle_accordeon(id) {
    setAccordeonsItems({
      ...accordeonsItems,
      [id]: !accordeonsItems[id],
    });
  }

  function switchCat(currentCat) {
    for (let i = 0; i < main_categories.length; i++) {
      main_categories_shown[i] = false;
    }
    main_categories_shown[main_categories.indexOf(currentCat)] = true;
    var tmp_accordeonsItems = accordeonsItems;
    Object.keys(accordeonsItems).forEach((el) => {
      tmp_accordeonsItems[el] = false;
    });
    setAccordeonsItems(tmp_accordeonsItems);

    setActiveCat(currentCat);
    //adjustHeight(150);
    moveCategorySlider(currentCat);
  }

  function adjustHeight(px) {
    setTimeout(() => {
      window.scrollTo(0, window.scrollY - px);
    }, 1000);
  }

  function moveCategorySlider(currentCat) {
    setTimeout(() => {
      let box = document.getElementsByClassName("swiper-slide");
      let widthSum = 0;
      for (var elem of box) {
        if (currentCat == elem.textContent) {
          break;
        } else {
          widthSum +=
            elem.getBoundingClientRect().width +
            elem.style.marginRight.split("px")[0] * 1;
        }
      }

      let slider = document.getElementsByClassName("swiper-wrapper")[0];

      slider.style.transform = "translate3d(-" + widthSum + "px, 0, 0)";
      slider.style.msTransform = "translate3d(-" + widthSum + "px, 0, 0)";
      slider.style.MozTransform = "translate3d(-" + widthSum + "px, 0, 0)";
      slider.style.WebkitTransform = "translate3d(-" + widthSum + "px, 0, 0)";
    }, 1000);
  }
};

const Card = ({
  final_price,
  image,
  title,
  description,
  price,
  old_price,
  currency,
  id,
  menu,
}) => {
  let router = useRouter();
  var currency_text = "";
  if (currency == "Euro" || currency == "EUR" || currency == "€") {
    var currency_text = "€";
  }
  if (currency == "Lek") {
    var currency_text = "Lek";
  }
  if (currency == "Dollar") {
    var currency_text = "$";
  }
  const isMobile = window.innerWidth <= 991;

  const restauranId = router.query.restaurant_id;
  
  return (
    <>
      <div className="col-lg-3" style={{ cursor: "pointer" }}>
        <div
          className="card-after-menu"
          onClick={() =>
            router.push({
              pathname: `/product-details/${id}`,
              query: { restauranId: restauranId, menu: menu },
            })
          }
        >
          {/* <div className="style-of-items-image"> */}
          <div>
            <Image
              src={image ? image : ""}
              alt=""
              height={isMobile ? 64 : 100}
              width={isMobile ? 64 : 100}
              objectFit="cover"
              style={{
                borderRadius: isMobile ? "8px" : "100px",
                borderColor: isMobile ? "#E4E6E8" : "none",
                borderStyle: isMobile ? "solid" : "none",
                borderWidth: isMobile ? "1px" : "none",
              }}
            />
          </div>
          <div>
            <div className="title" style={{ fontSize: "16px" }}>
              {title}
            </div>
            <div className="price" style={{ fontSize: "14px" }}>
              {old_price ? (
                <span className="old">
                  {old_price && old_price.toFixed(2)} {currency_text}
                </span>
              ) : null}{" "}
              {/*  {price} {final_price} {currency_text} */}
              {final_price} {currency_text}
            </div>
            <div className="desc">{description && description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const reviewData = [
  {
    logo: "/assets/images/menu/googleIcon.svg",
    company: "Google",
  },
  {
    logo: "/assets/images/menu/tripAdvisor.svg",
    company: "TripAdvisor",
  },
  {
    logo: "/assets/images/menu/faceBook.svg",
    company: "FaceBook",
  },
  {
    logo: "/assets/images/menu/theFork.svg",
    company: "The Fork",
  },
];
