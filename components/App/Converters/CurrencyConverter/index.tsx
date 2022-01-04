import React from "react";
import { useRouter } from "next/router";
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

export default function MeasurementConverter(): JSX.Element {
  const { push: routerPush, asPath: fullRoute } = useRouter();
  const [, conversionDescriptionUrl = ""] = fullRoute
    .split("/")
    .filter((val) => val);
  const [selectedUnitFromUrl = "", , selectedUnitToUrl = ""] =
    conversionDescriptionUrl.split("-").filter((val) => val);

  console.log(conversionDescriptionUrl.split("-").filter((val) => val));

  const [currencySymbols, setCurrencySymbols] = React.useState<{
    [key: string]: string;
  }>({});
  const [currencyMetadata, setCurrencyMetadata] = React.useState<{
    [key: string]: number;
  }>({});
  const [selectedUnitFrom, setSelectedUnitFrom] = React.useState<string>(
    decodeURI(selectedUnitFromUrl)
  );
  const [selectedUnitTo, setSelectedUnitTo] = React.useState<string>(
    decodeURI(selectedUnitToUrl)
  );
  const [valFrom, setValFrom] = React.useState<number>();
  const [valTo, setValTo] = React.useState<number>();
  const [baseCurrency, setBaseCurrency] = React.useState<string>("INR");

  const getCurrencyOptions = React.useCallback(() => {
    return Object.keys(currencyMetadata).map((val: string, index: number) => {
      return (
        <MenuItem value={val} key={`${val}_${index}`}>
          {currencySymbols[val]?.description} - ({val})
        </MenuItem>
      );
    });
  }, [currencyMetadata, currencySymbols]);

  const convertCurrency = React.useCallback(async (config) => {
    const { from, to, amount } = config;
    const requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const response = await fetch(requestURL);
    const responseJson = await response.json();
    return responseJson.result;
  }, []);

  console.log(valFrom, valTo, selectedUnitFrom, selectedUnitTo, "out");
  const updateChange = React.useCallback(
    async (newConfig = {}): Promise<void> => {
      console.log(valFrom, valTo, selectedUnitFrom, selectedUnitTo, "in");
      const {
        newValFrom = valFrom,
        newValTo = valTo,
        newUnitFrom = selectedUnitFrom,
        newUnitTo = selectedUnitTo,
      } = newConfig;
      console.log(newValFrom, newValTo, newUnitFrom, newUnitTo);
      if (newUnitTo && newUnitFrom) {
        if (newValFrom >= 0) {
          const convertedResult = await convertCurrency({
            from: newUnitFrom,
            to: newUnitTo,
            amount: newValFrom,
          });
          setValTo(convertedResult);
        } else if (newValTo >= 0) {
          const convertedResult = await convertCurrency({
            from: newUnitFrom,
            to: newUnitTo,
            amount: newValTo,
          });
          setValFrom(convertedResult);
        }
        if (newUnitTo && newUnitFrom) {
          routerPush(`/currency-conversion/${newUnitFrom}-to-${newUnitTo}`);
        }
      }
    },
    [
      convertCurrency,
      routerPush,
      selectedUnitFrom,
      selectedUnitTo,
      valFrom,
      valTo,
    ]
  );

  const handleUnitSelectFrom = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newUnitFrom = event?.target?.value as string;
      setSelectedUnitFrom(newUnitFrom);
      updateChange({ newUnitFrom });
    },
    [updateChange]
  );

  const handleUnitSelectTo = React.useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newUnitTo = event?.target?.value as string;
      setSelectedUnitTo(newUnitTo);
      updateChange({ newUnitTo });
    },
    [updateChange]
  );
  const handleValFromInput = React.useCallback(
    async (event = {}) => {
      const newValFrom = event?.target?.value as number;
      setValFrom(newValFrom);
      updateChange({ newValFrom });
    },
    [updateChange]
  );

  const handleValToInput = React.useCallback(
    async (event = {}) => {
      const valInput = event?.target?.value as number;
      const newValTo = Number(valInput);
      setValTo(newValTo);
      updateChange({ newValTo });
    },
    [updateChange]
  );

  const fetchCurrencyData = React.useCallback(async () => {
    const requestURL = `https://api.exchangerate.host/latest?base=${baseCurrency}`;
    const response = await fetch(requestURL);
    const responseJson = await response.json();
    setCurrencyMetadata(responseJson?.rates);
  }, [baseCurrency]);

  const fetchSymbolData = React.useCallback(async () => {
    const requestURLForSymbolsData = "https://api.exchangerate.host/symbols";
    const responseForSymbols = await fetch(requestURLForSymbolsData);
    const responseForSymbolsJson = await responseForSymbols.json();
    setCurrencySymbols(responseForSymbolsJson?.symbols);
  }, []);

  React.useEffect(() => {
    fetchSymbolData();
    fetchCurrencyData();
  }, [fetchCurrencyData, fetchSymbolData]);

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
                ? currencySymbols[selectedUnitFrom]?.description
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
                updateChange();
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
                ? currencySymbols[selectedUnitTo]?.description
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
          {Object.keys(currencyMetadata).map((val: string, index) => {
            return (
              <Grid item xs={5} key={`${val}-${index}`}>
                <Paper>
                  <ListItem>
                    <ListItemText
                      primary={`${currencySymbols[val]?.description} (${val})`}
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
