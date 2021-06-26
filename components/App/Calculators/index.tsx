import React from "react";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import MathematicsCalculator from "./MathematicsCalculator";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbars from "../../Snackbars";

const CALCULATORS = [
  {
    id: "mathematics-calculator",
    title: "Mathematics Calculator",
  },
];

export default function Calculator(): JSX.Element {
  const [selectedCalculator, setSelectedCalculator] = React.useState("");
  const [error, setErrorMessage] = React.useState<string>("");

  const {
    push: routerPush,
    query: { slug: currentCal },
  } = useRouter();

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
    return CALCULATORS.map((val, index: number) => {
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
          {selectedCalculator == "mathematics-calculator" ? (
            <MathematicsCalculator setErrorMessage={setErrorMessage} />
          ) : (
            ""
          )}
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
