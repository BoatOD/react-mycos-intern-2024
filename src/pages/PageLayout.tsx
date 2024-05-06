import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div style={{ margin: -8 }}>
      {/* <AppBar style={{ top: 0, left: 0, right: 0 }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                textDecoration: "none",
                pr: 2,
              }}
            >
              Dashboard
            </Typography>
            <Typography
              noWrap
              component="a"
              href="/profile"
              sx={{
                textDecoration: "none",
              }}
            >
              Profile
            </Typography>
          </Toolbar>
        </Container>
      </AppBar> */}
      <Box>
        <Outlet />
      </Box>
    </div>
  );
};

export default PageLayout;
