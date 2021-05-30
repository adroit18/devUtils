import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import Alert, { Color } from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export default function Snackbars(props: {
  severity: Color;
  message: string;
  show: boolean;
}): JSX.Element {
  const { severity, message, show } = props;
  const [open, setOpen] = React.useState(show);
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        elevation={6}
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
