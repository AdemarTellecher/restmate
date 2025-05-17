import { LuInfo, LuKeyboard, LuPalette, LuX } from "react-icons/lu";
import ModalLayout from "../misc/ModalLayout";
import { useState } from "react";
import Themes from "./Themes";
import AboutUs from "./AboutUs";
import Shortcuts from "./Shortcuts";

const SettingModal = ({ settingModal, setsettingModal }) => {
  const [currentSetting, setcurrentSetting] = useState("themes");
  const getClx = (x) => {
    let clx = "w-full px-2 py-2 hover:bg-txtsec rounded-sm flex items-center gap-x-2 text-lit mt-2 cursor-pointer";
    if (currentSetting === x) {
      clx += " bg-txtsec";
    }
    return clx;
  };
  return (
    <ModalLayout open={settingModal} onClose={() => setsettingModal(false)} title="Settings" size="xl" header={false}>
      <div className="flex" style={{ height: "500px", maxHeight: "800px" }}>
        <div className="bg-sec h-full basis-3/12 p-4 overflow-y-auto">
          {/*
          <div className={getClx("general")} onClick={() => setcurrentSetting("general")}>
            <LuCog />
            <p className="text-xs">General</p>
          </div>
          */}
          <div className={getClx("themes")} onClick={() => setcurrentSetting("themes")}>
            <LuPalette />
            <p className="text-xs">Themes</p>
          </div>
          <div className={getClx("shortcuts")} onClick={() => setcurrentSetting("shortcuts")}>
            <LuKeyboard />
            <p className="text-xs">Shortcuts</p>
          </div>
          <div className={getClx("about")} onClick={() => setcurrentSetting("about")}>
            <LuInfo />
            <p className="text-xs">About</p>
          </div>
        </div>
        <div className="bg-brand h-full basis-9/12">
          <div className="grid h-full w-full" style={{ gridTemplateRows: "32px minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
            <div className="flex justify-end items-center pr-1 h-full">
              <div onClick={() => setsettingModal(false)} className="text-txtsec rounded-md hover:text-lit hover:bg-sec cursor-pointer p-1">
                <LuX size="22" />
              </div>
            </div>
            {currentSetting === "themes" && <Themes />}
            {currentSetting === "about" && <AboutUs />}
            {currentSetting === "shortcuts" && <Shortcuts />}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SettingModal;
