import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import MessageReducer from './MessageReducer';
import UserDetailsReducer from './UserDetailsReducer';

const rootReducer = combineReducers({
    message: MessageReducer,
    userinfo: UserDetailsReducer,
    cartInfo: CartReducer
});

export default rootReducer;
