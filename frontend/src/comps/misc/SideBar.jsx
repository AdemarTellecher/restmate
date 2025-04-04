import { useState } from "react";
import { nanoid } from "nanoid";
import { LuFolder, LuPlus, LuCog, LuContainer } from "react-icons/lu";
import ModalLayout from "./ModalLayout";
import CustomButton from "./CustomButton";
import { useStore } from "../../store/store";
import Collection from "../collections/Collection";
import Tippy from "@tippyjs/react";
import EnvVar from "../envars/EnvVar";

const SideBar = () => {
  const [newColModal, setnewColModal] = useState(false);
  const [newEnvModal, setnewEnvModal] = useState(false);
  let cLoading = useStore((x) => x.cLoading);
  let envLoading = useStore((x) => x.envLoading);
  let envs = useStore((x) => x.envs);
  let cols = useStore((x) => x.collections);
  let sideBarType = useStore((x) => x.sideBarType);
  let closeW = "50px";
  let openW = "250px";

  const applytheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
  };
  const createNewEnv = async (e) => {
    e.preventDefault();
    let name = e.target.env_name.value;
    if (!name) return;
    let success = await useStore.getState().addEnv(name);
    if (success) {
      setnewEnvModal(false);
    }
  };
  const createNewCollection = async (e) => {
    e.preventDefault();
    let c = {
      id: nanoid(),
      name: e.target.coll_name.value,
    };
    let success = await useStore.getState().addCols(c);
    if (success) {
      setnewColModal(false);
    }
  };
  return (
    <div className="w-full h-full flex">
      <div style={{ width: closeW }} className="h-full border-r border-lines" id="sidebar-main">
        <div className="h-full pb-2">
          <Tippy content="Collections" delay="300">
            <div
              className={`${sideBarType === "col" ? "text-lit bg-sec" : "text-txtsec"} w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit`}
              style={{ height: "48px" }}
              onClick={() => useStore.getState().setSideBar("col")}
            >
              <LuFolder size="22" />
            </div>
          </Tippy>
          <Tippy content="Environment" delay="300">
            <div
              className={`${sideBarType === "env" ? "text-lit bg-sec" : "text-txtsec"} w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit`}
              style={{ height: "48px" }}
              onClick={() => useStore.getState().setSideBar("env")}
            >
              <LuContainer size="22" />
            </div>
          </Tippy>
          <Tippy content="Settings" delay="300">
            <div
              className="text-txtsec w-full flex justify-center items-center cursor-pointer hover:bg-sec hover:text-lit"
              style={{ height: "48px" }}
              onClick={() => applytheme("ayu")}
            >
              <LuCog size="22" />
            </div>
          </Tippy>
        </div>
      </div>
      <div style={{ width: sideBarType === "col" ? openW : 0 }} className="overflow-hidden h-full" id="colls-bar">
        <div className="border-r border-lines w-full h-full">
          <div className="text-txtprim flex justify-between items-center p-2 border-b border-lines" style={{ height: "48px" }} id="colls-topbar">
            <Tippy content="New Collection" delay="300">
              <div className="flex justify-start items-center gap-x-0.5 cursor-pointer hover:text-lit" onClick={() => setnewColModal(true)}>
                <LuPlus size="18" />
                <p className="text-sm">New</p>
              </div>
            </Tippy>
            <Tippy content="Import Collection" delay="300">
              <div className="text-xs text-txtprim bg-sec py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-600 hover:text-lit">
                <p>Import</p>
              </div>
            </Tippy>
          </div>
          <div id="colls-map" className="py-2 overflow-y-auto" style={{ height: "calc(100% - 48px)" }}>
            {cols?.length ? cols.map((c) => <Collection key={c.id} col={c} />) : null}
          </div>
        </div>
      </div>
      <div style={{ width: sideBarType === "env" ? openW : 0 }} className="overflow-hidden h-full" id="env-bar">
        <div className="border-r border-lines w-full h-full">
          <div className="text-txtprim flex justify-between items-center p-2 border-b border-lines" style={{ height: "48px" }} id="colls-topbar">
            <Tippy content="New Environment" delay="300">
              <div className="flex justify-start items-center gap-x-0.5 cursor-pointer hover:text-lit" onClick={() => setnewEnvModal(true)}>
                <LuPlus size="18" />
                <p className="text-sm">New</p>
              </div>
            </Tippy>
          </div>
          <div id="env-map" className="py-2 overflow-y-auto" style={{ height: "calc(100% - 48px)" }}>
            {envs?.length ? envs.map((e) => <EnvVar key={e.id} env={e} />) : null}
          </div>
        </div>
      </div>
      <ModalLayout open={newColModal} onClose={() => setnewColModal(false)} title="New Collection">
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
              <CustomButton name="Create" type="submit" loading={cLoading} clx="px-4 py-1" />
              <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setnewColModal(false)} />
            </div>
          </div>
        </form>
      </ModalLayout>
      <ModalLayout open={newColModal} onClose={() => setnewColModal(false)} title="New Collection">
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
              <CustomButton name="Create" type="submit" loading={cLoading} clx="px-4 py-1" />
              <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setnewColModal(false)} />
            </div>
          </div>
        </form>
      </ModalLayout>
      <ModalLayout open={newEnvModal} onClose={() => setnewEnvModal(false)} title="New Environment">
        <form onSubmit={createNewEnv}>
          <div className="p-6">
            <p className="text-txtprim text-sm mb-2">Environment Name</p>
            <input
              name="env_name"
              className="border border-txtsec text-lit w-full outline-none p-1 px-3 text-lg focus:border-txtprim rounded-sm"
              required
              maxLength={100}
              autoFocus
            />
            <div className="w-full flex justify-end items-center mt-6 gap-x-4">
              <CustomButton name="Create" type="submit" loading={envLoading} clx="px-4 py-1" />
              <CustomButton name="Close" bg="bg-txtsec" clx="px-4 py-1" onClick={() => setnewEnvModal(false)} />
            </div>
          </div>
        </form>
      </ModalLayout>
    </div>
  );
};

export default SideBar;
