import { SAVE_CART_COUNT, INCREMENT_CART_COUNT, DECREMENT_CART_COUNT } from "@constants/actions";

const initialState = { cartCount: 0 };

/** Used to handle the loading states of the different Async component instances. */
function CartReducer(state = initialState, action:any ) {
    switch (action.type) {
        case SAVE_CART_COUNT:
            return Object.assign({}, state, { cartCount : action.count });
        case INCREMENT_CART_COUNT:
            return Object.assign({}, state, { cartCount: action.count } );
        case DECREMENT_CART_COUNT:
            return Object.assign({}, state, { cartCount: action.count } ); 
        default:
          return state;
    }
}

export default CartReducer;
