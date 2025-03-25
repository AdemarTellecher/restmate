import { useCollapse } from "react-collapsed";
import { LuChevronDown, LuChevronRight, LuEllipsis } from "react-icons/lu";
import { getReqType } from "../../utils/helper";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { useStore } from "../../store/store";

const Collections = ({ col }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="text-txtprim">
      <div className={`${isExpanded ? "bg-sec text-lit" : ""} flex items-center py-1 hover:bg-sec hover:text-lit group`}>
        <div className="pl-2 pr-1 cursor-pointer" {...getToggleProps()}>
          {isExpanded ? <LuChevronDown size="18" /> : <LuChevronRight size="18" />}
        </div>
        <div className="grow overflow-hidden" {...getToggleProps()}>
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
          <MenuItem className="text-txtprim text-sm" onClick={() => console.log("qwe1", col.name)}>
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
      <section {...getCollapseProps()}>
        {col.requests &&
          col.requests.map((a) => (
            <div
              key={a.id}
              className="hover:bg-sec hover:text-lit pl-7 py-1 cursor-pointer group flex items-center"
              onClick={() => {
                useStore.getState().openTab(a);
              }}
            >
              <div className="mr-2 text-xs">{getReqType(a.method)}</div>
              <div className="grow overflow-hidden">
                <p className="truncate whitespace-nowrap overflow-ellipsis text-sm" style={{ width: "90%" }}>
                  {a.name}
                </p>
              </div>
              <div className="hidden group-hover:block pr-2">
                <div
                  className="cursor-pointer hover:text-lit"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <LuEllipsis size="18" />
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Collections;
