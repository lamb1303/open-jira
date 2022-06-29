import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../themes";
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <UIProvider>
        <EntriesProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </EntriesProvider>
      </UIProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
