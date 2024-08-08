import { useState, useEffect, useContext } from "react";
import { GeoLocationContext } from "/context/geoLocationContext";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";
//tr
import { useTranslation } from "next-i18next";


const SearchLocationContainer = ({
  show,
  closeModal = function () { },
  selectLocation,
}) => {
  if (show) {
    return (
      <>
        <div
          className="modal-bg"
          onClick={() => {
            closeModal();
          }}
        ></div>
        <div className="search-location-modal-container px-20">
          <div className="container pt-20 pb-20 px-0">
            <LocationView closeModal={closeModal} />
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
export default SearchLocationContainer;

const LocationView = ({ closeModal = function () { } }) => {
  const { location, updateUserLocation, defaultLocation, updateUserNation } =
    useContext(GeoLocationContext);
  const [locationList, setLocationList] = useState([]);
  const [libraries] = useState(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries,
  });
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleChange = () => { };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(ll);

    if (results[0].address_components) {
      var last_index = results[0].address_components.length;
      if (last_index > 0) {
        var last_component = results[0].address_components[last_index - 1];
        if (last_component) {
          updateUserNation(last_component.short_name);
        }
      }
    }

    var place = {
      description: results[0].formatted_address,
      latitude: ll.lat,
      longitude: ll.lng,
    };
    var obj = { type: "user", value: place };
    updateUserLocation(obj);
    closeModal();
  };

  function getLocationName() {
    if (
      defaultLocation.value &&
      defaultLocation.value.city &&
      defaultLocation.value.country_name
    ) {
      return `${defaultLocation.value.city}, ${defaultLocation.value.country_name}`;
    }
    // return "1901 Thornridge Cir. Shiloh, Hawaii 81063"
    return "Location Not Found";
  }

  useEffect(() => {
    if (location) {
      var location_country;

      if (location.type == "ipapi") {
        location_country = location.value.country_name;
      }
      if (location.type == "env") {
        location_country = location.value.country;
      }
      if (location.type == "user") {
        location_country = location.value.country;
      }
      if (location_country == null) {
        location_country = process.env.NEXT_PUBLIC_COUNTRY;
      }
      if (location_country == "Albania") {
        setLocationList([
          {
            city: "Tirana",
            country: "Albania",
            description: "Tirana, AL",
            latitude: 41.3275,
            longitude: 19.8187,
          },
          {
            city: "Durrës",
            country: "Albania",
            description: "Durrës, AL",
            latitude: 41.3246,
            longitude: 19.4565,
          },
          {
            city: "Vlorë",
            country: "Albania",
            description: "Vlorë, AL",
            latitude: 40.4661,
            longitude: 19.4914,
          },
        ]);
      }
    } else {
      console.log("NO LOCATION!");
    }
  }, [location]);

  // tr
  const { t } = useTranslation("common");
  if (!isLoaded) {
    return <div>{t("loading")}</div>;
  } else {
    return (
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          searchOptions={{ types: ["locality", "country"] }}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <div
                className="bg-white search-autocomplete"
                style={{ display: "flex", gap: "16px" }}
              >
                <div className="mobile-action-small" onClick={() => closeModal()}>
                  <img src="/assets/images/icons/icon-header-back.svg" alt="" />
                </div>
                <div className="nav-search">
                  <input
                    {...getInputProps({
                      placeholder: "Search...",
                      className: "location-search-input",
                      type: "search",
                    })}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
                <div
                  className="mobile-action-small"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <img
                    src="/assets/images/icons/icon-close.svg"
                    alt=""
                    height={"18px"}
                  />
                </div>
              </div>

              <div className="card-content mb-20 mt-4">
                <figure className="card-content-img">
                  <img
                    src="/assets/images/search-menu/cross-hair.svg"
                    alt=""
                    style={{
                      maxWidth: 'unset',
                      maxHeight: 'unset',
                      width: '100%'
                    }}
                  />
                </figure>
                <div
                  className="card-content-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    updateUserLocation(defaultLocation);
                    closeModal();
                  }}
                >
                  <h5>User current location</h5>
                  <p className="footnote-400"> {getLocationName()} </p>
                </div>
              </div>
              <div className="recent-search-list">
                {suggestions.length > 0 ? (
                  //Places
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-8">
                      <h2 className="mb-0">{t("places")}</h2>
                    </div>
                    <div className="autocomplete-dropdown-container">
                      <div className="recent-search-listing">

                        {loading && <div>{t("loading")}</div>}

                        {suggestions.map((suggestion, key) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: "transperent", cursor: "pointer" }
                            : { backgroundColor: "transperent", cursor: "pointer" };
                          return (
                            <ul
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                              key={suggestions.description}
                            >
                              <li style={{
                                cursor: "pointer", padding: '14px 0',
                                borderBottom: '1px solid #E4E6E8',
                              }}>
                                <a className="font-16px-24px-400">
                                  <i>
                                    <img
                                      src="/assets/images/search-menu/location-icon.svg"
                                      alt=""
                                    />
                                  </i>
                                  {suggestion.description}
                                </a>
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  //Presets
                  <>
                    <div className="d-flex justify-content-between align-items-center mb-8">
                      <h2 className="mb-0">Recent</h2>
                      <button style={{
                        background: 'transparent',
                        border: 'unset',
                        boxShadow: 'unset',
                        color: '#FCCE00',
                        fontSize: '12px',
                        letterSpacing: 2.2
                      }}>
                        CLEAR ALL
                      </button>
                    </div>
                    <div className="recent-search-listing">
                      <ul>
                        {locationList.map((place, key) => {
                          return (
                            <li
                              key={key}
                              style={{
                                cursor: "pointer", padding: '14px 0',
                                borderBottom: '1px solid #E4E6E8',
                              }}
                              onClick={() => {
                                updateUserLocation({
                                  type: "user",
                                  value: place,
                                });
                                closeModal();
                              }}
                            >
                              <a className="font-16px-24px-400">
                                <i>
                                  <img
                                    src="/assets/images/search-menu/location-icon.svg"
                                    alt=""
                                  />
                                </i>
                                {`${place.city}, ${place.country}`}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          )
          }
        </PlacesAutocomplete >
      </div >
    );
  }
};
