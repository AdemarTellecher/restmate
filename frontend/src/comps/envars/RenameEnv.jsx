import { toast } from "react-toastify";
import { useStore } from "../../store/store";
import CustomButton from "../misc/CustomButton";
import ModalLayout from "../misc/ModalLayout";

const RenameEnv = ({ env, renameEnv, setrenameEnv }) => {
  let envLoading = useStore((x) => x.envLoading);
  const onRenameCol = async (e) => {
    e.preventDefault();
    let n = e.target.env_name.value;
    if (!n || n === "") {
      toast.warn("Name cannot be empty.");
      return;
    }
    let rsp = await useStore.getState().renameEnv(env.id, n);
    if (rsp) {
      setrenameEnv(false);
      toast.success("Environment renamed successfully!");
    } else {
      toast.error("Error! Cannot rename Environment.");
    }
  };
  return (
    <ModalLayout open={renameEnv} onClose={() => setrenameEnv(false)} title="Rename Environment">
      <form onSubmit={onRenameCol}>
        <div className="p-6">
          <p className="text-txtprim text-sm mb-2">Environment Name</p>
          <input
            name="env_name"
            className="border border-txtsec text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
            defaultValue={env?.name}
            required
            maxLength={100}
            autoFocus
          />
          <div className="w-full flex justify-end items-center mt-6 gap-x-4">
            <CustomButton name="Rename" type="submit" loading={envLoading} clx="px-4 py-1" />
            <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setrenameEnv(false)} />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default RenameEnv;
