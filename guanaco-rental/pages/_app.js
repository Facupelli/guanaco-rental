import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import {
  useLoadCartFromLocalStorage,
  // useLoadLocationFromLocalStorage,
} from "../hooks/useLocalStorage.js";

//gloabl app
import "../styles/globals.css";
//fonts
import "../styles/fonts.css";
//calendar
import "../styles/reactcalendar.css";

//icons
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect } from "react";
config.autoAddCss = false;

let didInit = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
