import { BottomBar } from "@/components/bottomBar";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
// import AppContextProvider from "@/context/appContext";

export default function App({ Component, pageProps }) {
  return (
    // <AppContextProvider>
    // <Layout>
    <>
      <Navbar />
      <div className="pb-[80px]">
        <Component {...pageProps} />
      </div>
      <BottomBar />
    </>
    // </Layout>
    // </AppContextProvider>
  );
}
