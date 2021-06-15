import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { AVAILABLE_FUNCTIONS } from "./constants";

export default function MathematicsCalculator(props: {
  setErrorMessage: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { setErrorMessage } = props;
  const [calVal, setCalVal] = React.useState<string>("");

  const getCalcHtmlMarkup = React.useCallback(
    () => (
      <div className="mode">
        {AVAILABLE_FUNCTIONS.map((operation, index) => {
          if (operation.name) {
            return (
              <Button
                variant="outlined"
                key={index}
                style={{ textTransform: "none", margin: "0.5rem" }}
                onClick={() => handleInput(operation?.name)}
              >
                {operation.name}
              </Button>
            );
          } else {
            return <br></br>;
          }
        })}
      </div>
    ),
    []
  );

  const handleInput = React.useCallback(
    (key) => {
      try {
        if (
          key != "=" &&
          key != "C" &&
          key != "*" &&
          key != "/" &&
          key != "√" &&
          key != "x²" &&
          key != "%" &&
          key != "CE" &&
          key != "±" &&
          key != "sin" &&
          key != "cos" &&
          key != "tan" &&
          key != "log" &&
          key != "ln" &&
          key != "x^" &&
          key != "x!" &&
          key != "π" &&
          key != "e" &&
          key != "rad" &&
          key != "deg"
        ) {
          setCalVal((calVal) => `${calVal + key}`);
        } else if (key === "=") {
          if (calVal.indexOf("^") > -1) {
            const base = calVal.slice(0, calVal.indexOf("^"));
            const exponent = calVal.slice(calVal.indexOf("^") + 1);
            setCalVal(eval("Math.pow(" + base + "," + exponent + ")"));
          } else {
            setCalVal((calVal) => eval(calVal));
          }
        } else if (key === "C") {
          setCalVal("");
        } else if (key === "*") {
          setCalVal((calVal) => calVal + "*");
        } else if (key === "/") {
          setCalVal((calVal) => calVal + "/");
        } else if (key === "+") {
          setCalVal((calVal) => calVal + "+");
        } else if (key === "-") {
          setCalVal((calVal) => calVal + "-");
        } else if (key === "±") {
          if (calVal.charAt(0) === "-") {
            setCalVal((calVal) => calVal.slice(1));
          } else {
            setCalVal((calVal) => "-" + calVal);
          }
        } else if (key === "CE") {
          setCalVal((calVal) => calVal.substring(0, calVal.length - 1));
        } else if (key === "%") {
          setCalVal((calVal) => `${Number(calVal) / 100}`);
        } else if (key === "π") {
          setCalVal((calVal) => `${Number(calVal) * Math.PI}`);
        } else if (key === "x²") {
          setCalVal(
            (calVal) => `${eval(`${Number(calVal) * Number(calVal)}`)}`
          );
        } else if (key === "√") {
          setCalVal((calVal) => `${Math.sqrt(Number(calVal))}`);
        } else if (key === "sin") {
          setCalVal((calVal) => `${Math.sin(Number(calVal))}`);
        } else if (key === "cos") {
          setCalVal((calVal) => `${Math.cos(Number(calVal))}`);
        } else if (key === "tan") {
          setCalVal((calVal) => `${Math.tan(Number(calVal))}`);
        } else if (key === "log") {
          setCalVal((calVal) => `${Math.log10(Number(calVal))}`);
        } else if (key === "ln") {
          setCalVal((calVal) => `${Math.log(Number(calVal))}`);
        } else if (key === "x^") {
          setCalVal((calVal) => calVal + "^");
        } else if (key === "x!") {
          if (calVal === "0") {
            setCalVal("1");
          } else if (Number(calVal) < 0) {
            setCalVal("NaN");
          } else {
            setCalVal((calVal) => {
              let number = 1;
              for (let i = Number(calVal); i > 0; i--) {
                number *= i;
              }
              return `${number}`;
            });
          }
        } else if (key === "e") {
          setCalVal((calVal) => `${Math.exp(Number(calVal))}`);
        } else if (key === "rad") {
          setCalVal((calVal) => `${Number(calVal) * (Math.PI / 180)}`);
        } else if (key === "deg") {
          setCalVal((calVal) => `${Number(calVal) * (180 / Math.PI)}`);
        }
      } catch (e) {
        setErrorMessage(e.message);
      }
    },
    [calVal, setErrorMessage]
  );

  return (
    <Grid container spacing={5}>
      <Grid
        item
        xs={3}
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      ></Grid>
      <Grid
        item
        xs={9}
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        <Input
          inputProps={{ "aria-label": "description" }}
          fullWidth
          placeholder="Calculated value"
          value={calVal}
          onChange={(e) => setCalVal(e?.currentTarget?.value)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        {getCalcHtmlMarkup()}
      </Grid>
    </Grid>
  );
}
