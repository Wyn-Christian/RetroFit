import { useFetcher, useLoaderData } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import { http } from "../http";
import { peso } from "../peso";
import { FormControl } from "@mui/material";

export async function productLoader({ params }) {
  let product = await http
    .get("/product/" + params.id)
    .then((result) => result.data);
  console.log(product);
  return product;
}

function Product() {
  const product = useLoaderData();
  const fetcher = useFetcher();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mb: 30,
      }}
    >
      <Typography variant="h1" pt={10} pb={8}>
        {product.name}
      </Typography>
      <Typography variant="h2" fontWeight="bold">
        {peso.format(product.price)}
      </Typography>
      <Paper
        sx={{
          p: 0,
          m: 0,
          width: 500,
        }}
        component="img"
        src={`http://localhost:4011${product.img_url}`}
        alt={`${product.name} image`}
        elevation={3}
      />

      <Typography textAlign="center" fontSize={{ xs: 20, md: 32 }} pt={10}>
        {product.description}
      </Typography>

      <FormControl
        component={fetcher.Form}
        method="post"
        action={`/cart/add/${product.id}`}
        variant="standard"
        sx={{
          m: 1,
          minWidth: 120,
          width: "100%",
          textAlign: "center",
        }}
      >
        <input type="hidden" name="price" value={product.price} />
        <Button
          sx={{
            mt: "20px",
            color: "#fff",
            fontWeight: "bold",
            alignSelf: "center",
            height: 100,
            width: {
              xs: "100%",
              sm: "80%",
              md: "50%",
            },
          }}
          type="submit"
          variant="contained"
        >
          <Typography variant="h4" fontWeight="bold">
            Add to cart
          </Typography>
        </Button>
      </FormControl>
    </Container>
  );
}

export default Product;
