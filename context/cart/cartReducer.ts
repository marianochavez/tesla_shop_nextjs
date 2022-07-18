import {ICartProduct} from "../../interfaces";

import {CartState} from "./";

type CartActionType =
  | {type: "Cart - LoadCart from cookies | storage"; payload: ICartProduct[]}
  | {type: "Cart - Updated products in cart"; payload: ICartProduct[]}
  | {type: "Cart - Change product cart quantity"; payload: ICartProduct}
  | {type: "Cart - Remove product in cart"; payload: ICartProduct}
  | {
      type: "Cart - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "Cart - Updated products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "Cart - Change product cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case "Cart - Remove product in cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product._id + product.size !== action.payload._id + action.payload.size,
        ),
      };

    case "Cart - Update order summary":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
