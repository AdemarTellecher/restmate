import { useState } from "react";
import { LuFileCog, LuFolder, LuPlus, LuCog } from "react-icons/lu";
import { collections } from "../../store/collSlice";
import Collections from "./Collections";
import ModalLayout from "./ModalLayout";

const SideBar = () => {
  const [colOpen, setColOpen] = useState(false);
  const [newColModal, setnewColModal] = useState(false);
  let closeW = "50px";
  let openW = "250px";

  const applytheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
  };
  console.log("cols ->", collections);
  const createNewCollection = (e) => {
    e.preventDefault();
    console.log(e.target.coll_name.value);
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
            <div className="flex justify-start items-center gap-x-0.5 cursor-pointer hover:text-lit" onClick={() => setnewColModal(true)}>
              <LuPlus size="18" />
              <p className="text-sm">New</p>
            </div>
            <div className="text-xs text-txtprim bg-sec py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-lit">
              <p>Import</p>
            </div>
          </div>
          <div id="colls-map" className="py-2">
            {collections?.length && collections.map((c) => <Collections key={c.id} col={c} />)}
          </div>
        </div>
      </div>
      {newColModal && (
        <ModalLayout close={() => setnewColModal(false)} title="New Collection">
          <form onSubmit={createNewCollection}>
            <div className="p-6">
              <p className="text-txtprim text-sm mb-2">Collection Name</p>
              <input
                name="coll_name"
                className="border border-txtsec text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
                required
                maxLength={100}
                autoFocus
              />
              <div className="w-full flex justify-end items-center mt-6 gap-x-4">
                <button type="submit" className="bg-accent px-4 py-1 text-lit font-bold rounded-sm active:bg-accent/80 cursor-pointer">
                  Create
                </button>
                <button className="bg-txtsec px-4 py-1 text-lit font-bold rounded-sm active:bg-txtsec/80 cursor-pointer" onClick={() => setnewColModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </ModalLayout>
      )}
    </div>
  );
};

export default SideBar;
