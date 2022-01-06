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
          Math.pow(
            1 + rate / (compoundingFrequency * 100),
            compoundingFrequency * time
          )
      );
    }
  }, [principal, time, rate, compoundingFrequency]);

  React.useEffect(() => {
    if (finalAmount && principal) {
      setCompoundInterest(finalAmount - principal);
    }
  }, [principal, finalAmount]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} direction="row">
          <Typography color="textSecondary" variant="h6">
            Compound Interest = Final Amount - P
          </Typography>
        </Grid>
        <Grid item xs={12} direction="row">
          <Typography color="textSecondary" variant="h6">
            Final Amount = P*((1 + (R/N))^(N*T))
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: "2%" }}>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Principal (P)</Typography>
          </Grid>
          <Grid xs={8} direction="row">
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
        </Grid>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Rate (R)</Typography>
          </Grid>
          <Grid xs={8} direction="row">
            <TextField
              placeholder="Rate of CI"
              helperText="Rate of CI"
              variant="standard"
              type="number"
              value={rate}
              onChange={(event) => handleRateChange(event)}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Compounding Times (N)</Typography>
          </Grid>
          <Grid xs={8} direction="row">
            <TextField
              placeholder="Compounding Times"
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
            />
          </Grid>
        </Grid>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Time (T)</Typography>
          </Grid>
          <Grid xs={8} direction="row">
            <TextField
              placeholder="Time"
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
            />
          </Grid>
        </Grid>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Compound Interest (CI)</Typography>
          </Grid>
          <Grid xs={8} direction="row">
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
          </Grid>
        </Grid>
        <Grid xs={12} container item direction="row">
          <Grid xs={4} direction="row">
            <Typography variant="h6">Final Amount</Typography>
          </Grid>
          <Grid xs={8} direction="row">
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
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ marginTop: "1%" }}>
        <Grid xs={12} item container direction="row">
          <Typography variant="caption">*CI = Compound Interest</Typography>
        </Grid>
        <Grid xs={12} item container direction="row">
          <Typography variant="caption">
            *P = Principal/Intital amount
          </Typography>
        </Grid>
        <Grid xs={12} item container direction="row">
          <Typography variant="caption">
            *R = Annual rate of interest
          </Typography>
        </Grid>
        <Grid xs={12} item container direction="row">
          <Typography variant="caption">
            *T = investment time in years
          </Typography>
        </Grid>
        <Grid xs={12} item container direction="row">
          <Typography variant="caption">
            *N = number of times the amount is compounding
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
