import React from "react";
import { exchangeRates, convert } from "exchange-rates-api";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Icon from "@mdi/react";
import { mdiSwapHorizontal } from "@mdi/js";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { CURRENCY_TO_DETAILS } from "../../../../constants";

export default function MeasurementConverter(): JSX.Element {
  const [currencyMetadata, setCurrencyMetadata] = React.useState({});
  const [selectedUnitFrom, setSelectedUnitFrom] = React.useState<string>("");
  const [selectedUnitTo, setSelectedUnitTo] = React.useState<string>("");
  const [valFrom, setValFrom] = React.useState<number>();
  const [valTo, setValTo] = React.useState<number>();
  const [baseCurrency, setBaseCurrency] = React.useState<string>("INR");

  const handleUnitSelectFrom = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedUnitFrom(event?.target?.value as string);
  };

  const handleUnitSelectTo = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUnitTo(event?.target?.value as string);
  };

  const getCurrencyOptions = React.useCallback(() => {
    return Object.keys(currencyMetadata).map((val: string, index: number) => {
      return (
        <MenuItem value={val} key={`${val}_${index}`}>
          {val}
        </MenuItem>
      );
    });
  }, [currencyMetadata]);

  const handleValFromInput = React.useCallback(
    async (event = {}, takeCurrVal = false) => {
      const valInput = event?.target?.value as number;
      const newValFrom = Number(takeCurrVal ? valFrom : valInput);
      setValFrom(newValFrom);
      if (newValFrom >= 0 && selectedUnitFrom && selectedUnitTo) {
        setValTo(await convert(newValFrom, selectedUnitFrom, selectedUnitTo));
      }
    },
    [selectedUnitFrom, selectedUnitTo, valFrom]
  );

  const handleValToInput = React.useCallback(
    async (event = {}) => {
      const valInput = event?.target?.value as number;
      const newValTo = Number(valInput);
      setValTo(newValTo);
      if (newValTo >= 0 && selectedUnitFrom && selectedUnitTo) {
        setValFrom(await convert(newValTo, selectedUnitTo, selectedUnitFrom));
      }
    },
    [selectedUnitFrom, selectedUnitTo]
  );

  const fetchCurrencyData = React.useCallback(async () => {
    const data = await exchangeRates().latest().base(baseCurrency).fetch();
    setCurrencyMetadata(data);
  }, [baseCurrency]);

  React.useEffect(() => {
    fetchCurrencyData();
  }, [fetchCurrencyData]);

  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "100%", padding: "3% 10% 4% 10%" }}
    >
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <TextField
            type="number"
            variant="outlined"
            value={valFrom}
            onChange={(event) => handleValFromInput(event)}
            disabled={!selectedUnitFrom}
            placeholder="From"
            helperText="Enter value to convert"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={selectedUnitFrom}
            onChange={handleUnitSelectFrom}
            select
            label="From"
            helperText={
              selectedUnitFrom
                ? CURRENCY_TO_DETAILS[selectedUnitFrom]?.name
                : "Please select currency"
            }
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getCurrencyOptions()}
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
            variant="outlined"
            value={valTo}
            onChange={(event) => handleValToInput(event)}
            disabled={!selectedUnitTo}
            placeholder="To"
            helperText="Converted value"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            value={selectedUnitTo}
            onChange={handleUnitSelectTo}
            select
            label="To"
            helperText={
              selectedUnitTo
                ? CURRENCY_TO_DETAILS[selectedUnitTo]?.name
                : "Please select currency"
            }
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getCurrencyOptions()}
          </TextField>
        </Grid>
      </Grid>

      <Divider style={{ margin: "3% 10% 4% 10%", padding: "0.2%" }} />
      <Grid container spacing={4} justify="center">
        <Grid item xs={6}>
          <Typography variant="h4" component="h4">
            Exchange Rates
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={baseCurrency}
            onChange={(event) => setBaseCurrency(event?.target?.value)}
            select
            label="Base currency"
            helperText="Please select base currency"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getCurrencyOptions()}
          </TextField>
        </Grid>
      </Grid>

      <List style={{ marginTop: "2%" }}>
        <Grid spacing={4} direction="row" container>
          {Object.keys(currencyMetadata).map((val, index) => {
            return (
              <Grid item xs={5} key={`${val}-${index}`}>
                <Paper>
                  <ListItem>
                    <ListItemText
                      primary={`${CURRENCY_TO_DETAILS[val]?.name} (${val})`}
                    />
                    <ListItemSecondaryAction>
                      {currencyMetadata[val]}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </List>
    </Paper>
  );
}
