import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "../redux/store";

//calendar
import "../styles/reactcalendar.css";
//gloabl app
import "../styles/globals.css";
//fonts
import "../styles/fonts.css";

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
