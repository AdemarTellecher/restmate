import { Editor } from "@monaco-editor/react";
import React from "react";
import Spinner from "../misc/Spinner";
import { useStore } from "../../store/store";

const BodyJson = ({ tabId, bodyRaw }) => {
  const updateReqBody = useStore((x) => x.updateReqBody);
  function monacoSetup(monaco) {
    monaco.editor.defineTheme("redTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#212121",
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
          onChange={(e) => updateReqBody(tabId, "bodyRaw", e)}
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
