// Third party
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            marginRight: "1rem",
            padding: 0,
          }}
        >
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: {
                mobile: "0.5rem 1rem 0.5rem 1rem",
                tablet: "0.5rem 2.5rem 0.5rem 2.5rem",
                laptop: "0.5rem 5rem 0.5rem 5rem",
              },
            }}
          >
            <a
              href="tel:847-691-2717"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <IconButton
                disableRipple
                color="inherit"
                sx={{
                  border: "1px solid white",
                }}
              >
                <PhoneEnabledIcon fontSize="small" />
              </IconButton>
            </a>
            <Typography variant="caption">CALL</Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: {
                mobile: "0.5rem 1rem 0.5rem 1rem",
                tablet: "0.5rem 2.5rem 0.5rem 2.5rem",
                laptop: "0.5rem 5rem 0.5rem 5rem",
              },
            }}
          >
            <a
              href="mailto:sandroarobeli@yahoo.com?subject=Mail from Joke-reel"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <IconButton
                disableRipple
                color="inherit"
                sx={{
                  border: "1px solid white",
                }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </a>
            <Typography variant="caption">EMAIL</Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: {
                mobile: "0.5rem 1rem 0.5rem 1rem",
                tablet: "0.5rem 2.5rem 0.5rem 2.5rem",
                laptop: "0.5rem 5rem 0.5rem 5rem",
              },
            }}
          >
            <a
              href="https://facebook.com"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <IconButton
                disableRipple
                color="inherit"
                sx={{
                  border: "1px solid white",
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
            </a>
            <Typography variant="caption">FACEBOOK</Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              margin: {
                mobile: "0.5rem 1rem 0.5rem 1rem",
                tablet: "0.5rem 2.5rem 0.5rem 2.5rem",
                laptop: "0.5rem 5rem 0.5rem 5rem",
              },
            }}
          >
            <a
              href="https://twitter.com"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <IconButton disableRipple color="inherit" sx={{ border: "1px solid white" }}>
                <TwitterIcon fontSize="small" />
              </IconButton>
            </a>
            <Typography variant="caption">TWITTER</Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
