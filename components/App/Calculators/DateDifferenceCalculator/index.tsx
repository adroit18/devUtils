import React, { Dispatch, SetStateAction } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import intervalToDuration from "date-fns/intervalToDuration";

export default function DateDifferenceCalculator(props: {
  setErrorMessage: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { setErrorMessage } = props;
  const [inputDOBDate, setInputDOBDate] = React.useState<string>();
  const [inputMonthDate, setInputMonthDate] = React.useState<string>();
  const [inputYearDate, setInputYearDate] = React.useState<string>();
  const [outputDOBDate, setOutputDOBDate] = React.useState<string>();
  const [outputMonthDate, setOutputMonthDate] = React.useState<string>();
  const [outputYearDate, setOutputYearDate] = React.useState<string>();
  const [currentAge, setCurrentAge] = React.useState<string>();
  console.log(currentAge);
  React.useEffect(() => {
    if (
      inputDOBDate &&
      inputMonthDate &&
      inputYearDate &&
      outputDOBDate &&
      outputMonthDate &&
      outputYearDate
    ) {
      const { years, months, days } = intervalToDuration({
        start: new Date(
          Number(inputYearDate),
          Number(inputMonthDate) - 1,
          Number(inputDOBDate),
          0,
          0,
          0
        ),
        end: new Date(
          Number(outputYearDate),
          Number(outputMonthDate) - 1,
          Number(outputDOBDate),
          0,
          0,
          0
        ),
      });
      const message = `${years} years, ${months} months, ${days} days`;
      setCurrentAge(message);
    }
  }, [
    inputDOBDate,
    inputMonthDate,
    inputYearDate,
    outputDOBDate,
    outputMonthDate,
    outputYearDate,
  ]);
  return (
    <Grid container>
      <Grid
        xs={12}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid xs={1}>
          <Typography variant="h6">From: </Typography>
        </Grid>
        <TextField
          helperText="Day"
          variant="standard"
          type="number"
          value={inputDOBDate}
          onChange={(event) => setInputDOBDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 1,
              max: 31,
            },
          }}
        />
        <TextField
          helperText="Month"
          variant="standard"
          type="number"
          value={inputMonthDate}
          onChange={(event) => setInputMonthDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 1,
              max: 12,
            },
          }}
        />
        <TextField
          helperText="Year"
          variant="standard"
          type="number"
          value={inputYearDate}
          onChange={(event) => setInputYearDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 0,
              max: 3000,
            },
          }}
        />
      </Grid>
      <Grid
        xs={12}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid xs={1}>
          <Typography variant="h6">To: </Typography>
        </Grid>
        <TextField
          helperText="Day"
          variant="standard"
          type="number"
          value={outputDOBDate}
          onChange={(event) => setOutputDOBDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 0,
              max: 31,
            },
          }}
        />
        <TextField
          helperText="Month"
          variant="standard"
          type="number"
          value={outputMonthDate}
          onChange={(event) => setOutputMonthDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 0,
              max: 12,
            },
          }}
        />
        <TextField
          helperText="Year"
          variant="standard"
          type="number"
          value={outputYearDate}
          onChange={(event) => setOutputYearDate(event?.target?.value)}
          InputProps={{
            inputProps: {
              min: 0,
              max: 3000,
            },
          }}
        />
      </Grid>
      <Grid
        xs={12}
        container
        direction="row"
        justify="center"
        style={{ marginTop: "3%" }}
      >
        <Typography variant="h6">{currentAge} </Typography>
      </Grid>
    </Grid>
  );
}
