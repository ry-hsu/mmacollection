/**
 *  Detailed view of a piece of artwork
 *  Expects to be called from navigation in ArtworkResults.tsx
 */

import React,{ useState,useEffect } from 'react'

// Router imports
import { useLocation } from "react-router-dom"
import {Art} from './ArtworkResults'

// Redux imports
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Redux/index"
import { addFavorite } from './Redux/FavoritesReducer'

/**
 * ArtworkDetails displays the details of a piece of art  
 * @returns A simple div that display a piece of art
 */
function ArtworkDetails() {
    const passedState = useLocation(); // expect an Art object (type Art from ./ArtworkResults)
    const art: Art  = passedState.state.product
    
    const dispatch = useDispatch(); // redux used for favorites
    const [artDisplay,setArtDisplay] = useState<Art>(art) // this could be refactored, state isn't used here
    const [isFavorite, setIsFavorite] = useState(false) // check if the current art is a favorite or not to toggle button text
    
    const favoriteList = useSelector((state: RootState) => state.favorite.favoriteArts) //gather all favorites

    /**
     *  Currently just adds artwork to Favorites page
     */
    const onToggleFavorite = () => {
        dispatch(addFavorite(art))
        console.log(`adding: ${art}`)
    }

    // Check if this artwork is already a favorite
    useEffect(() => {
        if (favoriteList.some(({objectID}) => objectID == art.objectID)) {
            setIsFavorite(true)
        }
    },[])

    // sanity check incase user navigates to the details page with a artwork to view
    if(passedState.state == null) {
        return <h1>DETAILS</h1>
    } else {
        return (
            <div>
                <h1 align='center'>{artDisplay.title}</h1>
                <img src={artDisplay.primaryImageSmall} alt={artDisplay.title} style={{alignSelf: 'center'}} />
                <div>
                    <h2>{artDisplay.title}</h2>
                    <p><strong>Name:</strong> {artDisplay.objectName}</p>
                    <p><strong>Culture:</strong> {artDisplay.culture}</p>
                    <p><strong>Period:</strong> {artDisplay.period}</p>
                    <p><strong>Artist Name:</strong> {artDisplay.artistDisplayName}</p>
                    <p><strong>Artist Bio:</strong> {artDisplay.artistDisplayBio}</p>
                    <p><strong>Date:</strong> {artDisplay.objectDate}</p>
                    <p><strong>Classification:</strong> {artDisplay.classification}</p>
                    <p><strong>Gallery Number:</strong> {artDisplay.GalleryNumber}</p>
                    <p><strong>Object ID:</strong> {artDisplay.objectID}</p>
                </div>
                <button onClick={onToggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </div>
        )
    }
}

export default ArtworkDetails;