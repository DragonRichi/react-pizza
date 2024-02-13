import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./Storage";
import userSlice, { JWT_PERSISTENT_STATE } from "./UserSlice"
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
})

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE)
    saveState(store.getState().cart, CART_PERSISTENT_STATE)
})

export type RootState = ReturnType<typeof store.getState> //Возвращает состояние
export type AppDispatch = typeof store.dispatch;