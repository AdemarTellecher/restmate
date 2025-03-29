import { LuCopy, LuPackageSearch, LuTrash } from "react-icons/lu";
import CustomButton from "../misc/CustomButton";
import ModalLayout from "../misc/ModalLayout";
import { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../../store/store";

const VarModal = ({ varModal, setVarModal, vars, coll_id, coll_name }) => {
  console.log("var-modal ", coll_id, coll_name);
  const [addVar, setaddVar] = useState(false);
  let cLoading = useStore((x) => x.cLoading);

  const onDeleteVar = async (name) => {
    let rsp = await useStore.getState().deleteVar(coll_id, name);
    if (rsp) {
      toast.success("Variable delete successfully!");
    } else {
      toast.error("Error! Cannot delete variable.");
    }
  };

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
    let newvar = { key: k, value: v };
    let rsp = await useStore.getState().addNewVar(coll_id, newvar);
    if (rsp) {
      toast.success("Variable created successfully!");
      setaddVar(false);
    } else {
      toast.error("Error! Cannot create variable.");
    }
  };

  return (
    <ModalLayout open={varModal} onClose={() => setVarModal(false)} title="Environment variables">
      {!addVar ? (
        <div className="p-6 bg-sec">
          <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
            {vars && vars.length ? (
              vars.map((v, i) => (
                <div key={i} className="mt-4 first:mt-0 group">
                  <div className="flex justify-start items-cetner gap-x-2 pr-4">
                    <p className="text-lit text-sm truncate whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "80%" }}>
                      {v.key}
                    </p>
                    <div className="text-red-400 cursor-pointer items-center hidden group-hover:flex" onClick={() => onDeleteVar(v.key)}>
                      <LuTrash size="14" />
                    </div>
                    <div className="text-accent cursor-pointer items-center hidden group-hover:flex" onClick={() => onCopy(v.key)}>
                      <LuCopy size="14" />
                    </div>
                  </div>
                  <div className="overflow-x-auto mt-2 py-2 px-2 bg-brand rounded-md text-txtsec text-xs">
                    <pre>{v.value}</pre>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-sec mt-2 p-4 border border-lines rounded-sm" style={{ maxWidth: "450px" }}>
                <div className="flex justify-center mb-2 text-orange-400">
                  <LuPackageSearch size="50" />
                </div>
                <p className="text-txtprim text-sm text-center mb-1">Variables not found for the collection</p>
                <p className="truncate whitespace-nowrap overflow-ellipsis text-center font-bold" style={{ width: "100%" }}>
                  {coll_name}
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-end items-center mt-6 gap-x-4">
            <CustomButton name="New Variable" clx="px-4 py-1 text-sm" onClick={() => setaddVar(true)} />
            <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1 text-sm" onClick={() => setVarModal(false)} />
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
                <CustomButton name="Add" type="submit" clx="px-4 py-1" loading={cLoading} />
                <CustomButton name="Back" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setaddVar(false)} />
              </div>
            </div>
          </form>
        </div>
      )}
    </ModalLayout>
  );
};

export default VarModal;
