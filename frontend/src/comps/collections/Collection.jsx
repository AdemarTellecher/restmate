import { useCollapse } from "react-collapsed";
import { LuChevronDown, LuChevronRight, LuEllipsis } from "react-icons/lu";
import { Menu, MenuItem } from "@szhsin/react-menu";
import RequestList from "./RequestList";
import { useState } from "react";
import RenameCol from "./RenameCol";
import { ExportCollection } from "../../../wailsjs/go/main/App";
import { toast } from "react-toastify";
import { useStore } from "../../store/store";

const Collection = ({ col }) => {
  const [renameCol, setRenameCol] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const exportCollection = async () => {
    let rsp = await ExportCollection(col.id);
    if (rsp.success) {
      toast.success("Collection exported successfully!");
    } else {
      toast.error("Error! Cannot export Collection.");
    }
  };
  const onDeleteCol = async () => {
    let rsp = await useStore.getState().deleteCol(col.id);
    if (rsp) {
      toast.success("Collection deleted successfully!");
    } else {
      toast.error("Error! Cannot delete Collection.");
    }
  };
  return (
    <div className="text-txtprim">
      <div className={`${isExpanded ? "bg-sec text-lit" : ""} flex items-center py-1 hover:bg-sec hover:text-lit group`}>
        <div className="pl-2 pr-1 cursor-pointer" {...getToggleProps()}>
          {isExpanded ? <LuChevronDown size="18" /> : <LuChevronRight size="18" />}
        </div>
        <div className="grow overflow-hidden cursor-pointer" {...getToggleProps()}>
          <p className="truncate whitespace-nowrap overflow-ellipsis text-sm" style={{ width: "90%" }}>
            {col.name}
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
          <MenuItem className="text-txtprim text-sm" onClick={() => setRenameCol(true)}>
            Rename
          </MenuItem>
          <MenuItem className="text-txtprim text-sm" onClick={() => exportCollection()}>
            Export
          </MenuItem>
          <MenuItem className="text-red-400 text-sm" onClick={() => onDeleteCol()}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <section {...getCollapseProps()}>
        {col.requests && col.requests.length ? (
          col.requests.map((a) => <RequestList req={a} key={a.id} />)
        ) : (
          <div className="pl-7">
            <p className="text-sm text-txtsec">No requests found</p>
          </div>
        )}
      </section>
      <RenameCol renameCol={renameCol} setRenameCol={setRenameCol} col={col} />
    </div>
  );
};

export default Collection;
