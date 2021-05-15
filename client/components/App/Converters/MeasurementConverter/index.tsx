import React from "react";
import convert from "convert-units";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

export default function MeasurementConverter(): JSX.Element {
  const [selectedMeasurement, setSelectedMeasurement] =
    React.useState<string>("");
  const [selectedUnitFrom, setSelectedUnitFrom] = React.useState<string>("");
  const [selectedUnitTo, setSelectedUnitTo] = React.useState<string>("");

  const [valFrom, setValFrom] = React.useState<string | number>("");
  const [valTo, setValTo] = React.useState<string | number>("");

  const handleMeasurementSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedMeasurement(event?.target?.value as string);
  };

  const handleUnitSelectFrom = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedUnitFrom(event?.target?.value as string);
  };

  const handleUnitSelectTo = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUnitTo(event?.target?.value as string);
  };

  const getUnitOptionsFrom = React.useCallback(() => {
    const optionsAvailable = selectedUnitTo
      ? convert().from(selectedUnitTo).possibilities()
      : convert().possibilities(selectedMeasurement);

    return optionsAvailable.map((val: string, index: number) => {
      return (
        <MenuItem value={val} key={`${val}_${index}`}>
          {convert().describe(val).plural} - {val}
        </MenuItem>
      );
    });
  }, [selectedMeasurement, selectedUnitTo]);

  const getUnitOptionsTo = React.useCallback(() => {
    const optionsAvailable = selectedUnitFrom
      ? convert().from(selectedUnitFrom).possibilities()
      : convert().possibilities(selectedMeasurement);
    return optionsAvailable.map((val: string, index: number) => {
      return (
        <MenuItem value={val} key={`${val}_${index}`}>
          {convert().describe(val).plural} - {val}
        </MenuItem>
      );
    });
  }, [selectedMeasurement, selectedUnitFrom]);

  const getMeasurementOptions = React.useCallback(() => {
    const uniqueMeasurementsAvailable = new Set<string>();

    convert()
      .list()
      .forEach((val: { measure: string }) =>
        uniqueMeasurementsAvailable.add(val.measure)
      );

    return Array.from(uniqueMeasurementsAvailable).map(
      (val: string, index: number) => {
        return (
          <MenuItem value={val} key={`${val}_${index}`}>
            {val}
          </MenuItem>
        );
      }
    );
  }, []);

  const handleValFromInput = React.useCallback(
    (event = {}, takeCurrVal = false) => {
      const newValFrom = takeCurrVal
        ? valFrom
        : (event?.target?.value as string);
      setValFrom(newValFrom);
      if (newValFrom && selectedUnitFrom && selectedUnitTo) {
        setValTo(convert(newValFrom).from(selectedUnitFrom).to(selectedUnitTo));
      }
    },
    [selectedUnitFrom, selectedUnitTo, valFrom]
  );

  const handleValToInput = React.useCallback(
    (event = {}) => {
      const newValTo = event?.target?.value as string;
      setValTo(newValTo);
      if (newValTo && selectedUnitFrom && selectedUnitTo) {
        setValFrom(convert(newValTo).from(selectedUnitFrom).to(selectedUnitTo));
      }
    },
    [selectedUnitFrom, selectedUnitTo]
  );

  React.useEffect(() => {
    setSelectedUnitFrom("");
    setSelectedUnitTo("");
  }, [selectedMeasurement]);

  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "100%", padding: "3% 10% 4% 10%" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={selectedMeasurement}
            onChange={handleMeasurementSelect}
            select
            label="Measurement of"
            helperText="Please select what to measure"
            variant="outlined"
          >
            <MenuItem value="">None</MenuItem>
            {getMeasurementOptions()}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedUnitFrom}
                </InputAdornment>
              ),
            }}
            variant="outlined"
            value={valFrom}
            onChange={(event) => handleValFromInput(event)}
            disabled={!selectedUnitFrom}
            placeholder="From"
            helperText="Enter value to covert"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={selectedUnitFrom}
            onChange={handleUnitSelectFrom}
            select
            label="From"
            helperText="Please select unit"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getUnitOptionsFrom()}
          </TextField>
        </Grid>
        <Grid item xs={2} alignItems="center" justify="center" container>
          <Tooltip title="Convert">
            <IconButton
              color="primary"
              onClick={() => {
                handleValFromInput({}, true);
              }}
            >
              <Icon path={mdiSwapHorizontal} title="Converters" size={1} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {selectedUnitTo}
                </InputAdornment>
              ),
            }}
            variant="outlined"
            value={valTo}
            onChange={(event) => handleValToInput(event)}
            disabled={!selectedUnitTo}
            placeholder="To"
            helperText="Coverted value"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={selectedUnitTo}
            onChange={handleUnitSelectTo}
            select
            label="To"
            helperText="Please select unit"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getUnitOptionsTo()}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
}
