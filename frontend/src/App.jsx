import { useEffect } from "react";
import Layout from "./comps/misc/Layout";
import TabsRoot from "./comps/TabsRoot";
import { useStore } from "./store/store";

function App() {
  useEffect(() => {
    useStore.getState().getCollections();
  }, []);
  return (
    <Layout>
      <TabsRoot />
    </Layout>
  );
}

export default App;
