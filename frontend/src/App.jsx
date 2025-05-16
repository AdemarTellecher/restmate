import { useEffect } from "react";
import Layout from "./comps/misc/Layout";
import TabsRoot from "./comps/TabsRoot";
import { useStore } from "./store/store";
import { useHotkeys } from "react-hotkeys-hook";
import "tippy.js/dist/tippy.css";

function App() {
  const loading = useStore((x) => x.appLoading);
  useEffect(() => {
    useStore.getState().getSettings();
    useStore.getState().getCollections();
    useStore.getState().getEnvs();
  }, []);

  useHotkeys("ctrl+enter", () => console.log("pressed ctrl+enter to send/stop request -->"), { enableOnFormTags: ["input", "select", "textarea"]});
  useHotkeys("ctrl+b", () => console.log("pressed ctrl+b to toggle sidebar -->"), { enableOnFormTags: ["input", "select", "textarea"]});
  useHotkeys("ctrl+s", () => console.log("pressed ctrl+s to save request -->"), { enableOnFormTags: ["input", "select", "textarea"]});
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
