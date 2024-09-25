import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const categories = ['Music', 'Literature', 'Fine Arts'];
const years = ['2021', '2022', '2023']; // Example years

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Client's Name */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Client's Name
          </Typography>

          {/* Menu Items */}
          {categories.map((category) => (
            <div key={category}>
              <Button
                color="inherit"
                onMouseOver={(event) => handleMenuOpen(event, category)}
                onClick={(event) => handleMenuOpen(event, category)}
              >
                {category}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={openMenu === category}
                onClose={handleMenuClose}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
              >
                {years.map((year) => (
                  <MenuItem key={year} onClick={handleMenuClose}>
                    {year}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
