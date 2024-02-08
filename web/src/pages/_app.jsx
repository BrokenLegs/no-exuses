import { useRouter } from "next/router";
import RootLayout from "../../src/app/layout.js";
import { SessionProvider } from "next-auth/react";

import "/src/app/globals.css";
import "react-calendar/dist/Calendar.css";
import "../styles/generalStyle.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const router = useRouter();

    return (
        <SessionProvider session={session}>
            <RootLayout currentPath={router.pathname}>
                <Component {...pageProps} />
            </RootLayout>
        </SessionProvider>
    );
}

export default MyApp;
