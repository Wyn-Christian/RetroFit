import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Fade from "@mui/material/Fade";
import CardProduct from "../components/CardProduct";

function Categories() {
  const products = useLoaderData();

  const [category, setCategory] = useState("iphone");

  const handleCategory = (event, newCategory) => {
    if (newCategory !== null) {
      setCategory(newCategory);
    }
  };
  return (
    <Container>
      <Fade in={true}>
        <Typography variant="h1" textAlign="center" mt={5} mb={4}>
          Category
        </Typography>
      </Fade>
      <Fade in={true} timeout={500}>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategory}
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "20px",
          }}
          color="primary"
        >
          <ToggleButton value="iphone">iPhone</ToggleButton>
          <ToggleButton value="ipad">iPad</ToggleButton>
        </ToggleButtonGroup>
      </Fade>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 1, md: 3 }}
      >
        {products
          .filter((item) => item.category === category)
          .map((item) => (
            <CardProduct key={item.id} {...item} />
          ))}
      </Grid>
    </Container>
  );
}

export default Categories;
