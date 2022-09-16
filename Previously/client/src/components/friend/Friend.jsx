import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { IconButton, Grid } from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import api from "../../assets/js/api";

import "./css/friend.css";
const useStyles = makeStyles(() => ({
  pseudos: {
    color: "white",
  },
}));
export default function Friend(props) {
  const classes = useStyles();

  const [toggle, setToggle] = useState(true);

  const addFriend = (friendId) => {
    api
      .addFriend(friendId)
      .then((res) => {
        setToggle(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {toggle ? (
        <Grid item xs={2} className="friend-box">
          <h5 className={classes.pseudos}>{props.friend.login}</h5>
          <IconButton
            className={classes.pseudos}
            onClick={() => {
              addFriend(props.friend.id);
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Grid>
      ) : null}
    </>
  );
}
