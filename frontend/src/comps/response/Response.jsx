import React, { useState } from "react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { LuChevronDown, LuDot } from "react-icons/lu";
import RspEditor from "./RspEditor";
import RspStatus from "./RspStatus";

const Response = ({ response }) => {
  console.log("Response comp", response);
  const [rspTab, setRspTab] = useState("body");
  const rspTypeRender = () => {
    switch (response?.contentType) {
      case "JSON":
      case "JAVASCRIPT":
      case "HTML":
        return <RspEditor lang={response.contentType} bodyContent={response?.bodyContent} />;
      default:
        return null;
    }
  };
  return (
    <div className="h-full w-full px-6">
      <div className="grid h-full" style={{ gridTemplateRows: "min-content minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
        <div className="h-full flex justify-between items-center pb-1">
          <div className="h-full">
            <Menu
              menuButton={
                <button className="shrink-0 h-full cursor-pointer flex justify-center items-center gap-x-1 text-txtprim text-sm font-bold capitalize">
                  {rspTab}
                  <LuChevronDown size="16" className="text-accent" />
                </button>
              }
              menuClassName="!bg-sec"
              unmountOnClose={false}
              align="start"
              direction="bottom"
              gap={6}
            >
              <MenuItem className="text-txtprim text-sm" onClick={() => setRspTab("body")}>
                Body
              </MenuItem>
              <MenuItem className="text-txtprim text-sm" onClick={() => setRspTab("headers")}>
                Headers
              </MenuItem>
            </Menu>
          </div>
          <RspStatus status={response?.statusCode} duration={response?.duration} httpStatus={response?.httpStatus} />
        </div>
        {rspTab === "body" ? <div className="h-full">{rspTypeRender()}</div> : <div className="h-full"></div>}
      </div>
    </div>
  );
};

export default React.memo(Response);
