import React, { useState } from "react";
import { useStore } from "../store/store";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { getReqType } from "../utils/helper";
import { LuChevronDown, LuInfo, LuRadio, LuSave } from "react-icons/lu";
import CustomButton from "./misc/CustomButton";
import ModalLayout from "./misc/ModalLayout";
import { toast } from "react-toastify";
import DraftEditor from "./misc/DraftEditor";

const ReqHead = ({ tabId, method, url, name, miniCol }) => {
  const [saveModal, setSaveModal] = useState(false);
  const [selcol, setSelcol] = useState(miniCol?.id);
  let saveLoad = useStore((x) => x.saveLoad);
  let invokeLoading = useStore((x) => x.invokeLoading);
  let cols = useStore((x) => x.collections);
  const updateReqModal = async () => {
    if (!miniCol?.id || miniCol?.id === "") {
      setSelcol(miniCol?.id);
      setSaveModal(true);
    } else {
      let rsp = await useStore.getState().updateReq(tabId);
      if (rsp) {
        toast.success("Request saved successfully!");
      }
    }
  };
  const onUpdateReq = async (e) => {
    e.preventDefault();
    let n = e.target.req_name.value;
    if (!n || n === "") {
      toast.warn("Name cannot be empty.");
      return;
    }
    if (!selcol || selcol === "") {
      toast.warn("Please select collection.");
      return;
    }
    let rsp = await useStore.getState().saveReq(tabId, n, selcol);
    if (rsp) {
      setSaveModal(false);
      toast.success("Request saved successfully!");
    } else {
      toast.error("Error! Cannot save Request.");
    }
  };
  const onInvokeReq = async () => {
    await useStore.getState().invokeReq(tabId);
  };

  return (
    <div className="h-full px-6">
      <div className="flex items-center text-accent gap-x-2">
        <LuRadio />
        <p className="text-sm text-txtprim max-w-2/3 truncate text-ellipsis">
          {miniCol?.name && miniCol?.name + " / "}
          {name}
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-x-3 h-10">
          <div className="grow border border-txtsec flex justify-start items-center rounded-sm h-full">
            <Menu
              menuButton={
                <button className="w-28 shrink-0 h-full cursor-pointer flex justify-center items-center gap-x-4 text-txtsec border-r border-txtsec">
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
            <DraftEditor envVars={miniCol?.envVars} value={url} setValue={(e) => useStore.getState().updateTab(tabId, "url", e)} fontsm={false} />
          </div>
          <div className="h-full">
            <CustomButton clx="h-full px-8" name="Send" loading={invokeLoading} onClick={onInvokeReq} />
          </div>
          <div className="h-full">
            <CustomButton clx="h-full px-6" bg="bg-txtsec" loading={saveLoad} name={<LuSave size="20" />} onClick={updateReqModal} />
          </div>
        </div>
      </div>
      <ModalLayout open={saveModal} onClose={() => setSaveModal(false)} title="Save Request">
        <form onSubmit={onUpdateReq}>
          <div className="p-6">
            <p className="text-txtprim text-sm mb-2">Request Name</p>
            <input
              name="req_name"
              className="border border-lines text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
              defaultValue={name}
              required
              maxLength={100}
              autoFocus
            />
            <div className="mt-4">
              <p className="text-txtprim text-sm">Select Collection</p>
            </div>
            {cols && cols.length ? (
              <div className="bg-sec mt-2 border border-lines overflow-y-auto" style={{ maxHeight: "300px" }}>
                {cols.map((x) => (
                  <div
                    className={`${x.id === selcol ? "bg-txtprim text-brand" : "bg-sec text-txtprim"} rounded-sm p-2 cursor-pointer`}
                    key={x.id}
                    onClick={() => setSelcol(x.id)}
                  >
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
              <CustomButton name="Save" type="submit" loading={saveLoad} clx="px-4 py-1" />
              <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setSaveModal(false)} />
            </div>
          </div>
        </form>
      </ModalLayout>
    </div>
  );
};

export default React.memo(ReqHead);
