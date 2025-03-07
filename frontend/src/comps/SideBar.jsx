import { useState } from "react";
import { LuFileCog, LuFolder, LuPlus, LuCog } from "react-icons/lu";
import { collections } from "../store/collSlice";
import Collections from "./Collections";

const SideBar = () => {
  const [colOpen, setColOpen] = useState(false);
  let closeW = "50px";
  let openW = "250px";

  const applytheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
  };
  return (
    <div className="w-full h-full flex">
      <div style={{ width: closeW }} className="h-full border-r border-lines" id="sidebar-main">
        <div className="h-full pb-2">
          <div
            className={`${colOpen ? "text-lit bg-sec" : "text-txtsec"} w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit`}
            style={{ height: "48px" }}
            onClick={() => setColOpen(!colOpen)}
          >
            <LuFolder size="22" />
          </div>
          <div
            className="text-txtsec w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit"
            style={{ height: "48px" }}
            onClick={() => applytheme("postman")}
          >
            <LuFileCog size="22" />
          </div>
          <div
            className="text-txtsec w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit"
            style={{ height: "48px" }}
            onClick={() => applytheme("")}
          >
            <LuCog size="22" />
          </div>
        </div>
      </div>
      <div style={{ width: colOpen ? openW : 0, transition: "width, 300ms" }} className="overflow-hidden" id="colls-bar">
        <div className="border-r border-lines w-full h-full">
          <div className="text-txtprim flex justify-between items-center p-2 border-b border-lines" style={{ height: "48px" }} id="colls-topbar">
            <div className="flex justify-start items-center gap-x-0.5 cursor-pointer hover:text-lit">
              <LuPlus size="18" />
              <p className="text-sm">New</p>
            </div>
            <div className="text-xs text-txtprim bg-sec py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-lit">
              <p>Import</p>
            </div>
          </div>
          <div id="colls-map" className="py-2">
            {collections.map((c) => (
              <Collections key={c.id} col={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
