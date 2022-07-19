import axios from "axios";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import {FC, useReducer, useEffect} from "react";

import {teslaApi} from "../../api";
import {IUser} from "../../interfaces";

import {AuthContext, authReducer} from "./";

interface Props {
  children: React.ReactNode;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const {data} = await teslaApi.get("/user/validate-token");
      const {token, user} = data;

      Cookies.set("token", token);
      dispatch({type: "Auth - Login", payload: user});
    } catch (error) {
      Cookies.set("token", "");
    }
  };

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const {data} = await teslaApi.post("/user/login", {email, password});
      const {token, user} = data;

      Cookies.set("token", token);
      dispatch({type: "Auth - Login", payload: user});

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{hasError: boolean; message?: string}> => {
    try {
      const {data} = await teslaApi.post("/user/register", {email, password, name});
      const {token, user} = data;

      Cookies.set("token", token);
      dispatch({type: "Auth - Login", payload: user});

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as any;

        return {
          hasError: true,
          message: err.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Error al registrar usuario",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // methods
        loginUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
