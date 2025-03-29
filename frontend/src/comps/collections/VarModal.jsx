import { LuCopy, LuTrash } from "react-icons/lu";
import CustomButton from "../misc/CustomButton";
import ModalLayout from "../misc/ModalLayout";

const VarModal = ({ varModal, setVarModal, vars, coll_id, coll_name }) => {
  console.log("var-modal ", coll_id, vars);
  return (
    <ModalLayout open={varModal} onClose={() => setVarModal(false)} title="Environment variables">
      <div className="p-6 bg-sec">
        <div className="overflow-y-auto" style={{ maxHeight: "300px" }}>
          {vars && vars.length
            ? vars.map((v, i) => (
                <div key={i} className="mt-4 first:mt-0 group">
                  <div className="flex justify-start items-cetner gap-x-2 pr-4">
                    <p className="text-lit text-sm truncate whitespace-nowrap overflow-ellipsis" style={{ maxWidth: "80%" }}>
                      {v.key}
                    </p>
                    <div className="text-red-400 cursor-pointer items-center hidden group-hover:flex">
                      <LuTrash size="14" />
                    </div>
                    <div className="text-accent cursor-pointer items-center hidden group-hover:flex">
                      <LuCopy size="14" />
                    </div>
                  </div>
                  <div className="overflow-x-auto mt-2 py-2 px-2 bg-brand rounded-md text-txtsec text-xs">
                    <pre>{v.value}</pre>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="w-full flex justify-end items-center mt-6 gap-x-4">
          <CustomButton name="New Variable" clx="px-4 py-1 text-sm" />
          <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1 text-sm" onClick={() => setVarModal(false)} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default VarModal;
