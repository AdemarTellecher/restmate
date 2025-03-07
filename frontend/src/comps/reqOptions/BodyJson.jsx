import { Editor } from "@monaco-editor/react";
import React from "react";
import Spinner from "../misc/Spinner";
import { useStore } from "../../store/store";

const BodyJson = ({ tabId, bodyRaw }) => {
  const updateTab = useStore((x) => x.updateTab);
  function rgbToHex(rgb) {
    let rgbValues = rgb.match(/\d+/g);
    return `#${rgbValues.map((val) => Number(val).toString(16).padStart(2, "0")).join("")}`;
  }
  function monacoSetup(monaco) {
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

  return (
    <div className="pt-2 h-full w-full">
      <div className="h-full w-full border border-lines">
        <Editor
          width="100%"
          height="100%"
          defaultLanguage="json"
          theme="redTheme"
          className="myeditor"
          value={bodyRaw}
          onChange={(e) => updateTab(tabId, "bodyRaw", e)}
          loading={
            <div className="flex justify-center items-center h-full w-full">
              <Spinner />
            </div>
          }
          options={{
            readOnly: false,
            overviewRulerBorder: false,
            useShadowDOM: false,
            lineNumbersMinChars: 3,
            cursorBlinking: "smooth",
            codeLens: false,
            scrollBeyondLastLine: false,
            wordWrap: "on",
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
  );
};

export default React.memo(BodyJson);
