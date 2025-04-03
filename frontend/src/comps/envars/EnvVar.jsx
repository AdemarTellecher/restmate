import { LuCopy, LuEllipsis, LuExternalLink, LuPackageSearch, LuPencil, LuTrash } from "react-icons/lu";
import { Menu, MenuItem } from "@szhsin/react-menu";
import ModalLayout from "../misc/ModalLayout";
import { useState } from "react";
import CustomButton from "../misc/CustomButton";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";

const EnvVar = ({ env }) => {
  const [varModal, setvarModal] = useState(false);
  const [addVar, setaddVar] = useState(false);
  let envLoading = useStore((x) => x.envLoading);
  const onCopy = (str) => {
    navigator.clipboard.writeText(str).then(() => {
      toast.success("Variable copied to clipboard!");
    });
  };
  const onAddVar = async (e) => {
    e.preventDefault();
    let k = e.target.key.value;
    let v = e.target.value.value;
    if (!k || !v) {
      toast.error("Error! Key or Value cannot be empty");
      return;
    }
    const validKey = /^[a-zA-Z0-9_-]+$/;
    if (!validKey.test(k)) {
      toast.error("Error! Key validation failed");
      return;
    }
    let rsp = await useStore.getState().addNewVar(env.id, k, v);
    if (rsp) {
      toast.success("Variable created successfully!");
      setaddVar(false);
    } else {
      toast.error("Error! Cannot create variable.");
    }
  };
  const onDeleteVar = async (name) => {
    let rsp = await useStore.getState().deleteVar(env.id, name);
    if (rsp) {
      toast.success("Variable delete successfully!");
    } else {
      toast.error("Error! Cannot delete variable.");
    }
  };
  return (
    <div className="">
      <div className="text-txtprim flex items-center py-1 hover:bg-sec hover:text-lit group">
        <div className="grow overflow-hidden cursor-pointer pl-4" onClick={() => setvarModal(true)}>
          <p className="truncate whitespace-nowrap overflow-ellipsis text-sm" style={{ width: "90%" }}>
            {env.name}
          </p>
        </div>
        <Menu
          menuButton={({ open }) => (
            <div className={`${open ? "block" : "hidden"} group-hover:block pr-2`}>
              <div className="cursor-pointer text-txtprim hover:text-lit">
                <LuEllipsis size="20" />
              </div>
            </div>
          )}
          menuClassName="!bg-sec"
          unmountOnClose={false}
          align="start"
          direction="bottom"
          gap={0}
        >
          <MenuItem className="text-txtprim text-sm gap-x-2" onClick={() => setvarModal(true)}>
            <LuExternalLink />
            Open
          </MenuItem>
          <MenuItem className="text-txtprim text-sm gap-x-2" onClick={() => setRenameCol(true)}>
            <LuPencil />
            Rename
          </MenuItem>
          <MenuItem className="text-red-400 text-sm gap-x-2" onClick={() => onDeleteCol()}>
            <LuTrash />
            Delete
          </MenuItem>
        </Menu>
      </div>
      <ModalLayout open={varModal} onClose={() => setvarModal(false)} title="Environment variables">
        {!addVar ? (
          <div className="p-6 bg-sec">
            <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
              {env.variable && Object.keys(env.variable).length ? (
                Object.keys(env.variable).map((v, i) => (
                  <div key={i} className="mt-4 first:mt-0 group">
                    <div className="flex justify-start items-cetner gap-x-2 pr-4">
                      <p className="text-lit text-sm truncate whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "80%" }}>
                        {v}
                      </p>
                      <div className="text-red-400 cursor-pointer items-center hidden group-hover:flex" onClick={() => onDeleteVar(v)}>
                        <LuTrash size="14" />
                      </div>
                      <div className="text-accent cursor-pointer items-center hidden group-hover:flex" onClick={() => onCopy(v)}>
                        <LuCopy size="14" />
                      </div>
                    </div>
                    <div className="overflow-x-auto mt-2 p-2 bg-brand rounded-md text-txtsec text-xs">
                      <pre>{env.variable[v]}</pre>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-sec mt-2 p-4 border border-lines rounded-sm" style={{ maxWidth: "450px" }}>
                  <div className="flex justify-center mb-2 text-orange-400">
                    <LuPackageSearch size="50" />
                  </div>
                  <p className="text-txtprim text-sm text-center mb-1">Variables not found for the nnvironment</p>
                  <p className="text-txtprim truncate whitespace-nowrap overflow-ellipsis text-center font-bold" style={{ width: "100%" }}>
                    {env.name}
                  </p>
                </div>
              )}
            </div>
            <div className="w-full flex justify-end items-center mt-6 gap-x-4">
              <CustomButton name="New Variable" clx="px-4 py-1 text-sm" onClick={() => setaddVar(true)} />
              <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1 text-sm" onClick={() => setvarModal(false)} />
            </div>
          </div>
        ) : (
          <div className="p-6">
            <form onSubmit={onAddVar}>
              <div className="">
                <div>
                  <p className="text-txtprim text-sm mb-2">key</p>
                  <input
                    name="key"
                    className="border border-txtsec bg-brand text-lit w-full outline-none p-1 px-3 text-sm focus:border-txtprim rounded-sm"
                    required
                    maxLength={100}
                    autoFocus
                  />
                </div>
                <div className="mt-4">
                  <p className="text-txtprim text-sm mb-2">Value</p>
                  <textarea
                    name="value"
                    className="border border-txtsec bg-brand text-lit w-full outline-none p-1 px-3 text-sm focus:border-txtprim rounded-sm"
                    required
                    rows={4}
                    maxLength={999}
                  />
                </div>
                <div className="w-full flex justify-end items-center mt-6 gap-x-4">
                  <CustomButton name="Add" type="submit" clx="px-4 py-1" loading={envLoading} />
                  <CustomButton name="Back" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setaddVar(false)} />
                </div>
              </div>
            </form>
          </div>
        )}
      </ModalLayout>
    </div>
  );
};

export default EnvVar;
