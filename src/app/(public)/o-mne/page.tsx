// src/app/o-mne/page.tsx

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Facebook, Instagram, Web } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export const metadata = { title: "Domov | ZoškaSnap" };

export default function About() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100dvh" // Ensures full viewport height without overflow issues
      bgcolor="background.default"
      paddingX={2} // Ensures better responsiveness on small screens
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 800,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom fontWeight="bold">
          O Mne
        </Typography>
        <Typography variant="body1" paragraph fontSize="1.1rem">
          Ahoj! Som vášnivý človek s láskou k tvorivosti a riešeniu problémov. Moja cesta začala hlbokým
          záujmom o technológie, dizajn a inováciu, čo ma viedlo k objavovaniu rôznych oblastí, ako je
          webový vývoj, grafický dizajn a digitálny marketing.
        </Typography>

        <Grid container justifyContent="center" spacing={3}>
          <Grid item>
            <Link href="https://www.facebook.com/spsezochova?locale=sk_SK" target="_blank" rel="noopener">
              <IconButton sx={{ bgcolor: "#3b5998", color: "white" }} aria-label="Facebook">
                <Facebook />
              </IconButton>
            </Link>
          </Grid>

          <Grid item>
            <Link href="https://www.instagram.com/spsezochova/?hl=en" target="_blank" rel="noopener">
              <IconButton sx={{ bgcolor: "#E4405F", color: "white" }} aria-label="Instagram">
                <Instagram />
              </IconButton>
            </Link>
          </Grid>

          <Grid item>
            <Link href="https://zochova.sk/" target="_blank" rel="noopener">
              <IconButton sx={{ bgcolor: "#00A1E4", color: "white" }} aria-label="Web site">
                <Web />
              </IconButton>
            </Link>
          </Grid>
        </Grid>

        <Typography variant="body2" mt={2} color="text.secondary">
          © 2025 ZoškaSnap. Všetky práva vyhradené.
        </Typography>
      </Paper>
    </Box>
  );
}
