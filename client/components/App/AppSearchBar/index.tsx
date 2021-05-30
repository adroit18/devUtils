import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import UtilMenu from "../UtilMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function AppSearchBar(): JSX.Element {
  const classes = useStyles();
  const [showUtilMenu, setShowUtilMenu] = React.useState(false);

  const handleUtilMenuOpen = (): void => {
    setShowUtilMenu(true);
  };

  const handleUtilMenuClose = (): void => {
    setShowUtilMenu(false);
  };

  return (
    <div className={classes.root}>
      <UtilMenu
        showUtilMenu={showUtilMenu}
        handleUtilMenuClose={handleUtilMenuClose}
        handleUtilMenuOpen={handleUtilMenuOpen}
      />
    </div>
  );
}
