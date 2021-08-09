import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getTime, getUnixTime, fromUnixTime } from "date-fns";
import { Grid } from "@material-ui/core";

export default function Notes(): JSX.Element {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const currentUnixTimeStamp = getUnixTime(currentDate);
  const currentTimeStamp = getTime(currentDate);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "70%", padding: "1% 10% 4% 10%" }}
    >
      <Grid container direction="row" alignItems="baseline">
        <Typography variant="h6" component="h6" align="center">
          Current Time
        </Typography>
        &nbsp;{`: ${fromUnixTime(currentUnixTimeStamp)}`}
      </Grid>
      <Grid container direction="row" alignItems="baseline">
        <Typography variant="h6" component="h6" align="center">
          Current unix timestamp
        </Typography>
        &nbsp;{`(in seconds) : ${currentUnixTimeStamp}`}
      </Grid>
      <Grid container direction="row" alignItems="baseline">
        <Typography variant="h6" component="h6" align="center">
          Current timestamp
        </Typography>
        &nbsp;{`(in milliseconds) : ${currentTimeStamp}`}
      </Grid>
    </Paper>
  );
}
