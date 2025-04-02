import { Editor } from "@monaco-editor/react";
import React, { useRef } from "react";
import { useStore } from "../../store/store";
import { ENVIRONMENT_REGEX, extractEnv } from "../../utils/utils";

const BodyJson = ({ tabId, bodyRaw, envVars }) => {
  const updateReqBody = useStore((x) => x.updateReqBody);
  const editorRef = useRef(null);
  const decorationsRef = useRef([]);
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
          const output = extractEnv(match[0]);
          let x = envVars && envVars.find((v) => v.key === output);
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
          loading={<div className="bg-none"></div>}
          options={{
            readOnly: false,
            overviewRulerBorder: false,
            useShadowDOM: false,
            lineNumbersMinChars: 2,
            cursorBlinking: "smooth",
            codeLens: false,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: false,
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
