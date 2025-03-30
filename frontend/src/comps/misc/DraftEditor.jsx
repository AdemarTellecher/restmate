import Tippy from "@tippyjs/react";
import { CompositeDecorator, ContentState, Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

import { useRef, useState } from "react";
import { ENVIRONMENT_REGEX, extractEnv } from "../../utils/utils";

const DraftEditor = ({ value, setValue, fontsm = true }) => {
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HandleSpan,
    },
  ]);

  const [focus, setfocus] = useState(false);
  const drafteditRef = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(value), compositeDecorator));
  const onHandleChanage = (e) => {
    setEditorState(e);
    const text = e.getCurrentContent().getPlainText();
    setValue(text);
  };
  function hashtagStrategy(contentBlock, callback) {
    findWithRegex(ENVIRONMENT_REGEX, contentBlock, callback);
  }

  function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }

  return (
    <div className={`h-full w-full text-lit flex items-center cursor-text ${fontsm ? "text-sm" : "text-lg"}`} onClick={() => drafteditRef.current.focus()}>
      <div
        className={`${focus ? "h-fit min-h-full relative self-start z-50 outline-2 outline-blue-500 pt-1" : `${fontsm ? "h-5" : "h-8"} overflow-hidden`} w-full bg-brand rounded-sm break-all px-2`}
      >
        <Editor
          ref={drafteditRef}
          editorState={editorState}
          onChange={(e) => onHandleChanage(e)}
          autoCapitalize="false"
          handleReturn={() => "handled"}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
        />
      </div>
    </div>
  );
};
const HandleSpan = (props) => {
  let x = extractEnv(props?.decoratedText);
  console.log("p -> ", x);

  return (
    <Tippy content="qpowjepqwoj powq jpoqw jpowq">
      <div className="relative group inline-block" data-offset-key={props.offsetKey}>
        <span className="text-lit italic bg-green-600 font-bold rounded-md">{props.children}</span>
      </div>
    </Tippy>
  );
};

export default DraftEditor;
