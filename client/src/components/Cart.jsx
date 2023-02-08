import {
  Link,
  useNavigate,
  useFetcher,
  useSubmit,
} from "react-router-dom";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCart } from "../contexts/cart";
import { peso } from "../peso";
import { Fade, FormControl, Grow, Slide } from "@mui/material";

const CartItem = ({ _id, product, price, total_price, quantity, i }) => {
  const { enqueueSnackbar } = useSnackbar();
  const fetcher = useFetcher();
  return (
    <Slide direction="right" in={true} timeout={i * 540}>
      <Box>
        <ListItem
          sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <img
              src={`http://localhost:${4011}/images/products/${
                product.img_name
              }`}
              alt={product.name}
              style={{
                width: "84px",
                height: "100%",
              }}
            />
          </Box>
          <Box display="flex" flexDirection="column" width="60%">
            <Typography fontWeight="bold" textAlign="center">
              {product.name}
            </Typography>
            <Typography fontWeight="bold" textAlign="center">
              {product.category.toUpperCase()}
            </Typography>
            <Divider />
            <Box display="flex" gap="2px">
              <Box textAlign="end" width={200}>
                <Typography>Price:</Typography>
                <Typography sx={{ pt: "3px" }}>quantity:</Typography>
                <Typography>Total Price:</Typography>
              </Box>
              <Box
                component={fetcher.Form}
                method="post"
                action={`/cart/update/${_id}`}
              >
                <Typography>{peso.format(price)}</Typography>
                <TextField
                  id="quantity"
                  name="quantity"
                  defaultValue={quantity}
                  type="number"
                  sx={{
                    "& .MuiInputBase-input": {
                      p: "2.5px 10px",
                    },
                  }}
                />
                <Typography fontWeight="bold">
                  {peso.format(total_price)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            component={fetcher.Form}
            method="post"
            action={`/cart/remove/${_id}`}
            onSubmit={() => enqueueSnackbar("Cart item deleted!")}
          >
            <IconButton color="error" type="submit">
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItem>
        <Divider />
      </Box>
    </Slide>
  );
};

function Cart({ anchorCart, handleCloseCart }) {
  const { cartList, total } = useCart();
  const fetcher = useFetcher();

  return (
    <Drawer anchor="right" open={anchorCart} onClose={handleCloseCart}>
      <Box sx={{ width: 350 }}>
        <List>
          <ListItem disablePadding>
            <Button onClick={handleCloseCart}>
              <CloseIcon />
            </Button>
            <Typography
              variant="h5"
              fontWeight="bold"
              m="11px 0 10px 10px"
              sx={{ flexGrow: 1 }}
            >
              Your Awesome Cart
            </Typography>
          </ListItem>
          <Divider />
          {cartList.map((cart, i) => (
            <CartItem key={cart._id} {...cart} i={i} />
          ))}
          {!!cartList.length && (
            <Fade in={true} timeout={cartList.length * 400}>
              <ListItem sx={{ flexDirection: "column" }}>
                <Typography textAlign="center" width="100%">
                  total price: {peso.format(total.total_price)}
                </Typography>
                <Typography textAlign="center" width="100%">
                  total quantity:
                  <b>
                    {total.total_quantity}{" "}
                    {cartList.length > 1 ? "products" : "product"}
                  </b>
                </Typography>
              </ListItem>
            </Fade>
          )}
          <ListItem sx={{ justifyContent: "center" }}>
            {cartList.length ? (
              <Grow in={true} timeout={cartList.length * 400}>
                <FormControl
                  component={fetcher.Form}
                  method="post"
                  action="/order"
                  fullWidth
                >
                  <input
                    type="hidden"
                    name="order_items"
                    value={JSON.stringify(cartList)}
                  />
                  <input
                    type="hidden"
                    name="total"
                    value={JSON.stringify(total)}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: "80%", alignSelf: "center" }}
                    onClick={handleCloseCart}
                    type="submit"
                  >
                    <Typography
                      fontWeight="bold"
                      color="#000"
                      padding="10px 0"
                      variant="h6"
                    >
                      Buy All Now
                    </Typography>
                  </Button>
                </FormControl>
              </Grow>
            ) : (
              <Fade in={true} timeout={600}>
                <Typography
                  textAlign="center"
                  variant="h4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  No added to cart yet...
                </Typography>
              </Fade>
            )}
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Cart;
