import { combineReducers } from 'redux';
import cartReducer from './reducers/cart.reducer';
import themeReducer from './reducers/theme.reducer';

export default combineReducers({
    cart: cartReducer,
    theme: themeReducer
});