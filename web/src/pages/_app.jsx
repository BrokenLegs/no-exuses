import "/src/app/globals.css";
import "react-calendar/dist/Calendar.css";
import "../styles/generalStyle.css";

function MyApp({ Component, pageProps }) {
    return (
        <div className="app-container min-h-screen max-w-2xl mx-auto bg-background text-primary-text relative">
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
