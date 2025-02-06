import { Container, Typography, Button, Box, Card, CardContent, Grid } from "@mui/material";
import Link from "next/link";
import { AccountCircle, GroupAdd, ContentCopy } from "@mui/icons-material"; // Icons for added dynamism

export default function NonAuthHomeView() {
  const showWhyRegister = true; // Keep it visible for now, or you can toggle it based on your needs

  return (
    <Container sx={{ textAlign: "center", marginTop: "40px", padding: "0 16px" }}>
      {/* Wrapper Box to center everything */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          maxWidth: "700px", // Expanded width
          margin: "0 auto",
          backgroundColor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          backgroundImage: 'url("/images/background.jpg")', // Add a background image for extra life
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Title */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: "primary.main" }}>
          Vitajte na ZoškaSnap!
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", color: "text.primary" }}>
          Pridajte sa k našej rastúcej komunite. Zaregistrujte sa, aby ste mohli pridať príspevky, sledovať ostatných a vytvoriť si svoj profil.
        </Typography>

        {/* Why Register Section */}
        {showWhyRegister && (
          <Card sx={{ width: "100%", mb: 3, boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Prečo sa zaregistrovať?
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <AccountCircle sx={{ fontSize: 40, color: "primary.main" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Vytvorte si svoj profil
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <GroupAdd sx={{ fontSize: 40, color: "primary.main" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Spoznajte nových ľudí
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <ContentCopy sx={{ fontSize: 40, color: "primary.main" }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Pridávajte obsah
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Register and Login Buttons */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" sx={{ width: "45%", padding: "12px 24px", fontSize: "1rem" }}>
            <Link href="auth/registracia" style={{ color: "white", textDecoration: "none" }}>
              Zaregistrujte sa
            </Link>
          </Button>

          <Button variant="contained" color="primary" sx={{ width: "45%", padding: "12px 24px", fontSize: "1rem" }}>
            <Link href="auth/registracia" style={{ color: "white", textDecoration: "none" }}>
              Prihláste sa
            </Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
