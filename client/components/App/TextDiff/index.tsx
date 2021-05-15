import React from "react";
import { diff as DiffEditor } from "react-ace";

import "ace-builds/src-noconflict/theme-github";

export default function TextDiff(): JSX.Element {
  const [content, setContent] = React.useState(["", ""]);

  return (
    <DiffEditor
      value={content}
      mode="text"
      onChange={(val: string[]) => setContent(val)}
      orientation="beside"
      showPrintMargin={false}
      width={"90%"}
      height={"80%"}
      style={{ position: "absolute", marginLeft: "5%" }}
      fontSize={20}
    />
  );
}
