import "../styles/globals.css";
import "../styles/css/bootstrap.min.css";
import "../styles/scss/main2.scss";
import "../styles/css/test.scss";
// import '../styles/scss/main.scss'
import UserContextProvider from "/context/searchListViewContext";
import GeoLocationProvider from "/context/geoLocationContext";
import "/styles/css/scan_menu.css";
import "@fontsource/inter";
import "swiper/swiper-bundle.css";
import "swiper/css";
import { useEffect } from "react";

import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import ThemeProvider from "../context/ThemeProvider";

function MyApp({ Component, pageProps }) {
  const getGoogleTagManager = (w, d, s, l, i) => {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  };

  const getGoogleAdSense = (w, d, s, l) => {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9177295688409305";
    f.parentNode.insertBefore(j, f);
  };

  useEffect(() => {
    getGoogleTagManager(window, document, "script", "dataLayer", "GTM-NBZHW8B");
    getGoogleAdSense(window, document, "script", "dataLayer");
  }, []);
  return (
    <>
      <Head>
        {" "}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NBZHW8B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
          <iframe>
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9177295688409305"
            crossorigin="anonymous" height="0" width="0"
          </iframe>
        </noscript>
      </Head>
      <ThemeProvider>
        <GeoLocationProvider>
          <UserContextProvider>
            <Component {...pageProps} />
          </UserContextProvider>
        </GeoLocationProvider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
