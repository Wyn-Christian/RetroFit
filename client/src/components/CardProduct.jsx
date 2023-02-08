import { useNavigate, useFetcher } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { peso } from "../peso";
import { Grow, Paper } from "@mui/material";

function CardProduct({ id, name, category, description, img_url, price }) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Grow in={true} timeout={300}>
        <Card
          component={Paper}
          elevation={3}
          sx={{
            display: {
              xs: "flex",
              md: "block",
            },
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            src={`http://localhost:4011${img_url}`}
            sx={{
              height: {
                xs: 280,
                sm: 300,
                md: 400,
              },
              width: {
                xs: 200,
              },
              margin: {
                md: "auto",
              },
              objectFit: "cover",
            }}
          />
          <Divider />

          <CardContent
            sx={{
              p: {
                xs: "10px 0 0 20px",
                sm: "10px 0 0 0",
              },
              width: "100%",
              "&:last-child": { pb: "0" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                height: "100%",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {name}
              </Typography>
              <Typography fontWeight="bold">
                {peso.format(price)}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "row",
                    sm: "column",
                  },
                  justifyContent: {
                    xs: "center",
                    sm: "flex-end",
                  },
                  alignItems: "center",
                  p: {
                    xs: 0,
                    sm: "20px 0",
                  },
                  width: "100%",
                  height: "100%",
                  columnGap: 1,
                }}
              >
                <Button
                  sx={{
                    height: "30px",
                    p: "20px",
                    fontSize: {
                      xs: "12px",
                      sm: "15px",
                    },
                  }}
                  onClick={() => navigate(`/product/${id}`)}
                >
                  See more
                </Button>
                <fetcher.Form method="post" action={`/cart/add/${id}`}>
                  <input type="hidden" name="price" defaultValue={price} />
                  <Button
                    type="submit"
                    sx={{
                      height: "30px",
                      p: "20px",
                      fontSize: {
                        xs: "12px",
                        sm: "15px",
                      },
                    }}
                    variant="contained"
                  >
                    Add to Cart
                  </Button>
                </fetcher.Form>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    </Grid>
  );
}

export default CardProduct;
