import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import {GeoLocationContext} from '/context/geoLocationContext'
import { useTranslation } from "next-i18next";
const FindVenues = () => {
  const { location,  } = useContext(GeoLocationContext);
  const [locationName, setLocationName] = useState("")
  const { t } = useTranslation("common");
  useEffect(()=>{
    if (location.type == 'ipapi') {
      setLocationName(`${location.value.city}, ${location.value.country_name}`);
      return
    }
    if (location.type == 'user') {
      setLocationName(`${location.value && location.value.description}`);
      return
    }
    if (location.type == 'coords') {
      setLocationName(`${location.value.city}, ${location.value.country}`);
      return
    }
    setLocationName(`${process.env.NEXT_PUBLIC_CITY}, ${process.env.NEXT_PUBLIC_COUNTRY}`)
  },[location])

  return (
    <div className="border w-100 radius-10 overflow-hidden position-relative venue-map-container mb-36" >

      <figure className="border-bottom" style={{ height:"177px"}}>
        <img src="/assets/images/yellow-location.svg" alt="" />

      </figure>
      <div className="card-content map-card-content px-20 py-16">
        <figure className="card-content-img img-bg-grey img-lg">
          <img src="/assets/images/home/icon-location-grey.svg" alt="" />
        </figure>
        <div className="card-content-info">
          <h3 className="lh-20 mb-0">{t("find_nearest_venues")}</h3>


          <p className="font-14px-20px-400 text-content">
            {locationName}
          </p>
        </div>
      </div>
      <Link href="/search-map-view">
        <a className="stretched-link" />

      </Link>
    </div>
  );
};
export default FindVenues;
