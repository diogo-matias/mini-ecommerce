import { combineReducers } from "@reduxjs/toolkit";
import ProductsSlice from "./products";
import UserSlice from "./user";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["products"],
};

const combinedReducers = combineReducers({
    products: ProductsSlice,
    user: UserSlice,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export default persistedReducer;
export type State = ReturnType<typeof combinedReducers>;
