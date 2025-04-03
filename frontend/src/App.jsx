import { useEffect } from "react";
import Layout from "./comps/misc/Layout";
import TabsRoot from "./comps/TabsRoot";
import { useStore } from "./store/store";
import "tippy.js/dist/tippy.css";

function App() {
  useEffect(() => {
    useStore.getState().getCollections();
    useStore.getState().getEnvs();
  }, []);
  return (
    <Layout>
      <TabsRoot />
    </Layout>
  );
}

export default App;
