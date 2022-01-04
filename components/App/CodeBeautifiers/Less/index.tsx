// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { split as SplitEditor } from "react-ace";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ace = require("ace-builds/src-min-noconflict/ace");
import "ace-builds/src-min-noconflict/mode-less";
import "ace-builds/src-min-noconflict/theme-tomorrow";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import prettier from "prettier/esm/standalone.mjs";
import parserLess from "prettier/esm/parser-postcss.mjs";

ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LessFormatterBeautifier(): any {
  const [content, setContent] = React.useState(["", ""]);

  const getFormatted = React.useCallback((contentVal = []) => {
    const [inputVal] = contentVal;
    try {
      const inputLess = inputVal.toString();
      const outputLess = prettier.format(inputLess, {
        parser: "less",
        plugins: [parserLess],
      });
      setContent([inputVal, outputLess]);
    } catch (e) {
      setContent([inputVal, `invalid Less ERROR: ${e.message}`]);
    }
  }, []);

  return (
    <Paper variant="elevation" elevation={3} style={{ width: "100%" }}>
      <Grid container>
        <Grid
          item
          xs={6}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography color="textSecondary" variant="h4">
            Less
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography color="textSecondary" variant="h4">
            Formatted Less
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SplitEditor
            wrapEnabled={true}
            mode="less"
            theme="tomorrow"
            splits={2}
            orientation="beside"
            value={content}
            name="LESS_FORMAT_AND_VALIDATE"
            onChange={(value, stat) => getFormatted(value, stat)}
            showPrintMargin={false}
            width={"91%"}
            height={"80%"}
            style={{ position: "absolute" }}
            fontSize={20}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
