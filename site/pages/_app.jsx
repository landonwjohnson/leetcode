import { useEffect } from "react";
import { useRouter } from "next/router";
import "../app/globals.css";
import { inter, jetbrainsMono } from "../lib/fonts";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      void router.replace("/problems");
    }
  }, [router]);

  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} pages-router-font-root`}>
      <Component {...pageProps} />
    </div>
  );
}
