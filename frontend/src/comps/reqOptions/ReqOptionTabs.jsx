import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ReqParams from "./ReqParams";
import ReqHeaders from "./ReqHeaders";
import ReqBodyOption from "./ReqBodyOption";
import BodyFormData from "./BodyFormData";
import BodyJson from "./BodyJson";

const ReqOptionTabs = ({ tabId, params, headers, bodyType, bodyRaw, formData }) => {
  console.log("reqOptions tab render");
  return (
    <div className="h-full w-full">
      <Tabs style={{ height: "100%", width: "100%" }}>
        <div className="grid h-full w-full" style={{ gridTemplateRows: "24px minmax(0, 100%)", gridTemplateColumns: "100%" }}>
          <div>
            <TabList className="flex items-center h-full gap-x-4 text-sm">
              <Tab
                selectedClassName="!text-lit bg-brand !border-accent"
                className="inline-block outline-none h-full text-txtprim border-b-2 border-brand cursor-pointer"
              >
                Body
              </Tab>
              <Tab
                selectedClassName="!text-lit bg-brand !border-accent"
                className="inline-block outline-none h-full text-txtprim border-b-2 border-brand cursor-pointer"
              >
                Headers
              </Tab>
              <Tab
                selectedClassName="!text-lit bg-brand !border-accent"
                className="inline-block outline-none h-full text-txtprim border-b-2 border-brand cursor-pointer"
              >
                Params
              </Tab>
            </TabList>
          </div>
          <div className="h-full w-full">
            <TabPanel style={{ height: "100%", width: "100%" }}>
              <div className="pt-2 h-full grid w-full" style={{ gridTemplateRows: "min-content minmax(0,100%)" }}>
                <ReqBodyOption tabId={tabId} bodyType={bodyType} />
                {bodyType === "json" ? (
                  <BodyJson tabId={tabId} bodyRaw={bodyRaw} />
                ) : bodyType === "formdata" ? (
                  <BodyFormData tabId={tabId} formData={formData} />
                ) : null}
              </div>
            </TabPanel>
            <TabPanel style={{ height: "100%" }}>
              <ReqHeaders headers={headers} tabId={tabId} />
            </TabPanel>
            <TabPanel style={{ height: "100%" }}>
              <ReqParams params={params} tabId={tabId} />
            </TabPanel>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default React.memo(ReqOptionTabs);
