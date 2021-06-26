// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

import YAML from "json-to-pretty-yaml";
import xmlParser from "xml-js";

import AceEditor from "react-ace";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-github";
import ace from "ace-builds/src-min-noconflict/ace";
import Snackbars from "../../../Snackbars";

ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-json.js"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-yaml.js"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.8/src-noconflict/worker-xml.js"
);

export default function JsonYamlXml(): JSX.Element {
  const [jsonVal, setJsonVal] = React.useState("");
  const [yamlVal, setYamlVal] = React.useState("");
  const [xmlVal, setXmlVal] = React.useState("");
  const [error, setErrorMessage] = React.useState<string>("");
  let fetchRequestTracker = null;

  const handleJsonInput = React.useCallback((newVal) => {
    try {
      const jsonInput = JSON.parse(newVal);
      const jsonOutput = JSON.stringify(jsonInput, null, 2);
      const newXmlVal = xmlParser.json2xml(jsonOutput, {
        compact: true,
        spaces: 4,
      });
      const newYamlVal = YAML.stringify(jsonInput);
      setJsonVal(jsonOutput);
      setYamlVal(newYamlVal);
      setXmlVal(newXmlVal);
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
      setJsonVal(newVal);
    }
  }, []);

  const handleYamlInput = React.useCallback(
    async (newVal) => {
      setYamlVal(newVal);
      try {
        if (fetchRequestTracker) {
          fetchRequestTracker?.abort();
        }
        fetchRequestTracker = new AbortController();
        const signal = fetchRequestTracker?.signal;
        // fetchRequestTracker?.abort();
        const rawNewJsonVal = await fetch("/api/convertYamlToJson", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newVal }),
          signal,
        });
        const newJsonVal = await rawNewJsonVal.json();
        const newXmlVal = xmlParser.json2xml(newJsonVal, {
          compact: true,
          spaces: 4,
        });
        setJsonVal(JSON.stringify(newJsonVal));
        setXmlVal(newXmlVal);
        setErrorMessage("");
      } catch (e) {
        setErrorMessage(e.message);
      }
    },
    [fetchRequestTracker]
  );

  const handleXmlInput = React.useCallback((newVal) => {
    setXmlVal(newVal);
    try {
      const newJsonVal = xmlParser.xml2json(newVal, {
        compact: true,
        spaces: 4,
      });
      const newYamlVal = YAML.stringify(JSON.parse(newJsonVal));
      setJsonVal(newJsonVal);
      setYamlVal(newYamlVal);
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, []);

  return (
    <Paper variant="elevation" elevation={3} style={{ width: "100%" }}>
      <Grid container>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography color="textSecondary" variant="h4">
            Json
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography color="textSecondary" variant="h4">
            YAML
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography color="textSecondary" variant="h4">
            XML
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: "flex" }}>
            <AceEditor
              mode="json"
              theme="github"
              onChange={(value) => handleJsonInput(value)}
              name="JSON_EDITOR"
              editorProps={{ $blockScrolling: true }}
              value={jsonVal}
              wrapEnabled={true}
              fontSize={20}
            />
            <AceEditor
              mode="yaml"
              theme="github"
              onChange={(value) => handleYamlInput(value)}
              name="YAML_EDITOR"
              editorProps={{ $blockScrolling: true }}
              value={yamlVal}
              wrapEnabled={true}
              fontSize={20}
            />

            <AceEditor
              mode="xml"
              theme="github"
              onChange={(value) => handleXmlInput(value)}
              name="XML_EDITOR"
              editorProps={{ $blockScrolling: true }}
              value={xmlVal}
              wrapEnabled={true}
              fontSize={20}
            />
          </div>
          {error && (
            <Snackbars
              message={error}
              severity={"error"}
              show={true}
              setErrorMessage={setErrorMessage}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
