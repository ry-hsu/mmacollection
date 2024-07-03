import { configureStore } from "@reduxjs/toolkit"
import FavoritesReducer from "./FavoritesReducer"
import DepartmentReducer from './DepartmentReducer'

export const store = configureStore({
    reducer: {
        favorite: FavoritesReducer,
        department: DepartmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;