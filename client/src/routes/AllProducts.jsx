import { useLoaderData } from "react-router-dom";
import { http } from "../http";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import CardProduct from "../components/CardProduct";

export async function allProductsLoader() {
  let products = await http.get("/products").then((result) => result.data);
  return products;
}

function AllProducts() {
  const products = useLoaderData();

  return (
    <Container>
      <Fade in={true}>
        <Typography variant="h1" textAlign="center" mt={5} mb={4}>
          All Products
        </Typography>
      </Fade>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 1, md: 3 }}
      >
        {products.map((item) => (
          <CardProduct key={item.id} {...item} />
        ))}
      </Grid>
    </Container>
  );
}

export default AllProducts;
