import { Box, Container, Typography, Fade } from "@mui/material";

function Home() {
  return (
    <Container>
      <Fade
        in={true}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "80vh",
          alignItems: "center",
        }}
        timeout={400}
      >
        <Box>
          <img src="logo1.png" alt="logo1" style={{ width: 600 }} />
          <Typography sx={{ textAlign: "center" }} variant="h1">
            Welcome to Retro Fit
          </Typography>
        </Box>
      </Fade>
    </Container>
  );
}

export default Home;
