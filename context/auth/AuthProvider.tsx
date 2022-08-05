import {FC, useReducer, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useSession, signOut} from "next-auth/react";

import {teslaApi} from "../../axiosApi";
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

  const {data, status} = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({type: "Auth - Login", payload: data?.user as IUser});
    }
  }, [status, data]);

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

  const logoutUser = async () => {
    Cookies.remove("cart");
    Cookies.remove("name");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zipCode");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut();
    dispatch({type: "Auth - Logout"});
    // router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // methods
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
