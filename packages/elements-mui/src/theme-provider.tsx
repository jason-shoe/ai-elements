"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { memo, useMemo } from "react";

export const ElementsMuiThemeProvider = memo<{ children: ReactNode }>(
  ({ children }) => {
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: "dark",
          },
        }),
      []
    );

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }
);

ElementsMuiThemeProvider.displayName = "ElementsMuiThemeProvider";

