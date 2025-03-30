import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";
import Spinner from "../misc/Spinner";
import { useStore } from "../../store/store";

const ENVIRONMENT_REGEX = /\{\{([\w.-]+)\}\}/g;

const BodyJson = ({ tabId, bodyRaw, envVars }) => {
  console.log("envars changed -->", envVars)
  const updateReqBody = useStore((x) => x.updateReqBody);
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
  const envs = useRef([]);
  useEffect(() => {
    if (envVars && envVars.length) {
      envs.current = envVars
      console.log("useEf if ->")
    };
  }, [envVars]);
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
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    updateDecorations(editor, monaco);
    editor.onDidChangeModelContent(() => {
      updateDecorations(editor, monaco);
    });
  }
  function updateDecorations(editor, monaco) {
    if (!editor) return;
    const model = editor.getModel();
    if (!model) return;

    const matches = [...model.getValue().matchAll(ENVIRONMENT_REGEX)];
    const decorations =
      matches &&
      matches.map((match) => {
        const start = match.index;
        const end = start + match[0].length;
        const startPos = model.getPositionAt(start);
        const endPos = model.getPositionAt(end);
        let clx = "";
        let tooltip = "Value: Variable Not found!";
        if (match[0]) {
          const output = match[0].replace(/\{\{([\w.-]+)\}\}/, "$1");
          let x = envs.current && envs.current.find((v) => v.key === output);
          if (!x) {
            clx = "manacoEnvError";
          } else {
            clx = "manacoEnvFound";
            tooltip = `Value: ${x.value}`;
          }
        }
        return {
          range: new monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
          options: {
            inlineClassName: clx,
            hoverMessage: {
              value: tooltip,
            },
          },
        };
      });
    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, decorations);
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
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default React.memo(BodyJson);
