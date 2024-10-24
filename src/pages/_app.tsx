import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
          <Toaster />
          <Component {...pageProps} />
      </SessionProvider>

    </>
  );
}
