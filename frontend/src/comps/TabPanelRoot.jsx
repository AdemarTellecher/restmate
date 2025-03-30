import React, { useEffect, useState } from "react";
import ReqHead from "./ReqHead";
import ReqOptionTabs from "./reqOptions/ReqOptionTabs";
import Response from "./response/Response";
import NullResponse from "./response/NullResponse";
import { useStore } from "../store/store";

const TabPanelRoot = ({ tab }) => {
  const [envVars, setenvVars] = useState([]);
  const cols = useStore((x) => x.collections);
  useEffect(() => {
    if (tab.coll_id && tab.coll_id !== "") {
      let c = cols.find((x) => x.id === tab.coll_id);
      if (c.variable && c.variable.length) {
        setenvVars(c.variable);
      }
    }
  }, [tab?.coll_id, cols]);

  return (
    <div className="h-full grid pt-4" id="tabPanelRoot" style={{ gridTemplateRows: "min-content minmax(0,100%)", gridTemplateColumns: "minmax(0,100%)" }}>
      <ReqHead tabId={tab.id} method={tab.method} url={tab.url} name={tab.name} coll_id={tab.coll_id} />
      <div
        className="h-full w-full grid py-4"
        style={{
          gridTemplateColumns: "minmax(0px, 100%) minmax(0px, 100%)",
          gridTemplateRows: "minmax(0, 100%)",
        }}
      >
        <div className="border-r border-lines px-6 h-full w-full">
          <ReqOptionTabs
            tabId={tab.id}
            params={tab.params}
            headers={tab.headers}
            bodyType={tab.body?.bodyType}
            bodyRaw={tab.body?.bodyRaw}
            formData={tab.body?.formData}
            envVars={envVars}
          />
        </div>
        {/*no rsp and error handler here*/}
        {tab.response && tab.response.statusCode ? <Response response={tab.response} /> : <NullResponse />}
      </div>
    </div>
  );
};

export default React.memo(TabPanelRoot);
