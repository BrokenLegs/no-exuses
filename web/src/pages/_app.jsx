import "/src/app/globals.css";
import "react-calendar/dist/Calendar.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-container min-h-screen bg-background">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
