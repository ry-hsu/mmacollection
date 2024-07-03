/**
 * Reducer for favorites in FavoritesList.tsx
 */
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { Art } from '../ArtworkResults'

export interface FavoritesInitialState {
    favoriteArts: Art[],
}

const initialFavoriteState: FavoritesInitialState = {
    favoriteArts: [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: initialFavoriteState,
    reducers: {
        // adds a favorite to the state
        addFavorite: (state, action: PayloadAction<Art>) => {
            state.favoriteArts = [...state.favoriteArts,action.payload]
            console.log(`payload: ${state.favoriteArts.length}`)
        },
        // slices the favorite array and removes the payload item
        deleteFavorite: (state, action: PayloadAction<number>) => {
            state.favoriteArts = [...state.favoriteArts.slice(0,action.payload),
             ...state.favoriteArts.slice(action.payload + 1)
            ]
            console.log(`del: ${action.payload}`)
        },
    }
})

export const { addFavorite,deleteFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer