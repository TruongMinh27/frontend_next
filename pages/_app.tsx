import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, SSRProvider } from "react-bootstrap";
import TopHead from "../components/shared/TopHead";
import Heading from "../components/shared/Heading";
import Footer from "../components/shared/Footer";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from "../context";
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from "./theme-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Heading />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ToastProvider>
          <NextNProgress />
          <TopHead />
          <Component {...pageProps} />
          <Footer />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
