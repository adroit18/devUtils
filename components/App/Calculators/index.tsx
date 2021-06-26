import React from "react";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import MathematicsCalculator from "./MathematicsCalculator";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbars from "../../Snackbars";
import SimpleInterestCalculator from "./SimpleInterestCalculator";

export default function Calculator(): JSX.Element {
  const [selectedCalculator, setSelectedCalculator] = React.useState("");
  const [error, setErrorMessage] = React.useState<string>("");

  const {
    push: routerPush,
    query: { slug: currentCal },
  } = useRouter();

  const { current: CALCULATORS } = React.useRef<{
    [key: string]: { id: string; title: string; component: JSX.Element };
  }>({
    "mathematics-calculator": {
      id: "mathematics-calculator",
      title: "Mathematics Calculator",
      component: <MathematicsCalculator setErrorMessage={setErrorMessage} />,
    },
    "simple-interest-calculator": {
      id: "simple-interest-calculator",
      title: "Simple Interest Calculator",
      component: <SimpleInterestCalculator setErrorMessage={setErrorMessage} />,
    },
    "compound-interest-calculator": {
      id: "compound-interest-calculator",
      title: "Compound Interest Calculator",
      component: <MathematicsCalculator setErrorMessage={setErrorMessage} />,
    },
  });

  React.useEffect(() => {
    const defaultCal =
      currentCal === "calculators" || currentCal === undefined
        ? ""
        : currentCal;
    setSelectedCalculator(defaultCal as string);
  }, []);

  const handleCalculatorSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newCal = event?.target?.value as string;
    setSelectedCalculator(newCal);
    routerPush(`/calculators/${newCal}`);
  };

  const getCalculatorOptions = React.useCallback(() => {
    return Object.values(CALCULATORS).map((val, index: number) => {
      return (
        <MenuItem value={val.id} key={`${val.id}_${index}`}>
          {val.title}
        </MenuItem>
      );
    });
  }, []);

  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "90%", padding: "1% 5% 5% 5%" }}
    >
      <Grid container spacing={4}>
        <Grid
          item
          xs={4}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <TextField
            fullWidth
            value={selectedCalculator}
            onChange={handleCalculatorSelect}
            select
            label="Calculator"
            helperText="Please select a calculator"
            variant="outlined"
            defaultValue=""
          >
            <MenuItem value="">None</MenuItem>
            {getCalculatorOptions()}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          {CALCULATORS[selectedCalculator]?.component}
        </Grid>
        <Grid item xs={8}>
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
