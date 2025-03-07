import React from "react";
import { LuCircle, LuCircleCheckBig, LuPlus, LuTrash2 } from "react-icons/lu";
import { useStore } from "../../store/store";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { LuChevronDown } from "react-icons/lu";

const BodyFormData = ({ tabId, formData }) => {
  const updateFormData = useStore((x) => x.updateFormData);
  const deleteFormData = useStore((x) => x.deleteFormData);
  const addFormData = useStore((x) => x.addFormData);
  return (
    <div className="pt-2 h-full grid" style={{ gridTemplateRows: "fit-content(100%) min-content" }}>
      <div className="border border-lines overflow-y-auto overflow-x-hidden">
        {formData &&
          formData.map((p) => (
            <div key={p.id} className="flex items-center border-b border-lines last:border-none h-10">
              <div className="border-r border-lines grow h-full">
                <input
                  value={p.key}
                  className="outline-none text-txtprim px-2 w-full h-full focus:text-lit focus:bg-sec"
                  placeholder="key"
                  maxLength="99"
                  onChange={(e) => updateFormData(tabId, p.id, "key", e.target.value)}
                />
              </div>
              <div className="border-r border-lines grow h-full">
                <Menu
                  menuButton={
                    <button className="px-4 w-full h-full cursor-pointer flex justify-start items-center gap-x-1 text-txtsec text-sm capitalize">
                      {p.type}
                      <LuChevronDown size="16" />
                    </button>
                  }
                  menuClassName="!bg-sec"
                  unmountOnClose={true}
                  align="start"
                  direction="bottom"
                  gap={6}
                >
                  <MenuItem className="text-txtprim" onClick={() => updateFormData(tabId, p.id, "type", "text")}>
                    Text
                  </MenuItem>
                  <MenuItem className="text-txtprim" onClick={() => updateFormData(tabId, p.id, "type", "file")}>
                    File
                  </MenuItem>
                </Menu>
              </div>
              <div className="grow h-full">
                <input
                  value={p.value}
                  className="outline-none text-txtprim px-2 w-full h-full focus:text-lit focus:bg-sec"
                  placeholder="value"
                  maxLength="999"
                  onChange={(e) => updateFormData(tabId, p.id, "value", e.target.value)}
                />
              </div>
              <div
                className="h-full flex items-center px-2 hover:bg-sec cursor-pointer border-x border-lines"
                onClick={() => updateFormData(tabId, p.id, "active", !p.active)}
              >
                {p.active ? <LuCircleCheckBig className="text-green-500" /> : <LuCircle className="text-txtsec" />}
              </div>
              <div className="h-full flex items-center px-2 hover:bg-sec cursor-pointer" onClick={() => deleteFormData(tabId, p.id)}>
                <LuTrash2 className="text-red-500" />
              </div>
            </div>
          ))}
      </div>
      {!formData.length || (formData.length && formData[formData.length - 1].key !== "" && formData.length < 20) ? (
        <div className="flex mt-2">
          <div className="flex items-center gap-x-1 text-txtsec text-sm font-bold cursor-pointer hover:text-accent" onClick={() => addFormData(tabId)}>
            <LuPlus size="16" />
            <p>New</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(BodyFormData);
