import {useReducer, useEffect} from "react";
import Cookies from "js-cookie";
import axios, {AxiosError} from "axios";

import {ICartProduct, IOrder, IShippingAddress} from "../../interfaces";
import {teslaApi} from "../../api";

import {CartContext, cartReducer} from "./";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: React.FunctionComponent<Props> = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [];

      dispatch({type: "Cart - LoadCart from cookies | storage", payload: cookieProducts});
    } catch (error) {
      dispatch({type: "Cart - LoadCart from cookies | storage", payload: []});
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("name")) {
      const cookieAddress = {
        name: Cookies.get("name") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zipCode: Cookies.get("zipCode") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({type: "Cart - LoadAddress from cookies", payload: cookieAddress});
    }
  }, []);

  useEffect(() => {
    // * el if impide que se borre la cookie al recargar la pagina
    // ? posiblemente sea por el modo estricto en desarrollo ("se ejecuta 2 veces")
    if (state.cart.length > 0) Cookies.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, curr) => curr.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({type: "Cart - Update order summary", payload: orderSummary});
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    // si existe el producto y es de la misma talla
    const productInCartSameSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size,
    );

    if (!productInCartSameSize)
      return dispatch({type: "Cart - Updated products in cart", payload: [...state.cart, product]});

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return;
      if (p.size !== product.size) return;

      p.quantity += product.quantity;

      return p;
    });

    dispatch({type: "Cart - Updated products in cart", payload: updatedProducts as ICartProduct[]});
  };

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({type: "Cart - Change product cart quantity", payload: product});
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({type: "Cart - Remove product in cart", payload: product});
  };

  const updateAddress = (address: IShippingAddress) => {
    Cookies.set("name", address.name);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zipCode", address.zipCode);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);

    dispatch({type: "Cart - Update Address", payload: address});
  };

  const createOrder = async (): Promise<{hasError: boolean; message: string}> => {
    if (!state.shippingAddress) {
      throw new Error("No shipping address");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const {data} = await teslaApi.post<IOrder>("/orders", body);

      dispatch({type: "Cart - Order complete"});

      // * used because the useEffect for set cart in cookies is not
      // * work properly in development mode
      Cookies.set("cart", JSON.stringify([]));

      return {hasError: false, message: data._id!};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{message: string}>;

        return {hasError: true, message: err.response?.data.message!};
      }

      return {hasError: true, message: "Unknown error"};
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,

        // orders
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
