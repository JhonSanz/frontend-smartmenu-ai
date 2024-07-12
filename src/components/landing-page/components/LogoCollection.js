import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const logos = [
  {
    url: 'https://yoxdo-assets.s3.amazonaws.com/logos-trusted-companies/b4a_resized.png',
    extraStyle: {
      backgroundColor: "black",
      padding: 10
    },
    website: "https://bachataforall.com"
  },
  {
    url: 'https://yoxdo-assets.s3.amazonaws.com/logos-trusted-companies/bof_resized.png',
    extraStyle: {},
    website: "https://bodyoffourcolombia.com"
  }
];

const logoStyle = {
  maxWidth: '100px',
  margin: '0 32px',
  cursor: "pointer"
};

export default function LogoCollection() {
  const theme = useTheme();

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
        mb={2}
      >
        Con la confianza de las mejores empresas
      </Typography>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 0.5 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo.url}
              alt={`Fake company number ${index + 1}`}
              style={{ ...logoStyle, ...logo.extraStyle }}
              onClick={() => window.open(logo.website, "_blank")}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
