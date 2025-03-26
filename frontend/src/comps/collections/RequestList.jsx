import { LuEllipsis } from "react-icons/lu";
import { useStore } from "../../store/store";
import { getReqType } from "../../utils/helper";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import RenameReq from "./RenameReq";

const RequestList = ({ req }) => {
  const [renameModal, setRenameModal] = useState(false);
  return (
    <div key={req.id} className="hover:bg-sec hover:text-lit pl-7 py-1 cursor-pointer group flex items-center">
      <div className="grow overflow-hidden flex items-center" onClick={() => useStore.getState().openTab(req)}>
        <div className="mr-2 text-xs">{getReqType(req.method)}</div>
        <p className="truncate whitespace-nowrap overflow-ellipsis text-sm" style={{ width: "90%" }}>
          {req.name}
        </p>
      </div>
      <Menu
        menuButton={({ open }) => (
          <div className={`${open ? "block" : "hidden"} group-hover:block pr-2`}>
            <div className="cursor-pointer hover:text-lit">
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
        <MenuItem className="text-txtprim text-sm" onClick={() => useStore.getState().openTab(req)}>
          Open in Tab
        </MenuItem>
        <MenuItem className="text-txtprim text-sm" onClick={() => setRenameModal(true)}>
          Rename
        </MenuItem>
        <MenuItem className="text-txtprim text-sm" onClick={() => console.log("move", req.name)}>
          Move
        </MenuItem>
        <MenuItem className="text-red-400 text-sm" onClick={() => console.log("delete", req.name)}>
          Delete
        </MenuItem>
      </Menu>
      <RenameReq renameModal={renameModal} setRenameModal={setRenameModal} req={req} />
    </div>
  );
};

export default RequestList;
