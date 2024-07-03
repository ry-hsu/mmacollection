/**
 *  NOT CURRENTLY IN USE - PROTOTYPING OPTIONS TO DISPLAY DETAILS OF AN ARTWORK
 */

import React,{ useState,useEffect } from 'react'
import axios from 'axios';
import { useLocation } from "react-router-dom"
import {Art} from './ArtworkResults'

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./Redux/index"
import { addFavorite } from './Redux/FavoritesReducer'


function ArtworkDetailsBackdrop(props: Art) {
    const art: Art  = props
    console.log(`entered: ${art}`)
    const dispatch = useDispatch();
    //console.log(passedState.state)
    const [artDisplay,setArtDisplay] = useState<Art>(art)
    const [isFavorite, setIsFavorite] = useState(false)
    
    const favoriteList = useSelector((state: RootState) => state.favorite.favoriteArts)

    const onToggleFavorite = () => {
        dispatch(addFavorite(art))
        console.log(`adding: ${art}`)
    }

    useEffect(() => {
        if (favoriteList.some(({objectID}) => objectID == art.objectID)) {
            setIsFavorite(true)
        }
    },[])

    if(art == undefined) {
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

export default ArtworkDetailsBackdrop;

{/* <div>
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
</div> */}