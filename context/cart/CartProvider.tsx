import {useReducer, useEffect} from "react";
import Cookie from "js-cookie";

import {ICartProduct} from "../../interfaces";

import {CartContext, cartReducer} from "./";

interface Props {
  children: React.ReactNode;
}

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: React.FunctionComponent<Props> = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [];

      dispatch({type: "Cart - LoadCart from cookies | storage", payload: cookieProducts});
    } catch (error) {
      dispatch({type: "Cart - LoadCart from cookies | storage", payload: []});
    }
  }, []);

  useEffect(() => {
    // * el if impide que se borre la cookie al recargar la pagina
    // ? posiblemente sea por el modo estricto en desarrollo ("se ejecuta 2 veces")
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
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

  return (
    <CartContext.Provider
      value={{
        ...state,

        // methods
        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
