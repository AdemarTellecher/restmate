import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";
import { useStore } from "../../store/store";
import { ENVIRONMENT_REGEX } from "../../utils/utils";

const BodyJson = ({ tabId, bodyRaw }) => {
  const updateReqBody = useStore((x) => x.updateReqBody);
  const theme = useStore((x) => x.settings.theme);
  useEffect(() => {
    if (monacoRef.current) {
      setMonacoBackground(monacoRef.current);
    }
  }, [theme]);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);

  function monacoSetup(monaco) {
    monacoRef.current = monaco;
    setMonacoBackground(monaco);
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
        return {
          range: new monaco.Range(startPos.lineNumber, startPos.column, endPos.lineNumber, endPos.column),
          options: {
            inlineClassName: "manacoEnvFound",
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
          theme="restTheme"
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

export default React.memo(BodyJson);
