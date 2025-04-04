import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { LuBraces, LuChevronDown, LuCodeXml, LuCopy, LuWrapText } from "react-icons/lu";
import { IoLogoJavascript } from "react-icons/io";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { useStore } from "../../store/store";

const RspEditor = ({ lang, bodyContent }) => {
  const [editorLang, seteditorLang] = useState(lang);
  const [wrap, setWrap] = useState(true);
  const rspRef = useRef(null);
  const monacoRef = useRef(null);
  const theme = useStore((x) => x.settings.theme);
  useEffect(() => {
    if (monacoRef.current) {
      setMonacoBackground(monacoRef.current);
    }
  }, [theme]);
  const formatBody = () => {
    rspRef.current.updateOptions({ readOnly: false });
    rspRef.current
      .getAction("editor.action.formatDocument")
      .run()
      .then(() => rspRef.current.updateOptions({ readOnly: true }));
  };
  useEffect(() => {
    seteditorLang(lang);
  }, [lang]);
  const onCopy = (str) => {
    navigator.clipboard.writeText(str).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

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
  function monacoSetup(monaco) {
    monacoRef.current = monaco;
    setMonacoBackground(monaco);
  }
  const editorMount = (e) => {
    rspRef.current = e;
    e.updateOptions({ readOnly: false });
    e.getAction("editor.action.formatDocument")
      .run()
      .then(() => rspRef.current.updateOptions({ readOnly: true }));
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
          <Tippy content="Format">
            <div className="hover:text-lit cursor-pointer relative group" onClick={formatBody}>
              <LuBraces size="16" />
            </div>
          </Tippy>
          <Tippy content="Wrap Lines">
            <div className="hover:text-lit cursor-pointer" onClick={() => setWrap(!wrap)}>
              <LuWrapText size="16" />
            </div>
          </Tippy>
          <Tippy content="Copy this large text">
            <div className="hover:text-lit cursor-pointer" onClick={() => onCopy(bodyContent)}>
              <LuCopy size="16" />
            </div>
          </Tippy>
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
            theme="restTheme"
            className="myeditor"
            value={bodyContent}
            loading={<div className="bg-none"></div>}
            options={{
              readOnly: true,
              overviewRulerBorder: false,
              useShadowDOM: false,
              lineNumbersMinChars: 2,
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
function setMonacoBackground(monaco) {
  const brandColor = getComputedStyle(document.documentElement).getPropertyValue("--color-brand").trim();
  monaco.editor.defineTheme("restTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": brandColor,
    },
  });
  monaco.editor.setTheme("restTheme");
}

export default React.memo(RspEditor);
