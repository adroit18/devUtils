import React from "react";
import { diff as DiffEditor } from "react-ace";
const Diff = require("diff");

import "ace-builds/src-noconflict/theme-github";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";

export default function TextDiff(): JSX.Element {
  const [content, setContent] = React.useState([
    "//paste first version of text here",
    "//paste second version of text here",
  ]);

  const [selectedDiffMethod, setSelectedDiffMethod] =
    React.useState("diffWords");

  React.useEffect(() => {
    const display = document.getElementById("actualDiff");
    display.innerHTML = "";
    const fragment = document.createDocumentFragment();
    let diff = Diff?.diffWords(content[0], content[1]);
    console.log(selectedDiffMethod);
    if (selectedDiffMethod == "diffWords") {
      diff = Diff?.diffWords(content[0], content[1]);
    } else if (selectedDiffMethod == "diffChars") {
      diff = Diff?.diffChars(content[0], content[1]);
    } else if (selectedDiffMethod == "diffWordsWithSpace") {
      diff = Diff?.diffWordsWithSpace(content[0], content[1]);
    } else if (selectedDiffMethod == "diffLines") {
      diff = Diff?.diffLines(content[0], content[1]);
    } else if (selectedDiffMethod == "diffSentences") {
      diff = Diff?.diffSentences(content[0], content[1]);
    } else if (selectedDiffMethod == "diffJson") {
      diff = Diff?.diffJson(content[0], content[1]);
    } else if (selectedDiffMethod == "diffCss") {
      diff = Diff?.diffCss(content[0], content[1]);
    } else if (selectedDiffMethod == "diffArrays") {
      diff = Diff?.diffArrays(content[0], content[1]);
    }

    diff.forEach((part) => {
      const color = part.added ? "green" : part.removed ? "red" : "grey";
      const span = document.createElement("span");
      span.style.color = color;
      span.style.fontSize = "30px";
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    });
    display?.appendChild(fragment);
  });

  return (
    <Grid container style={{ marginLeft: "5%" }}>
      <Grid item xs={12} container direction="row">
        <DiffEditor
          value={content}
          mode="text"
          onChange={(val: string[]) => setContent(val)}
          orientation="beside"
          width={"90%"}
          height={"80%"}
          style={{ position: "absolute" }}
          fontSize={20}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction="row"
        style={{ position: "absolute", top: "96%" }}
        spacing={2}
      >
        <Grid item xs={12} container direction="row">
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography variant="h5" color="primary">
                Choose Diff Method
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-label="diffMethod"
              name="diffMethod"
              value={selectedDiffMethod}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedDiffMethod((event.target as HTMLInputElement).value)
              }
            >
              <FormControlLabel
                value="diffChars"
                control={<Radio />}
                label="Chars (compares character by character)"
              />
              <FormControlLabel
                value="diffWords"
                control={<Radio />}
                label="diffWords (compares word by word, ignoring whitespace)"
              />
              <FormControlLabel
                value="diffWordsWithSpace"
                control={<Radio />}
                label="Words With Space (compares word by word, treating whitespace as significant)"
              />
              <FormControlLabel
                value="diffLines"
                control={<Radio />}
                label="diffLines (compares line by line)"
              />
              <FormControlLabel
                value="diffSentences"
                control={<Radio />}
                label="diffSentences (compares sentence by sentence)"
              />
              <FormControlLabel
                value="diffJson"
                control={<Radio />}
                label="Json (diffs two JSON objects, compares the fields defined on each)"
              />
              <FormControlLabel
                value="diffArrays"
                control={<Radio />}
                label="Arrays (compares the fields defined on two arrays using ===)"
              />
              <FormControlLabel
                value="diffCss"
                control={<Radio />}
                label="CSS (compares CSS tokens)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} container direction="row">
          <Typography variant="h5" color="primary">
            Exact Difference
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          style={{ marginTop: "1%" }}
        >
          <div id="actualDiff"></div>
        </Grid>
      </Grid>
    </Grid>
  );
}
