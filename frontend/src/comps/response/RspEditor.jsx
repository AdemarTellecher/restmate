import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { LuBraces, LuChevronDown, LuCodeXml, LuCopy, LuWrapText } from "react-icons/lu";
import { IoLogoJavascript } from "react-icons/io";
import WithTooltip from "../misc/WithTooltip";
import Spinner from "../misc/Spinner";

const RspEditor = ({ lang, bodyContent }) => {
  const [editorLang, seteditorLang] = useState(lang);
  const [wrap, setWrap] = useState(true);
  const rspRef = useRef(null);
  const formatBody = () => {
    rspRef.current.updateOptions({ readOnly: false });
    rspRef.current
      .getAction("editor.action.formatDocument")
      .run()
      .then(() => rspRef.current.updateOptions({ readOnly: true }));
  };

  console.log("editorlang", editorLang);
  const bodyTypeIcon = (l) => {
    if (l === "JSON") {
      return (
        <>
          <LuBraces />
          JSON
        </>
      );
    }
    if (l === "HTML") {
      return (
        <>
          <LuCodeXml />
          HTML
        </>
      );
    }
    if (l === "JAVASCRIPT") {
      return (
        <>
          <IoLogoJavascript />
          Javascript
        </>
      );
    }
  };
  function rgbToHex(rgb) {
    let rgbValues = rgb.match(/\d+/g);
    return `#${rgbValues.map((val) => Number(val).toString(16).padStart(2, "0")).join("")}`;
  }
  function monacoSetup(monaco) {
    console.log("theme ", monaco);
    let styles = getComputedStyle(document.documentElement);
    let brandrgb = styles.getPropertyValue("--color-brand").trim();
    let brand = rgbToHex(brandrgb);
    monaco.editor.defineTheme("redTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": brand,
      },
    });
    monaco.editor.setTheme("redTheme");
  }
  const editorMount = (e) => {
    rspRef.current = e;
  };
  return (
    <div className="h-full w-full grid pt-2" style={{ gridTemplateRows: "min-content minmax(0, 100%)", gridTemplateColumns: "minmax(0px, 100%)" }}>
      <div className="flex justify-between items-center">
        <div className="">
          <Menu
            menuButton={
              <button className="shrink-0 h-full cursor-pointer flex justify-center items-center gap-x-1 text-txtsec font-bold text-sm">
                {bodyTypeIcon(editorLang)}
                <LuChevronDown size="16" />
              </button>
            }
            menuClassName="!bg-sec"
            unmountOnClose={false}
            align="start"
            direction="bottom"
            gap={6}
          >
            <MenuItem className="text-txtprim text-sm" onClick={() => seteditorLang("HTML")}>
              <div className="flex items-center gap-x-2">{bodyTypeIcon("HTML")}</div>
            </MenuItem>
            <MenuItem className="text-txtprim text-sm" onClick={() => seteditorLang("JSON")}>
              <div className="flex items-center gap-x-2">{bodyTypeIcon("JSON")}</div>
            </MenuItem>
            <MenuItem className="text-txtprim text-sm" onClick={() => seteditorLang("JAVASCRIPT")}>
              <div className="flex items-center gap-x-2">{bodyTypeIcon("JAVASCRIPT")}</div>
            </MenuItem>
          </Menu>
        </div>
        <div className="flex justify-end items-center gap-x-2 text-txtsec">
          <WithTooltip text={"Format"}>
            <div className="hover:text-lit cursor-pointer relative group" onClick={formatBody}>
              <LuBraces size="16" />
            </div>
          </WithTooltip>
          <WithTooltip text={"Wrap Lines"}>
            <div className="hover:text-lit cursor-pointer" onClick={() => setWrap(!wrap)}>
              <LuWrapText size="16" />
            </div>
          </WithTooltip>
          <WithTooltip text={"Copy"}>
            <div className="hover:text-lit cursor-pointer">
              <LuCopy size="16" />
            </div>
          </WithTooltip>
        </div>
      </div>
      <div className="pt-2 h-full w-full">
        <div className="h-full w-full border border-lines">
          <Editor
            onMount={(e) => editorMount(e)}
            width="100%"
            height="100%"
            language={editorLang === "JAVASCRIPT" ? "Javascript" : editorLang === "HTML" ? "html" : "json"}
            saveViewState={false}
            theme="redTheme"
            className="myeditor"
            value={bodyContent}
            loading={
              <div className="flex justify-center items-center h-full w-full">
                <Spinner />
              </div>
            }
            options={{
              readOnly: true,
              overviewRulerBorder: false,
              useShadowDOM: false,
              lineNumbersMinChars: 3,
              cursorBlinking: "smooth",
              codeLens: false,
              scrollBeyondLastLine: false,
              wordWrap: wrap ? "on" : "off",
              formatOnPaste: true,
              formatOnType: true,
              minimap: {
                enabled: false,
              },
            }}
            beforeMount={monacoSetup}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RspEditor);
