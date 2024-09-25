// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import artworksData from '../data/artworks.json';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, Button } from '@mui/material';

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
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar>
        {}
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, color: '#000', textDecoration: 'none' }}
          component={Link}
          to="/"
        >
          {}
          Renaissance Guy
        </Typography>
        {artworksData.categories.map((category) => (
          <div key={category.name}>
            <Button
              color="inherit"
              sx={{ color: '#000', textTransform: 'none' }}
              onClick={(event) => handleMenuOpen(event, category.name)}
            >
              {category.name}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openMenu === category.name}
              onClose={handleMenuClose}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem
                component={Link}
                to={`/${category.name}`}
                onClick={handleMenuClose}
              >
                All {category.name}
              </MenuItem>
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
