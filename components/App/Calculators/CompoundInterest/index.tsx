import React, { Dispatch, SetStateAction } from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, TextField, Typography } from "@material-ui/core";

export default function CompoundInterestCalculator(props: {
  setErrorMessage: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { setErrorMessage } = props;
  const [principal, setPrincipal] = React.useState<number>();
  const [rate, setRate] = React.useState<number>();
  const [time, setTime] = React.useState<number>();
  const [compoundInterest, setCompoundInterest] = React.useState<number>();
  const [finalAmount, setFinalAmount] = React.useState<number>();
  const [compoundingFrequency, setCompoundingFrequency] =
    React.useState<number>();

  const handlePrincipalChange = React.useCallback((event) => {
    const newPrincipal = event?.target?.value;
    setPrincipal(newPrincipal);
  }, []);
  const handleRateChange = React.useCallback((event) => {
    const newRate = event?.target?.value;
    setRate(newRate);
  }, []);
  const handleTimeChange = React.useCallback((event) => {
    const newTime = event?.target?.value;
    setTime(newTime);
  }, []);
  const handleCompoundingFrequencyChange = React.useCallback((event) => {
    const newCompoundingFrequency = event?.target?.value;
    setCompoundingFrequency(newCompoundingFrequency);
  }, []);

  React.useEffect(() => {
    if (principal && time && rate && compoundingFrequency) {
      setFinalAmount(
        principal *
          (Math.pow(1 + (rate / (compoundingFrequency * 100)), compoundingFrequency * time))
      );
    }
  }, [principal, time, rate, compoundingFrequency]);

  React.useEffect(() => {
    if (finalAmount && principal) {
      setCompoundInterest(finalAmount - principal);
    }
  }, [principal, finalAmount]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={7} container direction="row">
        <Typography color="textPrimary" variant="h6">
          Formulae:
        </Typography>
        <Typography color="textSecondary" variant="h6">
          &nbsp; Final Amount = P*((1 + (R/N))^(N*T))
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Compound Interest = Final Amount - P
        </Typography>
      </Grid>
      <Grid xs={12} container direction="row" justify="space-around">
        <TextField
          placeholder="Compound Interest"
          helperText="Compound Interest"
          variant="standard"
          type="number"
          value={compoundInterest}
          defaultValue={compoundInterest}
          disabled={true}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
        <Typography variant="h5">=</Typography>
        <TextField
          placeholder="Final Amount"
          helperText="Final Amount"
          variant="standard"
          type="number"
          value={finalAmount}
          disabled={true}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
        <Typography variant="h5">-</Typography>
        <TextField
          placeholder="Principal Amount"
          helperText="Principal Amount"
          variant="standard"
          type="number"
          value={principal}
          onChange={(event) => handlePrincipalChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
        />
      </Grid>
      <Grid
        xs={12}
        container
        direction="row"
        // justify="space-around"
        style={{ marginTop: "3%", marginLeft: "4%" }}
        // spacing={5}
      >
        <TextField
          placeholder="Final Amount"
          helperText="Final Amount"
          variant="standard"
          type="number"
          value={finalAmount}
          disabled={true}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "12%" }}
        />
        <Typography variant="h5">&nbsp;=&nbsp;&nbsp;</Typography>
        {/* <Typography>&nbsp; ( &nbsp;</Typography> */}
        <TextField
          placeholder="P"
            helperText="Principal"
          variant="standard"
          type="number"
          value={principal}
          onChange={(event) => handlePrincipalChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "10%" }}
        />
        <Typography variant="h5">&nbsp;*</Typography>
        <Typography variant="h2">(1+</Typography>

        <Typography variant="h2">(&nbsp;</Typography>
        <TextField
          placeholder="R"
            helperText="Rate"
          variant="standard"
          type="number"
          value={rate}
          onChange={(event) => handleRateChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "10%" }}
        />
        <Typography variant="h5">&nbsp;&divide; &nbsp;</Typography>
        <TextField
          placeholder="N"
            helperText="CI frequency"
          variant="standard"
          type="number"
          value={compoundingFrequency}
          onChange={(event) => handleCompoundingFrequencyChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "10%" }}
        />
        <Typography variant="h2">)) </Typography>
        <Typography variant="h5">^</Typography>
        <Typography variant="h5">(</Typography>
        <TextField
          placeholder="N"
            helperText="CI frequency"
          variant="standard"
          type="number"
          value={compoundingFrequency}
          onChange={(event) => handleCompoundingFrequencyChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "10%" }}
        />
        <Typography>&nbsp;*&nbsp;</Typography>
        <TextField
          placeholder="T"
            helperText="Time"
          variant="standard"
          type="number"
          value={time}
          onChange={(event) => handleTimeChange(event)}
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          style={{ width: "5%" }}
        />
        <Typography variant="h5">&nbsp;)</Typography>
      </Grid>
      <Grid
        container
        direction="row"
        style={{ marginTop: "5%", marginLeft: "4%" }}
      >
        <Typography variant="caption">*P = Principal/Intital amount</Typography>
      </Grid>
      <Grid container direction="row" style={{ marginLeft: "4%" }}>
        <Typography variant="caption">*R = Annual rate of interest</Typography>
      </Grid>
      <Grid container direction="row" style={{ marginLeft: "4%" }}>
        <Typography variant="caption">*T = investment time in years</Typography>
      </Grid>
      <Grid container direction="row" style={{ marginLeft: "4%" }}>
        <Typography variant="caption">
          *N = number of times the amount is compounding
        </Typography>
      </Grid>
    </Grid>
  );
}
