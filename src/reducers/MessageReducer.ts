import { SHOW_MESSAGE, HIDE_MESSAGE } from "@constants/actions";

const initialState = { showMessage: true };

/** Used to handle the loading states of the different Async component instances. */
function MessageReducer(state = initialState, action: { type: any; }) {
    switch (action.type) {
        case SHOW_MESSAGE:
            return Object.assign({}, state, { showMessage: true });
        case HIDE_MESSAGE:
            return Object.assign({}, state, { showMessage: false });
        default:
          return state;
    }
}

export default MessageReducer;
