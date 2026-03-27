import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      void router.replace("/problems");
    }
  }, [router]);

  return <Component {...pageProps} />;
}
