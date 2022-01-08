import React from "react";
import Paper from "@material-ui/core/Paper";
import { AVAILABLE_DEV_UTIL_OPTIONS } from "../../../constants";
import { Grid, Link } from "@material-ui/core";
import { SUB_URLS } from "./constants";

export default function TextDiff(): JSX.Element {
  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "70%", padding: "1% 10% 4% 10%" }}
    >
      <Grid container>
        {AVAILABLE_DEV_UTIL_OPTIONS.map((routeInfo, key) => {
          const availableSubRoutes = [];
          if (routeInfo.includeInHomePage) {
            availableSubRoutes.push(
              <Grid item xs={12} key={key}>
                <Link href={`/${routeInfo.url}`} underline="none">
                  {routeInfo.name}
                </Link>
              </Grid>
            );
          }
          if (routeInfo.hasSubRoutes && SUB_URLS[routeInfo.url]) {
            {
              SUB_URLS[routeInfo.url].map((subUrl, key) => {
                availableSubRoutes.push(
                  <>
                    <Grid item xs={1} key={key}></Grid>
                    <Grid item xs={11} key={key}>
                      <Link href={`/${subUrl.url}`} underline="none">
                        {subUrl.name}
                      </Link>
                    </Grid>
                  </>
                );
              });
            }
          }
          return availableSubRoutes;
        })}
      </Grid>
    </Paper>
  );
}
