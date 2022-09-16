import React, { useEffect } from "react";

import { Grid, CircularProgress } from "@material-ui/core";

import user from "../../assets/js/user";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loading: {
    color: "#ff2244",
  },
}));

export default function GetCode() {
  const classes = useStyles();

  useEffect(() => {
    user
      .discon()
      .then((res) => {
        user.removeToken();
        window.location.href = "/login";
      })
      .catch((err) => {
        user.removeToken();
        window.location.href = "/login";
      });

    return () => {};
  }, []);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid style={{ textAlign: "center" }} item>
        <h2>Logging Out ...</h2>
        <CircularProgress size="75px" className={classes.loading} />
      </Grid>
    </Grid>
  );
}
