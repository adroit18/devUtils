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

const EXACT_DIFF_OPTIONS: {
  [key: string]: {
    callback: (text1: string, text2: string) => void;
    description: string;
  };
} = {
  diffWords: {
    callback: Diff?.diffWords,
    description: "Words (compares word by word, ignoring whitespace)",
  },
  diffChars: {
    callback: Diff?.diffChars,
    description: "Chars (compares character by character)",
  },
  diffWordsWithSpace: {
    callback: Diff?.diffWordsWithSpace,
    description:
      "Words With Space (compares word by word, treating whitespace as significant)",
  },
  diffLines: {
    callback: Diff?.diffLines,
    description: "Lines (compares line by line)",
  },
  diffSentences: {
    callback: Diff?.diffSentences,
    description: "Sentences (compares sentence by sentence)",
  },
  diffJson: {
    callback: Diff?.diffJson,
    description:
      "Json (diffs two JSON objects, compares the fields defined on each)",
  },
  diffCss: {
    callback: Diff?.diffCss,
    description: "CSS (compares CSS tokens)",
  },
  diffArrays: {
    callback: Diff?.diffArrays,
    description: "Arrays (compares the fields defined on two arrays using ===)",
  },
};
export default function TextDiff(): JSX.Element {
  const [content, setContent] = React.useState([
    "//paste first version of text here",
    "//paste second version of text here",
  ]);

  const [selectedDiffMethod, setSelectedDiffMethod] =
    React.useState<string>("diffWords");

  React.useEffect(() => {
    const display = document.getElementById("actualDiff");
    if (display) {
      display.innerHTML = "";
      const fragment = document.createDocumentFragment();
      let diff = Diff?.diffWords(content[0], content[1]);
      const availableFunc = EXACT_DIFF_OPTIONS[selectedDiffMethod].callback;
      diff = availableFunc(content[0], content[1]);
      diff.forEach(
        (part: { added: string; removed: string; value: string }) => {
          const color = part.added ? "green" : part.removed ? "red" : "grey";
          const span = document.createElement("span");
          span.style.color = color;
          span.style.fontSize = "30px";
          span.appendChild(document.createTextNode(part.value));
          fragment.appendChild(span);
        }
      );
      display?.appendChild(fragment);
    }
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
              {Object.keys(EXACT_DIFF_OPTIONS).map((option, key) => {
                return (
                  <FormControlLabel
                    key={`${option}${key}`}
                    value={option}
                    control={<Radio />}
                    label={EXACT_DIFF_OPTIONS[option].description}
                  />
                );
              })}
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
          // style={{ marginTop: "0.5%" }}
        >
          <div id="actualDiff"></div>
        </Grid>
      </Grid>
    </Grid>
  );
}
