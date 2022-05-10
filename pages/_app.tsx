import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL &&
        process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="lazyOnload"
          />
        )}
      <NextSeo
        title="Buy me a coffee"
        titleTemplate="Buy me a coffee"
        defaultTitle="Buy me a coffee"
        description="Avneesh's buy me a coffee on Polygon"
        canonical="https://bmc.avneesh.tech/"
        openGraph={{
          url: "https://bmc.avneesh.tech/",
          title: "Buy me a coffee",
          description: "Avneesh's buy me a coffee on Polygon",
          images: [
            {
              url: "/og-image.png",
              width: 800,
              height: 420,
              alt: `Buy me a coffee`,
            },
          ],
        }}
        twitter={{
          handle: "@avneesh0612",
          site: "@avneesh0612",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
