import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/cartSlice"


const rootReducer = combineReducers({

    auth:authReducer,
    cart:cartReducer

})

export default rootReducer;

// we have different slices that mamange different componenets like cart and signup,login
// the export reducer line is neccessary as it it used here to combine all the reducers