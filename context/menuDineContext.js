import React, { useReducer, useState } from "react";

const initialState = {
  restaurantDetails: null,
  productsByServiceProvider: [],
  productDetails: [],
  subProductDetails: [],
  subProductInfo: {},
  allProducts: [],
};
export const UPDATE_SERVICE_PROVIDER_DATA = "UPDATE_SERVICE_PROVIDER_DATA";
export const UPDATE_PRODUCT_DETAILS = "UPDATE_PRODUCT_DETAILS";
export const UPDATE_SUB_PRODUCT_DATA = "UPDATE_SUB_PRODUCT_DATA";
export const UPDATE_RESTAURANT_DETAILS = "UPDATE_RESTAURANT_DETAILS";
export const UPDATE_ALL_PRODUCTS = "UPDATE_ALL_PRODUCTS";
export const UPDATE_SUB_PRODUCT_INFO = "UPDATE_SUB_PRODUCT_INFO";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SERVICE_PROVIDER_DATA:
      return {
        ...state,
        productsByServiceProvider: action.payload,
      };

    case UPDATE_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };
    case UPDATE_SUB_PRODUCT_DATA:
      return {
        ...state,
        subProductDetails: action.payload,
      };
    case UPDATE_RESTAURANT_DETAILS:
      console.log(state, action);
      return {
        ...state,
        restaurantDetails: action.payload,
      };
    case UPDATE_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case UPDATE_SUB_PRODUCT_INFO:
      return {
        ...state,
        subProductInfo: action.payload,
      };
  }
  // return state;
};
export const MenuDineContext = React.createContext();

const MenuDineProvider = (props) => {
  const [menuDineState, dispatch] = useReducer(reducer, initialState);
  const [selectedMenu, setSelectedMenu] = useState();
  const [openSearch, setOpenSearch] = useState(false);

  const actions = {
    updateServiceProviderData: (data) => {
      dispatch({ type: UPDATE_SERVICE_PROVIDER_DATA, payload: data });
    },
    updateProductDetailsData: (data) => {
      dispatch({ type: UPDATE_PRODUCT_DETAILS, payload: data });
    },
    updateSubProductData: (data) => {
      dispatch({ type: UPDATE_SUB_PRODUCT_DATA, payload: data });
    },
    updateRestaurantDetails: (data) => {
      dispatch({ type: UPDATE_RESTAURANT_DETAILS, payload: data });
    },
    updateAllProducts: (data) => {
      dispatch({ type: UPDATE_ALL_PRODUCTS, payload: data });
    },
    updateSubProductInfo: (data) => {
      dispatch({ type: UPDATE_SUB_PRODUCT_INFO, payload: data });
    },
  };

  return (
    <MenuDineContext.Provider
      value={{
        menuDineState: menuDineState,
        menuDineActions: actions,
        selectedMenu,
        openSearch,
        setSelectedMenu,
        setOpenSearch,
      }}
    >
      {props.children}
    </MenuDineContext.Provider>
  );
};
export default MenuDineProvider;
