import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Snackbars from "../../Snackbars";

const AVAILABLE_ACTIONS = {
  ENCODE: {
    key: "ENCODE",
    action: function (val: string): string {
      return encodeURI(val);
    },
  },
  DECODE: {
    key: "DECODE",
    action: function (val: string): string {
      return decodeURI(val);
    },
  },
};

export default function TextDiff(): JSX.Element {
  const [toEncodeText, setEncodeText] = React.useState<string>("");
  const [toDecodeText, setDecodeText] = React.useState<string>("");
  const [error, setErrorMessage] = React.useState<string>("");
  const [actionToPerform, setActionToPerform] = React.useState<string>(
    AVAILABLE_ACTIONS.ENCODE.key
  );

  const swipeText = React.useCallback(() => {
    const tempText = toEncodeText;
    setEncodeText(toDecodeText);
    setDecodeText(tempText);
  }, [toEncodeText, toDecodeText]);

  React.useEffect(() => {
    try {
      if (actionToPerform === AVAILABLE_ACTIONS.ENCODE.key) {
        setDecodeText(AVAILABLE_ACTIONS.ENCODE.action(toEncodeText));
      } else if (actionToPerform === AVAILABLE_ACTIONS.DECODE.key) {
        setEncodeText(AVAILABLE_ACTIONS.DECODE.action(toDecodeText));
      }
      setErrorMessage("");
    } catch (e) {
      setErrorMessage(e.message);
    }
  }, [toEncodeText, toDecodeText, actionToPerform]);

  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "70%", padding: "3% 10% 4% 10%" }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="Action"
          name="Action"
          value={actionToPerform}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setActionToPerform((event.target as HTMLInputElement).value)
          }
        >
          <FormControlLabel
            value={AVAILABLE_ACTIONS.ENCODE.key}
            control={<Radio />}
            label="Encode"
          />
          <FormControlLabel
            value={AVAILABLE_ACTIONS.DECODE.key}
            control={<Radio />}
            label="Decode"
          />
        </RadioGroup>
      </FormControl>
      <Divider style={{ height: "5%", background: "white" }} />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <TextareaAutosize
          rowsMin={10}
          cols={100}
          value={toEncodeText}
          onInput={(event) =>
            setEncodeText((event.target as HTMLInputElement).value)
          }
          disabled={actionToPerform === AVAILABLE_ACTIONS.DECODE.key}
          placeholder="Type (or paste) here"
        />
        <Divider orientation="vertical" style={{ width: "10%" }} />
        <TextareaAutosize
          rowsMin={10}
          cols={100}
          value={toDecodeText}
          onInput={(event) =>
            setDecodeText((event.target as HTMLInputElement).value)
          }
          disabled={actionToPerform === AVAILABLE_ACTIONS.ENCODE.key}
          placeholder="Type (or paste) here"
        />
      </div>
      <Divider style={{ height: "10%", background: "white" }} />

      {error && (
        <Snackbars
          message={error}
          severity={"error"}
          show={true}
          setErrorMessage={setErrorMessage}
        />
      )}
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="Swipe or Clear text"
      >
        <Button onClick={() => swipeText()}>Swipe</Button>
        <Button
          onClick={() => {
            setEncodeText("");
            setDecodeText("");
          }}
        >
          Clear
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
