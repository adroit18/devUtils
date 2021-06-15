import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export default function Notes(): JSX.Element {
 const [notesMetadata, setNotesMetadata] = React.useState([]);
  return (
    <Paper
      variant="elevation"
      elevation={3}
      style={{ width: "70%", padding: "1% 10% 4% 10%" }}
    >
      <Typography  variant="h2" component="h2" align="center">
       Coming Soon
      </Typography>
    </Paper>
  );
}
