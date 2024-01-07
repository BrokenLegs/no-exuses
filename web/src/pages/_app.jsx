import "/src/app/globals.css";
import "react-calendar/dist/Calendar.css";
import "../styles/generalStyle.css";
import RootLayout from "../../src/app/layout.js";

function MyApp({ Component, pageProps }) {
    return (
        <RootLayout>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp;
