import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../redux/store";

//gloabl app
import "../styles/globals.css";
//fonts
import "../styles/fonts.css";
//calendar
import "../styles/reactcalendar.css";

//icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
