// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Grid, MenuItem, TextField } from "@material-ui/core";
import React from "react";
import { useRouter } from "next/router";
import { BEAUTIFIERS } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CodeBeautifiers(): any {
  const { push: routerPush, asPath: fullRoute } = useRouter();
  const [, selectedBeautifierURL = ""] = fullRoute
    .split("/")
    .filter((val) => val);

  const [selectedBeautifier, setSelectedBeautifier] = React.useState(
    decodeURI(selectedBeautifierURL)
  );

  const handleBeautifierSelect = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newBeautifier = event?.target?.value as string;
    setSelectedBeautifier(newBeautifier);
    routerPush(`/code-format-beautify/${newBeautifier}`);
  };

  const getBeautifierOptions = React.useCallback(() => {
    return Object.keys(BEAUTIFIERS).map((val, index: number) => {
      return (
        <MenuItem value={val} key={`${val.id}_${index}`}>
          {val}
        </MenuItem>
      );
    });
  }, []);
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={6}>
        <TextField
          fullWidth
          value={selectedBeautifier}
          onChange={handleBeautifierSelect}
          select
          label="Beautifier/Formatter"
          helperText="Please select a language"
          variant="outlined"
          defaultValue=""
        >
          <MenuItem value="">None</MenuItem>
          {getBeautifierOptions()}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        {BEAUTIFIERS[selectedBeautifier]}
      </Grid>
    </Grid>
  );
}
