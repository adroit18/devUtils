// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from "react";
import { useRouter } from "next/router";
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
  const { push: routerPush, asPath: fullRoute } = useRouter();
  const [, urlSelectedMeasurement = "", urlUnitsSelected = ""] = fullRoute
    .split("/")
    .filter((val) => val);
  const [, urlSelectedUnitFrom = "", , urlSelectedUnitTo = ""] =
    urlUnitsSelected.split("-").filter((val) => val);

  let urlSelectedUnitFromUnit, urlSelectedUnitToUnit;
  const urlSelectedMeasurementUnit = decodeURI(urlSelectedMeasurement);

  const allUnitsDescribedForSelectedMeasurement = convert().list(
    urlSelectedMeasurement
  );

  for (
    let unit = 0;
    unit < allUnitsDescribedForSelectedMeasurement.length;
    unit++
  ) {
    const currentUnit = allUnitsDescribedForSelectedMeasurement[unit];
    if (currentUnit.plural === decodeURI(urlSelectedUnitFrom)) {
      urlSelectedUnitFromUnit = currentUnit.abbr;
    } else if (currentUnit.plural === decodeURI(urlSelectedUnitTo)) {
      urlSelectedUnitToUnit = currentUnit.abbr;
    } else if (urlSelectedUnitToUnit && urlSelectedUnitFromUnit) {
      break;
    }
  }

  const [selectedMeasurement, setSelectedMeasurement] = React.useState<string>(
    urlSelectedMeasurementUnit
  );
  const [selectedUnitFrom, setSelectedUnitFrom] = React.useState<string>(
    urlSelectedUnitFromUnit
  );
  const [selectedUnitTo, setSelectedUnitTo] = React.useState<string>(
    urlSelectedUnitToUnit
  );

  const [valFrom, setValFrom] = React.useState<string | number>("");
  const [valTo, setValTo] = React.useState<string | number>("");

  const handleMeasurementSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newMeasurement = event?.target?.value as string;
    setSelectedMeasurement(newMeasurement);
    resetAllStates();
    if (newMeasurement) {
      routerPush(`/unit-conversions/${newMeasurement}`);
    }
  };

  const handleUnitSelectFrom = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newSelectedUnitFrom = event?.target?.value as string;
    setSelectedUnitFrom(newSelectedUnitFrom);
    updateConversionResults({ newSelectedUnitFrom });
    if (selectedMeasurement && newSelectedUnitFrom) {
      routerPush(
        `/unit-conversions/${selectedMeasurement}/convert-${
          convert().describe(newSelectedUnitFrom).plural
        }`
      );
    }
  };

  const handleUnitSelectTo = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newSelectedUnitTo = event?.target?.value as string;
    setSelectedUnitTo(newSelectedUnitTo);
    updateConversionResults({ newSelectedUnitTo });
    if (selectedMeasurement && selectedUnitFrom && newSelectedUnitTo) {
      routerPush(
        `/unit-conversions/${selectedMeasurement}/convert-${
          convert().describe(selectedUnitFrom).plural
        }-to-${convert().describe(newSelectedUnitTo).plural}`
      );
    }
  };

  const updateConversionResults = (newVals): void => {
    const { newSelectedUnitFrom, newSelectedUnitTo } = newVals;
    const currentSelectedUnitFrom = newSelectedUnitFrom || selectedUnitFrom;
    const currentSelectedUnitTo = newSelectedUnitTo || selectedUnitTo;
    if (valFrom && currentSelectedUnitFrom && currentSelectedUnitTo) {
      setValTo(
        convert(valFrom).from(currentSelectedUnitFrom).to(currentSelectedUnitTo)
      );
    } else if (valTo && currentSelectedUnitFrom && currentSelectedUnitTo) {
      setValFrom(
        convert(valTo).from(currentSelectedUnitFrom).to(currentSelectedUnitTo)
      );
    }
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

  const resetAllStates = React.useCallback(() => {
    setSelectedUnitFrom("");
    setSelectedUnitTo("");
    setValFrom("");
    setValTo("");
    routerPush(`/unit-conversions`);
  }, [routerPush]);

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
