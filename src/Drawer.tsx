import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuItem from '@mui/material/MenuItem'

import { Link } from "react-router-dom"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { classNames } from 'primereact/utils';

//import HomeIcon from '@mui/icons-material/Home';

export default function Drawer() {
    const [open, setOpen] = React.useState(true);
  
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
  
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      );
  
    return (
        <BrowserRouter>
          <div style={{ display: 'flex' }}>
            <Drawer open={true}>
              {DrawerList}
            </Drawer>
            <Routes>
              <Route path="/">

              </Route>
              <Route path="/about">

              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      );
  }