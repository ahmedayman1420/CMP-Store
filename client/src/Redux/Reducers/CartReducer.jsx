// ======= --- ======= <| Actions Strings |> ======= --- ======= //
import { ADD_TO_CART, SET_CART } from "../Actions/ActionStrings";

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.lenght) {
        let index = -1;
        let q = action.payload.cart.quantity;
        for (var i = 0; i <= state.length; i++) {
          if (state[i]._id._id === action.payload.cart._id._id) {
            index = i;
            q += state[i].quantity;
            break;
          }
        }
        if (index !== -1) {
          state[index].quantity = q;
          return state;
        } else return state.push(action.payload.cart);
      } else {
        return action.payload.cart;
      }

    case SET_CART:
      return action.payload.cart;
    default:
      return state;
  }
};

export default cartReducer;
