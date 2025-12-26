import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from './seller/SellerSlice'
import sellerProductSlice from './seller/SellerProductSlice'
import productSlice from './customer/ProductSlice'
const rootReducer = combineReducers({
    seller:sellerSlice,
    sellerProduct:sellerProductSlice,
    product:productSlice
})
const store = configureStore({
    reducer:rootReducer,
}) 

export type AppDispatch=typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () =>useDispatch<AppDispatch>();
export const  useAppSelector: TypedUseSelectorHook<RootState>=useSelector;

export default store;