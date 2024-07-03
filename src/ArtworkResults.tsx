/**
 * ArtworkResults displays all the artworks in a department in a grid of cards
 */
import React,{ useState,useEffect } from "react";

// API imports
import axios from 'axios'

// Navgation imports
import { useNavigate } from "react-router-dom"

// MUI component imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Backdrop from '@mui/material/Backdrop';

// PrimeReact imports
import { DataView, DataViewLayoutOptions } from 'primereact/dataview'
import { Button } from 'primereact/button'


/**
 * An art object - this pairs down all information pieces returned for an object
 * from the MMA API to just some interesting pieces.
 * 
 * Add more here allows the API response to map more data to the Art objects
 */
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

/**
 * Type for argument for ArtworkResults. This is to know which department
 * to view artwork from.
 */
type newProps = {
    departmentId: string
}

/**
 * Components to display the artwork pieces for a department
 *  - in a grid of cards
 *  - pagination at 10 items a page
 *  - allows the user to launch into a detailed view of art
 *  - allows user to see a zoomed in picture of art
 * @param props departmentId is a string of a department in MMA API
 * @returns div component of grid of cards
 */
function ArtworkResults(props: newProps) {

    //const [total, setTotal] = useState(0) // could be used to give stats of how many objects were returned
    const [objectIDs, setObjectIDs] = useState<string[]>([]) //all objectIDs returned from API
    const [arts,setArts] = useState<Art[]>([]) //all art objects to display in grid
    const [isLoading, setIsLoading] = useState(true) //status of API call to get objects on a department
    const [isBuilding, setIsBuilding] = useState(false) //status of API call to get data for each object in department
    const [selectedArt,setSelectedArt] = useState<Art>() //used to decide which picture to show in backdrop

    // Setup backdrop states for showing a zoomed picture to the user
    const [openBackdrop, setOpenBackdrop] = useState(false);
    
    /**
     * Closes backdrop
     */
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    /**
     * Sets open backdrop art to display an image of
     * @param product type Art of what was clicked
     * @param event MouseEvent that was clicked 
     */
    const handleOpenBackdrop = (product: Art,event: React.MouseEvent) => {
        setSelectedArt(product);
        setOpenBackdrop(true);
    };

    // navigation used when user clicks button on card to get more detail
    const navigate = useNavigate();

    /**
     *  Renders everytime props is updated and sets objectIDs state and isBuilding
     * 
     *  API calls to get objects for an department ID that matches the following:
     *  hasImages=true
     *  isOnView=true
     *  artistOrCulture=true
     *  q=
     */
    useEffect(() => {
        if(props.departmentId) {
            axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${props.departmentId}&hasImages=true&isOnView=true&artistOrCulture=true&q=`)
            .then(response => {
                setObjectIDs(response.data.objectIDs)
                setIsBuilding(true)
                setArts([]) // empty arts for newly gathered objects
            }).then(() => {setIsLoading(false)})
         }
    },[props.departmentId])

    /**
     * Renders everytime objectIDs is updated and sets arts state
     * 
     * API calls to get object details for an object
     *
     */
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

    /**
     * Navigates to detail page and display art that was clicked on
     * @param product type Art of what was clicked
     * @param event MouseEvent that was clicked 
     */
    function handleDetailOnClick(product: Art,event: React.MouseEvent) {
        navigate("/details", {state:{product}})
      }    

    /**
     * Builds a Card component given a piece of art
     * @param product type Art object to build
     * @param index index of item clicked from map in function listTemplate
     * @returns Card component of an Art object
     */
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
                <Button size="small" onClick={(event) => handleDetailOnClick(product,event)}>Learn More</Button>
                <Button size="small" onClick={(event) => handleOpenBackdrop(product,event)}>Picture</Button>
              </CardActions>
            </Card>
            <br/>
            </>
          );
      }

    /**
     * Builds list of card items to rdender
     * @param items list of type Art objects to redner
     * @returns Grid component of Cards to render
     */
    const listTemplate = (items: Art[]) => {
        // sanity check if no items, don't do any other rendering
        if (!items || items.length === 0) return null;

        // NOTE: Add sorting to items build so the results are the same each time 
        let list = items.map((product, index) => {
            return (
                <Grid key={index} item>
                    {BasicCard(product,index)}
                </Grid>
            )
        });

        return <Grid sx={{flexGrow: 1 }} container spacing={2} className="grid grid-nogutter">{list}</Grid>;
    };

    /**
     * Backdrop will have a selected Art and this will display an image on the backdrop
     * @returns img component
     */
    const popup = () => {
        if(selectedArt != undefined) {
            console.log(selectedArt)
            return (
                <img src={selectedArt.primaryImageSmall} alt={selectedArt.title} style={{alignSelf: 'center'}} />
            )
        }
    }

    // if still waiting API show Loading...
    /**
     *  NOTE listTemplate error is an existing issue but will still work 
     */
    if(objectIDs && objectIDs.length > 0) {
        if(isBuilding || isLoading) {
            <h3>Loading...</h3>
        } else {
            return (
            <div className="card">
                <DataView value={arts} listTemplate={listTemplate} paginator rows={10}/>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                    onClick={handleCloseBackdrop}
                >
                    {popup()}
                </Backdrop>
            </div>
            )
        }
    } else {
        return <></>
    }

        
}

export default ArtworkResults;