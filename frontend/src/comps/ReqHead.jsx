import React, { useState } from "react";
import { useStore } from "../store/store";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { getReqType } from "../utils/helper";
import { LuChevronDown, LuInfo, LuRadio, LuSave } from "react-icons/lu";
import CustomButton from "./misc/CustomButton";
import ModalLayout from "./misc/ModalLayout";

const ReqHead = ({ tabId, method, url, name, coll_id }) => {
  console.log("reqHead render");
  const [saveModal, setSaveModal] = useState(false);
  const [selcol, setSelcol] = useState("");
  let cLoading = useStore((x) => x.cLoading);
  let cols = useStore((x) => x.collections);
  const getColsName = () => {
    if (coll_id) {
      // find in colls. return coll_name / request name
      return name;
    } else {
      return name;
    }
  };
  const updateReq = () => {
    setSaveModal(true);
  };
  const onUpdateReq = (e) => {
    e.preventDefault();
    let n = e.target.req_name.value;
    if (!n || n === "" || !selcol || selcol === "") return;
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
            <CustomButton clx="h-full px-8" name="Send" />
          </div>
          <div className="h-full">
            <CustomButton clx="h-full px-6" bg="bg-txtsec" name={<LuSave size="20" />} onClick={updateReq} />
          </div>
        </div>
      </div>
      {saveModal && (
        <ModalLayout close={() => setSaveModal(false)} title="Save Request">
          <form onSubmit={onUpdateReq}>
            <div className="p-6">
              <p className="text-txtprim text-sm mb-2">Request Name</p>
              <input
                name="req_name"
                className="border border-lines text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
                required
                maxLength={100}
                autoFocus
              />
              <div className="mt-4">
                <p className="text-txtsec text-sm">Select Collection</p>
              </div>
              {cols && cols.length ? (
                <div className="bg-sec mt-2 border border-lines overflow-y-auto" style={{ maxHeight: "300px" }}>
                  {cols.map((x) => (
                    <div className={`${x.id === selcol ? "bg-brand text-lit" : "text-txtprim"} p-2 cursor-pointer`} key={x.id} onClick={() => setSelcol(x.id)}>
                      <p className="text-sm truncate whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "90%" }}>
                        {x.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-sec mt-2 p-4 border border-lines rounded-sm">
                  <div className="flex justify-center mb-1 text-orange-400">
                    <LuInfo size="22" />
                  </div>
                  <p className="text-txtprim text-sm text-center">No collections found.</p>
                  <p className="text-txtprim text-sm text-center">Please create a new collection first.</p>
                </div>
              )}
              <div className="w-full flex justify-end items-center mt-6 gap-x-4">
                <CustomButton name="Save" type="submit" loading={cLoading} clx="px-4 py-1" />
                <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setSaveModal(false)} />
              </div>
            </div>
          </form>
        </ModalLayout>
      )}
    </div>
  );
};

export default React.memo(ReqHead);
