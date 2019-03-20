import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FoodReducer from './FoodReducer';
import MenuListReducer from './MenuListReducer';

export default combineReducers({
    auth: AuthReducer,
    food: FoodReducer,
    menu_list: MenuListReducer
});