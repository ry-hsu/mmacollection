import React,{ useState,useEffect } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from 'primereact/button'

//import Backdrop from '@mui/material/Backdrop';

import ArtworkDetailsBackdrop from "./ArtworkDetailBackdrop";

export interface Art {
    objectID: number;
    primaryImage: string;
    primaryImageSmall: string;
    objectName: string;
    title: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    artistDisplayBio: string;
    objectDate: string;
    classification: string;
    GalleryNumber: string;
}

type newProps = {
    departmentId: string
}

function ArtworkResults(props: newProps) {
        // backdrop scenario
    // const [openBackdrop, setOpenBackdrop] = useState(false);
    // const handleCloseBackdrop = () => {
    //     setOpenBackdrop(false);
    // };
    // const handleOpenBackdrop = (product: Art,event: React.MouseEvent) => {
    //     setSelectedArt(product);
    //     setOpenBackdrop(true);
    // };
    //const [total, setTotal] = useState(0)
    const [objectIDs, setObjectIDs] = useState<string[]>([])
    const [arts,setArts] = useState<Art[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isBuilding, setIsBuilding] = useState(false)
    const [selectedArt,setSelectedArt] = useState<Art>()

    const navigate = useNavigate();

    useEffect(() => {

        if(props.departmentId) {
        //if(props.departmentId.length > 0) {
            //console.log(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${props.departmentId}&hasImages=true&isOnView=true&q=cat`)
            axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${props.departmentId}&hasImages=true&isOnView=true&artistOrCulture=true&q=`)
            .then(response => {
                setObjectIDs(response.data.objectIDs)
                setIsBuilding(true)
                setArts([])
            }).then(() => {setIsLoading(false)})
         }
    },[props.departmentId])

    useEffect(() => {
        if(isBuilding) {
            objectIDs.map((obj: string) => {
                //console.log(`Fetch ${obj}`)
                axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${obj}`)
                .then((response) => {
                    setArts(oldArray => [...oldArray,response.data])
                })
                .then(() => {
                    setIsBuilding(false)
                })
            })
        }
    },[objectIDs])

    function handleDetailOnClick(product: Art,event: React.MouseEvent) {
        //console.log(product.objectName)
        //console.log('here')
        navigate("/details", {state:{product}})
        //handleOpenBackdrop
      }    

    function BasicCard(product: Art, index: number) {
        return (
            <>
            <Card variant="outlined" sx={{ width: 345}}>
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
                {/* <Button size="small" onClick={(event) => handleOpenBackdrop(product,event)}>Learn More</Button> */}
                <Button size="small" onClick={(event) => handleDetailOnClick(product,event)}>Learn More</Button>
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

    // const popup = () => {
    //     if(selectedArt != undefined) {
    //         console.log(selectedArt)
    //         return (
    //         <ArtworkDetailsBackdrop 
    //             objectID={selectedArt.objectID}
    //             primaryImage={selectedArt.primaryImage}
    //             primaryImageSmall={selectedArt.primaryImageSmall}
    //             objectName={selectedArt.objectName}
    //             title={selectedArt.title}
    //             culture={selectedArt.culture}
    //             period={selectedArt.period}
    //             artistDisplayName={selectedArt.artistDisplayName}
    //             artistDisplayBio={selectedArt.artistDisplayBio}
    //             objectDate={selectedArt.objectDate}
    //             classification={selectedArt.classification}
    //             GalleryNumber={selectedArt.GalleryNumber} />
    //         )
    //     }
    // }


    if(objectIDs && objectIDs.length > 0) {
        if(isBuilding || isLoading) {
            <h3>Loading...</h3>
        } else {
            return (
            <div className="card">
                <DataView value={arts} listTemplate={listTemplate} paginator rows={10}/>
                {/* <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                >
                    {popup()}
                </Backdrop> */}
            </div>
            )
        }
    } else {
        return <></>
    }

        
}

export default ArtworkResults;