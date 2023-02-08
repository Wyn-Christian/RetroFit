import { useRouteError } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

function Error() {
  const error = useRouteError();
  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h3">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography variant="h4">
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Container>
  );
}

export default Error;
