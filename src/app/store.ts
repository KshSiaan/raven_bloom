import { inventoryReducer } from "@/features/inventory/inventorySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        inventory: inventoryReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;