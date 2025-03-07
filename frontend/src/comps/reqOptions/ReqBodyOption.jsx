import React from "react";
import { useStore } from "../../store/store";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { LuChevronDown } from "react-icons/lu";

const ReqBodyOption = ({ tabId, bodyType }) => {
  const updateTab = useStore((x) => x.updateTab);
  return (
    <div className="">
      <Menu
        menuButton={
          <button className="shrink-0 h-full cursor-pointer flex justify-center items-center gap-x-1 text-txtsec text-sm font-bold">
            {bodyType}
            <LuChevronDown size="16" />
          </button>
        }
        menuClassName="!bg-sec"
        unmountOnClose={false}
        align="start"
        direction="bottom"
        gap={6}
      >
        <MenuItem className="text-txtprim" onClick={() => updateTab(tabId, "bodyType", "json")}>
          json
        </MenuItem>
        <MenuItem className="text-txtprim" onClick={() => updateTab(tabId, "bodyType", "formdata")}>
          formdata
        </MenuItem>
        <MenuItem className="text-txtprim" onClick={() => updateTab(tabId, "bodyType", "none")}>
          none
        </MenuItem>
      </Menu>
    </div>
  );
};

export default React.memo(ReqBodyOption);
