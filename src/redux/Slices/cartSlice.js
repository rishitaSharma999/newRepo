import { createSlice } from "@reduxjs/toolkit";

{
  /* In the provided code, the CartSlice is a slice that manages the state of the cart. It's created using the createSlice function from @reduxjs/toolkit, which takes an object with three properties:

name: The name of the slice (in this case, "cart").
initialState: The initial state of the slice (an empty array).
reducers: An object that defines the reducers for the slice (in this case, add and remove). */
}

{
  /* we define two reducers:

add: takes the current state and an action with a payload, and returns a new state with the added item. The new state is created by spreading the current state into a new array and adding the payload to the end.
remove: takes the current state and an action with a payload, and returns a new state with the item removed. The new state is created by filtering the current state to exclude the item with the matching id.
 */
}

export const CartSlice = createSlice({
  name: "cart",
  initialState: () => {
    const cartState = localStorage.getItem("cart");
    return cartState ? JSON.parse(cartState) : [];
  },
  reducers: {
    add: (state, action) => {
      // Return a new state with the added item
      const newState = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    remove: (state, action) => {
      //// Return a new state with the item removed
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cart");
      return []; // Set the state to an empty array
    },
  },
});

/* The actions object is used to dispatch actions to the Redux store, while the reducer function is used to update the state of the slice in response to those actions. */
/* By exporting the CartSlice reducer and actions, we can use them in our Redux store and components to manage the state of the cart. */

export const { add, remove, clearCart } = CartSlice.actions; // Export the action creators
export default CartSlice.reducer; // Export the reducer function

/* A slice is a way to organize and structure the state and reducers in a Redux application. A slice typically represents a specific domain or feature of the application, such as a cart, user authentication, or a list of items. */
