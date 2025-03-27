import { toast } from "react-toastify";
import { useStore } from "../../store/store";
import CustomButton from "../misc/CustomButton";
import ModalLayout from "../misc/ModalLayout";

const RenameCol = ({ col, renameCol, setRenameCol }) => {
  let cLoading = useStore((x) => x.cLoading);
  const onRenameCol = async (e) => {
    e.preventDefault();
    let n = e.target.col_name.value;
    if (!n || n === "") {
      toast.warn("Name cannot be empty.");
      return;
    }
    let rsp = await useStore.getState().renameCollection(col.id, n);
    if (rsp) {
      setRenameCol(false);
      toast.success("Request renamed successfully!");
    } else {
      toast.error("Error! Cannot rename Request.");
    }
  };
  return (
    <ModalLayout open={renameCol} onClose={() => setRenameCol(false)} title="Rename Collection">
      <form onSubmit={onRenameCol}>
        <div className="p-6">
          <p className="text-txtprim text-sm mb-2">Collection Name</p>
          <input
            name="col_name"
            className="border border-txtsec text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
            defaultValue={col?.name}
            required
            maxLength={100}
            autoFocus
          />
          <div className="w-full flex justify-end items-center mt-6 gap-x-4">
            <CustomButton name="Rename" type="submit" loading={cLoading} clx="px-4 py-1" />
            <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setRenameCol(false)} />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default RenameCol;
