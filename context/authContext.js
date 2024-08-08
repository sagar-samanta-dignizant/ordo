import * as AppStorage from "@/services/app-storage.service";
import React, { useReducer } from "react";
import { QueryCache } from "react-query";

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

const initialState = {
  user: null,
  token: "",
  isLogin: false,
  newUser: true,
  currentProfile: null,
  needUpdate: false,
};

export const AUTH_SIGN_IN = "AUTH_SIGN_IN";
export const AUTH_SIGN_OUT = "AUTH_SIGN_OUT";
export const AUTH_SIGN_UP = "AUTH_SIGN_UP";
export const AUTH_SET_TOKEN = "AUTH_SET_TOKEN";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_NEW_USER = "UPDATE_NEW_USER";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const SET_NEED_UPDATE = "SET_NEED_UPDATE";

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case AUTH_SIGN_IN:
      return {
        ...state,
        isLogin: true,
        token: action.payload.token,
      };

    case AUTH_SIGN_OUT:
      return {
        ...state,
        user: null,
        token: "",
        isLogin: false,
      };
    case AUTH_SIGN_UP:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        currentProfile: { ...action.payload },
      };
    case UPDATE_NEW_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    case SET_NEED_UPDATE:
      return {
        ...state,
        needUpdate: action.payload,
      };
  }
  return state;
};

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const actions = {
    // updateUserData: (userData) => {
    //   AppStorage.setProfile(userData);
    //   dispatch({ type: UPDATE_USER_DATA, payload: userData });
    // },
    // updateCurrentProfile: (data) => {
    //   dispatch({
    //     type: UPDATE_PROFILE,
    //     payload: { ...data.attributeSet, ...data.identifier },
    //   });
    // },
    // updateNewUser: (value) => {
    //   dispatch({ type: UPDATE_NEW_USER, payload: value });
    // },
    // setNeedUpdate: (value) => {
    //   dispatch({ type: SET_NEED_UPDATE, payload: value });
    // },

    setToken: (token) => {
      console.log(token);
      AppStorage.setToken(token);
      dispatch({ type: AUTH_SET_TOKEN, payload: token });
    },

    signUp: (userData) => {
      const { token, user } = userData;
      AppStorage.removeAuth();
      AppStorage.createAuth({ token, user: JSON.stringify(user) });
      dispatch({ type: AUTH_SIGN_UP, payload: userData });
    },
    signIn: (userData) => {
      const { Token, isLogin } = userData;
      AppStorage.removeAuth();
      AppStorage.setAuth({ Token, isLogin });
      dispatch({ type: AUTH_SIGN_IN, payload: userData });
    },
    signOut: () => {
      AppStorage.removeAuth();
      queryCache.clear();
      dispatch({ type: AUTH_SIGN_OUT });
    },
  };

  return (
    <AuthContext.Provider
      value={{
        authState: authState,
        authActions: actions,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
