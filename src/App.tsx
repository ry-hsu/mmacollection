/**
 *  Navigation components for react router
 */

import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import DepartmentSelector from './DepartmentSelect'
import ArtworkDetails from './ArtworkDetail'
import Layout from './Layout'
import Favorites from './FavoritesList'

import { Provider } from 'react-redux'
import { store } from './Redux/index'

import Banner from './Banner'

/**
 * Launches MMA Artwork App including banner and routes
 * @returns component that renders a banner, a BrowserRouter component
 */
function App() {

  return (
    <>
      <Banner />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<DepartmentSelector />} />
                  <Route path="details" element={<ArtworkDetails/>}/>
                  <Route path="favorites" element={<Favorites/>}/>
                </Route>
              </Routes>    
        </BrowserRouter>
      </Provider>
    </>  
  )
}

export default App
