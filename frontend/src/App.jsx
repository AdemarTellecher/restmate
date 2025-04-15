import { useEffect } from "react";
import Layout from "./comps/misc/Layout";
import TabsRoot from "./comps/TabsRoot";
import { useStore } from "./store/store";
import "tippy.js/dist/tippy.css";
import { GetAllCookies } from "../wailsjs/go/main/App";

function App() {
  const loading = useStore((x) => x.appLoading);
  const getCooks = async () => {
    let r = await GetAllCookies();
    console.log(r);
  };
  useEffect(() => {
    useStore.getState().getSettings();
    useStore.getState().getCollections();
    useStore.getState().getEnvs();
    getCooks();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Layout>
      <TabsRoot />
    </Layout>
  );
}

export default App;
