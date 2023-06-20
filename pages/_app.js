import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  );
}
