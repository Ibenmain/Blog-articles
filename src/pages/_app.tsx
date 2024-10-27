import React, { useState } from "react";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Toaster />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>

    </>
  );
}

