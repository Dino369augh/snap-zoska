"use client"; // This marks the component as a client component

import { Button, Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GDPR() {
  const router = useRouter();

  // Function to handle "Go Back" button
  const handleGoBack = () => {
    router.push("/auth/registracia");
  };

  return (
    <Container sx={{ padding: "20px", maxWidth: "lg" }}>
      {/* GDPR Content */}
      <Box sx={{ marginBottom: "20px" }}>
        <h1>GDPR</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nunc vel ante tincidunt,
          nec volutpat nisi condimentum. Vestibulum quis lectus id neque placerat auctor. Nulla facilisi.
        </p>
        <p>
          Integer ac velit id ligula tempor feugiat non sed urna. Integer vestibulum nisi non eros mollis
          scelerisque. Vivamus auctor vitae leo vel euismod.
        </p>
        <p>
          Ut malesuada tortor ut ipsum euismod, sit amet dapibus nisi tempor. Sed vel felis malesuada, 
          malesuada eros et, luctus lorem.
        </p>
      </Box>

      {/* Go Back Button, aligned with text */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ padding: "10px 20px", textTransform: "none" }}
        >
          Späť na registráciu
        </Button>
      </Box>
    </Container>
  );
}
