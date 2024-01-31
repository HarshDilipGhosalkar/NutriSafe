import Layout from "@/components/Layout";
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
      <Component {...pageProps} />
      <BottomBar />
    </>
    // </Layout>
    // </AppContextProvider>
  );
}
