import React,{ useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { RootState } from "./Redux/index"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from 'primereact/button'

import { useDispatch } from "react-redux"
import { deleteFavorite } from './Redux/FavoritesReducer'

import { Art } from './ArtworkResults'

function FavoritesList() {
    const dispatch = useDispatch()
    const favoriteList = useSelector((state: RootState) => state.favorite.favoriteArts)
    

    function handleDetailOnClick(product: Art,event: React.MouseEvent) {
        let index = favoriteList.indexOf(product)
        dispatch(deleteFavorite(index))
      }    


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