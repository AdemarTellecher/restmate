import React from "react";
import { useStore } from "../store/store";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { getReqType } from "../utils/helper";
import { LuChevronDown, LuRadio, LuSave } from "react-icons/lu";

const ReqHead = ({ tabId, method, url, name, coll_id }) => {
  console.log("reqHead render");
  const getColsName = () => {
    if (coll_id) {
      // find in colls. return coll_name / request name
      return name;
    } else {
      return name;
    }
  };
  return (
    <div className="h-full px-6">
      <div className="flex items-center text-accent gap-x-2">
        <LuRadio />
        <p className="text-sm text-txtprim max-w-2/3 truncate text-ellipsis">{getColsName()}</p>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-3 h-10">
          <div className="grow border border-txtsec flex justify-start items-center rounded-sm h-full">
            <Menu
              menuButton={
                <button className="w-28 shrink-0 h-full cursor-pointer flex justify-center items-center gap-x-4 text-txtsec">
                  {getReqType(method)}
                  <LuChevronDown size="22" />
                </button>
              }
              menuClassName="!bg-sec"
              unmountOnClose={false}
              align="start"
              direction="bottom"
              gap={6}
            >
              <MenuItem className="text-green-400 font-bold" onClick={() => useStore.getState().updateTab(tabId, "method", "get")}>
                GET
              </MenuItem>
              <MenuItem className="text-yellow-400 font-bold" onClick={() => useStore.getState().updateTab(tabId, "method", "post")}>
                POST
              </MenuItem>
              <MenuItem className="text-blue-400 font-bold" onClick={() => useStore.getState().updateTab(tabId, "method", "put")}>
                PUT
              </MenuItem>
              <MenuItem className="text-red-400 font-bold" onClick={() => useStore.getState().updateTab(tabId, "method", "delete")}>
                DELETE
              </MenuItem>
            </Menu>
            <input
              value={url}
              onChange={(e) => useStore.getState().updateTab(tabId, "url", e.target.value)}
              className="border-l border-txtsec text-lit w-full h-full outline-none px-4 text-lg"
              maxLength={999}
            />
          </div>
          <div className="h-full">
            <button className="bg-accent h-full px-8 text-lit rounded-sm font-bold cursor-pointer active:bg-accent/80">Send</button>
          </div>
          <div className="h-full">
            <button className="h-full bg-txtsec text-txtprim rounded-sm px-6 cursor-pointer hover:text-lit active:bg-txtsec/80">
              <LuSave size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReqHead);
