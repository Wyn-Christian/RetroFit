import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Cart from "./Cart";
import { useCart } from "../contexts/cart";

const UserMenu = ({ anchorUser, handleCloseUserMenu }) => {
  return (
    <Menu
      anchorEl={anchorUser}
      keepMounted
      open={Boolean(anchorUser)}
      onClose={handleCloseUserMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Link
        to="/order-history"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <MenuItem onClick={handleCloseUserMenu}>Order History</MenuItem>
      </Link>
    </Menu>
  );
};

function NavBar() {
  const { cartList } = useCart();

  const [anchorUser, setAnchorUser] = useState(null);
  const [anchorCart, setAnchorCart] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorUser(null);
  };

  const handleOpenCart = () => {
    setAnchorCart(true);
  };
  const handleCloseCart = () => {
    setAnchorCart(false);
  };

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Box flexGrow={1}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
              }}
            >
              <Box display="flex" alignItems="center">
                <img src="/logo2.png" alt="logo2" style={{ width: 74 }} />
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    display: {
                      xs: "none",
                      md: "inherit",
                    },
                  }}
                >
                  RETRO FIT
                </Typography>
              </Box>
            </Link>
          </Box>
          <Box display="flex" flexGrow={1}>
            <Link
              to="/all-products"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                All Products
              </Button>
            </Link>
            <Link
              to="/categories"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                Categories
              </Button>
            </Link>
          </Box>
          <Box display="flex">
            <IconButton
              sx={{ color: "white", ml: 2 }}
              onClick={handleOpenCart}
            >
              <Badge
                badgeContent={cartList.length}
                color="secondary"
                max={20}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleOpenUserMenu}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <UserMenu {...{ anchorUser, handleCloseUserMenu }} />
          <Cart {...{ anchorCart, handleCloseCart }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
