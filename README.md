# MMA Collections Application

This application leverages information from the MMA API to display artworks currently on view at the museum.

# How to Run
This project was built using Vite. I haven't built the project yet because I am still adding features. But if someone wants to build it you can run the following:
**vite build**
Otherwise, to get the dev environment and to run on local server:
**npm run dev**

# Libraries Used
1. MaterialUI (@mui)
  Card, CardContent, Typography, CardActions, CardMedia, Grid, Backdrop
2. Redux (react-redux and @reduxjs/toolkit)
3. Primereact (primreact)
  DataView, Buttton
4. React-router-dom (react-router-dom)  

# Walkthrough
 To use this application. Choose a department from the department selector.
 ![alt text]([http://github.com/ry-hsu/mmacollection/](https://github.com/ry-hsu/mmacollection/blob/main/departmentSelector.png)

 After selecting a department browse the artworks. You can click the Learn More button on a card to launch the details of an artwork. You can also click Picture to launch a full size picture of the artwork.
 ![alt text]([http://github.com/ry-hsu/mmacollection/](https://github.com/ry-hsu/mmacollection/blob/main/artCard.png)

 In the detail view you can add the art to favorites:
 ![alt text]([http://github.com/ry-hsu/mmacollection/](https://github.com/ry-hsu/mmacollection/blob/main/addToFav.png)

 In the favorites page you can remove a favorite object by pressing remove favorite
 ![alt text]([http://github.com/ry-hsu/mmacollection/](https://github.com/ry-hsu/mmacollection/blob/main/favoriteArt.png)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


