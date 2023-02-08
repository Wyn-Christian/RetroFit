import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Custom components
import Navbar from "../components/NavBar";

// Contexts hook
import { useCart } from "../contexts/cart";

function Root() {
  const { cartlist, total } = useLoaderData();
  const { setCartList, setTotal } = useCart();

  useEffect(() => {
    setTotal(total);
    setCartList(cartlist);
  }, [cartlist, total]);

  return (
    <Box>
      <CssBaseline />
      <Navbar />
      <Box mb="10vh">
        <Outlet />
      </Box>
    </Box>
  );
}

export default Root;
