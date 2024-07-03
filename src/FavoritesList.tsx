/**
 * Displays the favorite arts 
 */
import React from 'react'

// Redux  imports
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "./Redux/index"
import { deleteFavorite } from './Redux/FavoritesReducer'

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

// Primreact imports
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from 'primereact/button'

import { Art } from './ArtworkResults'

/**
 * Gathers favorite arts to display
 * @returns div of Grid of cards of favorite arts
 */
function FavoritesList() {
    // get favorites from Redux of favorites
    const dispatch = useDispatch()
    const favoriteList = useSelector((state: RootState) => state.favorite.favoriteArts)
    
    /**
     *  Deletes an item from the favorites page
     * @param product type Art object that user wants to delete
     * @param event Mouse event
     */
    function handleDetailOnClick(product: Art,event: React.MouseEvent) {
        let index = favoriteList.indexOf(product)
        dispatch(deleteFavorite(index))
      }    

    /**
     * Card component of art to display 
     * 
     * NOTE THIS COULD BE REFACTORED INTO ITS OWN COMPONENT AS IT IS ALSO USED By
     * ArtworkResults.tsx
     * 
     * @param product type Art object to build
     * @param index index of item clicked from map in function listTemplate
     * @returns Card component of an Art object
     */  
    function BasicCard(product: Art, index: number) {
        return (
            <>
            <Card variant="outlined" sx={{ width: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={product.primaryImageSmall}
                title={product.title}
                component='img'
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Culture: ${product.culture}\nPeriod: ${product.period}`}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={(event) => handleDetailOnClick(product,event)}>Remove Favorite</Button>
                {/* <Button size="small" onClick={handleDetailOnClick}>Learn More</Button> */}
              </CardActions>
            </Card>
            <br/>
            </>
          );
      }

    /**
     * Builds list of card items to rdender
     * 
     * NOTE THIS COULD BE REFACTORED INTO ITS OWN SOURCE 
     * ALSO USED BY ArtworkResults.tsx
     * 
     * @param items list of type Art objects to redner
     * @returns Grid component of Cards to render
     */
    const listTemplate = (items: Art[]) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return (
                <Grid key={index} item>
                    {BasicCard(product,index)}
                </Grid>
            )
        });

        return <Grid sx={{flexGrow: 1 }} container spacing={2} className="grid grid-nogutter">{list}</Grid>;
    };

    // render a note if no favorites exist
    if(favoriteList.length > 0) {
        return (
            <div className="card">
                <DataView value={favoriteList} listTemplate={listTemplate} paginator rows={10}/>
            </div>
        )
    } else {
        return (
            <div>
                <h2 align="center">No favorites yet? Go find some art!</h2>
            </div>
        )
    }
}

export default FavoritesList;