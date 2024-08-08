import { createContext, useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import Cookies from "universal-cookie";

export const GeoLocationContext = createContext();

const GeoLocationProvider = (props) => {
  const [location, setLocation] = useState({ type: "" });
  const [defaultLocation, setDefaultLocation] = useState({ type: "" });
  const [nation, setNation] = useState(null);
  const cookies = new Cookies();
  const operatingList = ["DE", "AL", "HR", "AL"];

  const onSuccess = (location) => {
    configureLocation(location);
  };

  const onError = (error) => {
    configureLocation();
  };

  useEffect(() => {
    if (cookies.get("location")) {
      var location_obj = cookies.get("location");
      if (
        location_obj &&
        location_obj.value &&
        location_obj.value.country &&
        operatingList.includes(location_obj.value.country)
      ) {
        setLocation(location_obj);
      } else {
        var env_obj = {
          type: "env",
          value: {
            city: process.env.NEXT_PUBLIC_CITY,
            country: process.env.NEXT_PUBLIC_COUNTRY,
            description: `${process.env.NEXT_PUBLIC_CITY} ${process.env.NEXT_PUBLIC_COUNTRY}`,
            latitude: process.env.NEXT_PUBLIC_LATITUDE,
            longitude: process.env.NEXT_PUBLIC_LONGITUDE,
          },
        };
        setLocation(env_obj);
        var location_string = JSON.stringify(env_obj);
        cookies.set("location", location_string, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 120),
        });
      }
      if (location_obj && location_obj.value && location_obj.value.country) {
        setNation(location_obj.value && location_obj.value.country);
      } else {
        setNation(process.env.NEXT_PUBLIC_NATION);
      }
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    if (cookies.get("current_location")) {
      var current_location_obj = cookies.get("current_location");
      if (
        current_location_obj &&
        current_location_obj.value &&
        current_location_obj.value.country &&
        operatingList.includes(current_location_obj.value.country)
      ) {
        setDefaultLocation(current_location_obj);
      } else {
        var env_obj = {
          type: "env",
          value: {
            city: process.env.NEXT_PUBLIC_CITY,
            country: process.env.NEXT_PUBLIC_COUNTRY,
            description: `${process.env.NEXT_PUBLIC_CITY} ${process.env.NEXT_PUBLIC_COUNTRY}`,
            latitude: process.env.NEXT_PUBLIC_LATITUDE,
            longitude: process.env.NEXT_PUBLIC_LONGITUDE,
          },
        };
        setDefaultLocation(env_obj);
        var location_string = JSON.stringify(env_obj);
        cookies.set("current_location", location_string, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 120),
        });
      }
    }

    if (cookies.get("nation")) {
      setNation(cookies.get("nation"));
    } else {
      setNation(process.env.NEXT_PUBLIC_NATION);
    }
  }, []);

  const updateUserLocation = (new_location) => {
    setLocation(new_location);
    var location_string = JSON.stringify(new_location);
    cookies.set("location", location_string, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 120),
    });
  };

  const updateUserNation = (new_nation) => {
    setNation(new_nation);
    cookies.set("nation", new_nation, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 120),
    });
  };

  const getLocationChipsName = () => {
    if (
      location.type == "ipapi" &&
      location.value.city &&
      location.value.country
    ) {
      return `${location.value.city}, ${location.value.country}`;
    }
    if (location.type == "user") {
      return `${location.value.description}`;
    }
    if (location.type == "coords") {
      return `${location.value.city}, ${location.value.country}`;
    }
    // return `${process.env.NEXT_PUBLIC_CITY}, ${process.env.NEXT_PUBLIC_NATION}`;
  };

  const getLocationParamsFromCurrentLocation = () => {
    // if (location.type == "user") {
    //   return {
    //     latitude: location.value.latitude,
    //     longitude: location.value.longitude,
    //   };
    // }
    if (location.type == "coords") {
      return {
        latitude: location.value.latitude,
        longitude: location.value.longitude,
      };
    }
    if (
      location.type == "ipapi" &&
      location.value.city &&
      location.value.country
    ) {
      return {
        latitude: location.value.latitude,
        longitude: location.value.longitude,
      };
    }
    // return {
    //   latitude: process.env.NEXT_PUBLIC_LATITUDE,
    //   longitude: process.env.NEXT_PUBLIC_LONGITUDE,
    // };
  };

  return (
    <GeoLocationContext.Provider
      value={{
        location,
        setLocation,
        nation,
        setNation,
        defaultLocation,
        getLocationChipsName,
        getLocationParamsFromCurrentLocation,
        updateUserLocation,
        updateUserNation,
      }}
    >
      {props.children}
    </GeoLocationContext.Provider>
  );

  async function configureLocation(location = null) {
    if (location) {
      var ip_location = await findIPAPILocation();
      var ip_obj = {
        country: ip_location.value && ip_location.value.country,
        city: ip_location.value && ip_location.value.city,
      };
      var coords_obj = Object.assign(ip_obj, ip_location.value);
      setLocation({ type: "coords", value: coords_obj });
      setDefaultLocation({ type: "coords", value: coords_obj });
      setNation(ip_obj.country);
      var location_string = JSON.stringify({
        type: "coords",
        value: coords_obj,
      });
      cookies.set("location", location_string, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 120),
      });
      cookies.set("current_location", location_string, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 120),
      });
    } else {
      var ip_location = await findIPAPILocation();
      setLocation(ip_location);
      setDefaultLocation(ip_location);
      setNation(ip_location.value.country);
      var location_string = JSON.stringify(ip_location);
      cookies.set("location", location_string, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 120),
      });
      cookies.set("current_location", location_string, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 120),
      });
    }
  }

  async function findIPAPILocation() {
    var obj = {};
    // return obj;
    const d = {
      city: "Tirane",
      region: "Tirane",
      region_code: "11",
      country: "AL",
      country_name: "Albania",
      continent_code: "EU",
      in_eu: false,
      postal: "1001",
      latitude: 41.3275,
      longitude: 19.8189,
      timezone: "Europe/Tirane",
      utc_offset: "+0200",
      country_calling_code: "+355",
      currency: "ALL",
    };
    let response = await fetch(`https://ipapi.co/json/`).catch((error) => {});
    response = response ? response : { json: () => d } || { json: () => d };
    const data = await response.json();
    return { type: "ipapi", value: data };
  }
};

export default GeoLocationProvider;
