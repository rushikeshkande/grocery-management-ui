import { REMOVE_USER_DATA, SAVE_USER_DATA } from "@constants/actions";

const initialState = { userData: null };

/** Used to handle the loading states of the different Async component instances. */
function UserDetailsReducer(state = initialState, action:any ) {
    switch (action.type) {
        case SAVE_USER_DATA:
            return Object.assign({}, state, { userData: action.payload });
        case REMOVE_USER_DATA:
            return Object.assign({}, state, { userData: null} );
        default:
          return state;
    }
}

export default UserDetailsReducer;
