import { useCollapse } from "react-collapsed";
import { LuChevronDown, LuChevronRight, LuEllipsis } from "react-icons/lu";
import { Menu, MenuItem } from "@szhsin/react-menu";
import RequestList from "./RequestList";
import { useState } from "react";
import RenameCol from "./RenameCol";

const Collection = ({ col }) => {
  const [renameCol, setRenameCol] = useState(false);
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
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
                <LuEllipsis size="18" />
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
          <MenuItem className="text-txtprim text-sm" onClick={() => console.log("export", col.name)}>
            Export
          </MenuItem>
          <MenuItem className="text-red-400 text-sm" onClick={() => console.log("delete", col.name)}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <section {...getCollapseProps()}>{col.requests && col.requests.map((a) => <RequestList req={a} key={a.id} />)}</section>
      <RenameCol renameCol={renameCol} setRenameCol={setRenameCol} col={col} />
    </div>
  );
};

export default Collection;
