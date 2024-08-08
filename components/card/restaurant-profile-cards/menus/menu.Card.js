import { useRouter } from "next/router";

const MenuCard = ({ name, days, item, duration, available, point_id }) => {
  const router = useRouter()
  
  const dayList = ["Mon", "Tue", "wed", "Thu", "Fri", "Sat", "Sun"];
  
  function formatAMPM(date) {
    var hours = date.getHours();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var hours_text = String(date.getMinutes()).padStart(2, "0");
    var strTime = hours + ":" + hours_text + ampm;
    return strTime;
  }
  var openHour;
  var closeHour;
  var filterHourList = item.availability.filter(x => x.length > 0);
  if (filterHourList.length > 0) {
    if (filterHourList[0].length > 0) {
      openHour = new Date(filterHourList[0][0][0])
    }
    if (filterHourList[filterHourList.length - 1].length > 0) {
      closeHour = new Date(filterHourList[filterHourList.length - 1][0][1])
    }
  }

  var daysText;
  var durationText;
  if (openHour && closeHour) {
    daysText = `${dayList[openHour.getDay()]} - ${dayList[closeHour.getDay()]}`;
    durationText = `${formatAMPM(openHour)} - ${formatAMPM(closeHour)}`;
  }
  return (
    <div
      className="card-content"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "16px",
        filter: available != "True" ? 'grayscale(1)' : ''
      }}
      onClick={() => router.push(`/restaurant-profile/${point_id}/${item._id}`)}
    >
      <figure className={`card-content-img ${ available == "True" && "menu-card-content-img-active"}`}>
        <img src="/assets/images/food-menu-dark-green.svg" alt="" />
      </figure>
      <div
        className="card-content-info "
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "SF-Semi", fontSize: "16px"
        }}
      >
        <div className="d-flex" style={{ gap: '16px' }}>
          <h5>{name}</h5>
          <div className="card-content-badge d-flex">
            {available == "True" ? (
              <span className="badge-style-1" style={{ fontWeight: 'normal' }}>Active</span>
            ) : (
              <>
                {item.extra_available == true && (
                  <span className="badge-style-yellow">
                    Extra: {item.extra_price}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <ul
          className="card-content-lists "
          style={{
            display: "flex",
          }}
        >
          {/* <li>{hours_list.map((item, i) => )}</li> */}
          <li style={{ fontFamily: "SF-Regular", fontSize: "13px" }}>{daysText}</li>
          <li style={{ fontFamily: "SF-Regular", fontSize: "13px" }}>{durationText}</li>
        </ul>
      </div>
      <div className="card-content-arrow">
        <img src="/assets/images/icons/card-content-arrow.svg" alt="" />
      </div>
      {/* <a
        href={`/restaurant-profile/${point_id}/${item._id}`}
        className="stretched-link"
      /> */}
    </div>
  );
};
export default MenuCard;
