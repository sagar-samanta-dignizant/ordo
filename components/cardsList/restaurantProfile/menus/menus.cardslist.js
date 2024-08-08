import React from "react";
import MenuCard from "/components/card/restaurant-profile-cards/menus/menu.Card";

const MenusCardlist = (props) => {
  const takeawayMenus = [];
  const otherMenus = [];

  if (props.data.menus) {
    props.data.menus.forEach((item,index) => {
      if (item.published) {
        const menuCard = (
          <>
            <MenuCard
              key={item._id}
              item={item}
              name={item.name}
              available={item.available}
              point_id={props.data._id}
            />
            {(props.data.menus.length - 1 !== index && props.data.menus.length < 1) && <hr style={{margin: 0}} />}
          </>
        );

        if (item.is_takeaway) {
          takeawayMenus.push(menuCard);
        } else {
          otherMenus.push(menuCard);
        }
      }
    });
  }

  return (
    <div className="mb-20 menu-list">
      <h2 className="mb-12 px-20" style={{ fontFamily: "SF-Semi", fontSize: "20px" }}>
        Menus
      </h2>

      <div className="card-list-group-100 info px-20">
        {otherMenus.length > 0 && (
          <div className="card mb-16 p-0">
            {otherMenus}
          </div>
        )}
        {takeawayMenus.length > 0 && (
          <div className="card mb-16 p-0">
            {takeawayMenus}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenusCardlist;
