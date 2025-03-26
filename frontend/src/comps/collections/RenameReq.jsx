import { useStore } from "../../store/store";
import CustomButton from "../misc/CustomButton";
import ModalLayout from "../misc/ModalLayout";

const RenameReq = ({ req, renameModal, setRenameModal }) => {
  let cLoading = useStore((x) => x.cLoading);
  const onRenameReq = (e) => {
    e.preventDefault();
    let n = e.target.req_name.value;
    if (!n || n === "") {
      toast.warn("Name cannot be empty.");
      return;
    }
    console.log(n);
  };
  return (
    <ModalLayout open={renameModal} onClose={() => setRenameModal(false)} title="Rename Request">
      <form onSubmit={onRenameReq}>
        <div className="p-6">
          <p className="text-txtprim text-sm mb-2">Request Name</p>
          <input
            name="req_name"
            className="border border-txtsec text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
            defaultValue={req?.name}
            required
            maxLength={100}
            autoFocus
          />
          <div className="w-full flex justify-end items-center mt-6 gap-x-4">
            <CustomButton name="Rename" type="submit" loading={cLoading} clx="px-4 py-1" />
            <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setRenameModal(false)} />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default RenameReq;
