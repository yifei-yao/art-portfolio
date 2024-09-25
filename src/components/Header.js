// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleMenuOpen = (event, categoryName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(categoryName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Renaissance Man
        </Typography>
        {artworksData.categories.map((category) => (
          <div key={category.name}>
            <Button
              color="inherit"
              onMouseOver={(event) => handleMenuOpen(event, category.name)}
            >
              {category.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === category.name}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
            >
              {category.years.map((year) => (
                <MenuItem
                  key={year.year}
                  component={Link}
                  to={`/${category.name}/${year.year}`}
                  onClick={handleMenuClose}
                >
                  {year.year}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
