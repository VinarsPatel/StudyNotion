import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';


const rooReducer = combineReducers({
   auth:authReducer,
   profile:profileReducer,
   cart:cartReducer,
})

export default rooReducer;