import React, { Dispatch, SetStateAction } from "react";
import Grid from "@material-ui/core/Grid";
import { Divider, TextField, Typography } from "@material-ui/core";

export default function SimpleInterestCalculator(props: {
  setErrorMessage: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const { setErrorMessage } = props;
  const [principal, setPrincipal] = React.useState<number>();
  const [rate, setRate] = React.useState<number>();
  const [time, setTime] = React.useState<number>();
  const [simpleInterest, setSimpleInterest] = React.useState<number>();
  const [finalAmount, setFinalAmount] = React.useState<number>();

  const handleRateChange = React.useCallback(
    (event) => {
      const newRate = event.target.value;
      setRate(newRate);
      if (rate && time && principal) {
        const si = (newRate * time * principal) / 100;
        setSimpleInterest(si);
        setFinalAmount(principal + si);
      } else if (newRate && simpleInterest && principal) {
        const time = (simpleInterest * 100) / (principal * newRate);
        setTime(time);
        setFinalAmount(principal + simpleInterest);
      } else if (newRate && simpleInterest && time) {
        const principal = (simpleInterest * 100) / (time * newRate);
        setPrincipal(principal);
        setFinalAmount(principal + simpleInterest);
      }
    },
    [principal, rate, time, simpleInterest]
  );

  const handleTimeChange = React.useCallback(
    (event) => {
      const newTime = event?.target?.value;
      setTime(newTime);
      if (rate && newTime && principal) {
        const si = (rate * newTime * principal) / 100;
        setSimpleInterest(si);
        setFinalAmount(principal + si);
      } else if (newTime && simpleInterest && principal) {
        const rate = (simpleInterest * 100) / (principal * newTime);
        setTime(rate);
        setFinalAmount(principal + simpleInterest);
      } else if (newTime && simpleInterest && rate) {
        const principal = (simpleInterest * 100) / (newTime * rate);
        setPrincipal(principal);
        setFinalAmount(principal + simpleInterest);
      }
    },
    [principal, rate, simpleInterest]
  );

  const handlePrincipalChange = React.useCallback(
    (event) => {
      const newPrincipal = event?.target?.value;
      setPrincipal(newPrincipal);
      if (rate && time && newPrincipal) {
        const si = (rate * time * newPrincipal) / 100;
        setSimpleInterest(si);
        setFinalAmount(newPrincipal + si);
      } else if (newPrincipal && simpleInterest && time) {
        const rate = (simpleInterest * 100) / (newPrincipal * time);
        setTime(rate);
        setFinalAmount(newPrincipal + simpleInterest);
      } else if (newPrincipal && simpleInterest && rate) {
        const time = (simpleInterest * 100) / (newPrincipal * rate);
        setTime(time);
        setFinalAmount(newPrincipal + simpleInterest);
      }
    },
    [rate, time, simpleInterest]
  );

  const handleSimpleInterestChange = React.useCallback(
    (event) => {
      const newSimpleInterest = event?.target?.value;
      setSimpleInterest(newSimpleInterest);
      if (rate && time && principal) {
        const principal = (newSimpleInterest * 100) / (time * rate);
        setPrincipal(principal);
        setFinalAmount(principal + newSimpleInterest);
      } else if (principal && newSimpleInterest && time) {
        const rate = (newSimpleInterest * 100) / (principal * time);
        setTime(rate);
        setFinalAmount(principal + newSimpleInterest);
      } else if (principal && newSimpleInterest && rate) {
        const time = (newSimpleInterest * 100) / (principal * rate);
        setTime(time);
        setFinalAmount(principal + newSimpleInterest);
      } else if (rate && time && newSimpleInterest) {
        const principal = (newSimpleInterest * 100) / (time * rate);
        setPrincipal(principal);
        setFinalAmount(principal + newSimpleInterest);
      }
    },
    [principal, rate, time]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} container direction="row">
          <Typography color="textSecondary" variant="h6">
            &nbsp;Simple Interest = (P*R*T)/100
          </Typography>
        </Grid>
        <Grid item xs={12} container direction="row">
          <Typography color="textSecondary" variant="h6">
            &nbsp;Final Amount = (P + SI)
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "2%" }}>
        <Grid item xs={12} container direction="row">
          <Grid item xs={4} container direction="row">
            <Typography variant="h6"> Principal (P)</Typography>
          </Grid>
          <Grid item xs={8} container direction="row">
            <TextField
              placeholder="Principal/Initial Amount"
              helperText="Principal/Initial Amount"
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
        <Grid item xs={12} container direction="row">
          <Grid item xs={4} container direction="row">
            <Typography variant="h6"> Rate of Interest (R)</Typography>
          </Grid>
          <Grid item xs={8} container direction="row">
            <TextField
              placeholder="Rate of Interest"
              helperText="Rate of Interest"
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
        <Grid item xs={12} container direction="row">
          <Grid item xs={4} container direction="row">
            <Typography variant="h6"> Time (T)</Typography>
          </Grid>
          <Grid item xs={8} container direction="row">
            <TextField
              placeholder="Investment Time"
              helperText="Investment Time"
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
        <Grid item xs={12} container direction="row">
          <Grid item xs={4} container direction="row">
            <Typography variant="h6"> Simple Interest (SI)</Typography>
          </Grid>
          <Grid item xs={8} container direction="row">
            <TextField
              placeholder="Simple Interest"
              helperText="Simple Interest"
              variant="standard"
              type="number"
              value={simpleInterest}
              onChange={(event) => handleSimpleInterestChange(event)}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container direction="row">
          <Grid item xs={4} container direction="row">
            <Typography variant="h6"> Final Amount</Typography>
          </Grid>
          <Grid item xs={8} container direction="row">
            <TextField
              placeholder="Final Amount"
              helperText="Final Amount"
              variant="standard"
              type="number"
              value={finalAmount}
              defaultValue={finalAmount}
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
      <Grid container spacing={1}>
        <Grid container direction="row" style={{ marginTop: "5%" }}>
          <Typography variant="caption">
            *P = Principal/Intital amount
          </Typography>
        </Grid>
        <Grid container direction="row">
          <Typography variant="caption">
            *R = Annual rate of interest
          </Typography>
        </Grid>
        <Grid container direction="row">
          <Typography variant="caption">
            *T = investment time in years
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
