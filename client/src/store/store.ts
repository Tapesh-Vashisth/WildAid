import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import logger from "redux-logger";
import appReducer from "../features/appSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export default store;
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch