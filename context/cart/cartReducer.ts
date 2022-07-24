import {ICartProduct, IShippingAddress} from "../../interfaces";

import {CartState} from "./";

type CartActionType =
  | {type: "Cart - LoadCart from cookies | storage"; payload: ICartProduct[]}
  | {type: "Cart - Updated products in cart"; payload: ICartProduct[]}
  | {type: "Cart - Change product cart quantity"; payload: ICartProduct}
  | {type: "Cart - Remove product in cart"; payload: ICartProduct}
  | {type: "Cart - LoadAddress from cookies"; payload: IShippingAddress}
  | {type: "Cart - Update Address"; payload: IShippingAddress}
  | {
      type: "Cart - Update order summary";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | {type: "Cart - Order complete"};

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
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

    case "Cart - Update Address":
    case "Cart - LoadAddress from cookies":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "Cart - Order complete":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
