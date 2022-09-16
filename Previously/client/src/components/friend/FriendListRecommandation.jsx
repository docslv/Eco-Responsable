import React from "react";

import { Grid } from "@material-ui/core";

import Friend from "./Friend";

import "./css/friend_list_recommandation.css";

export default function FriendListRecommandation(props) {
  const displayFriend = (friend) => {
    if (friend.login === "" || friend.in_account) {
      return false;
    }
    return true;
  };
  return (
    <Grid container justify="center">
      <h1 id="recommandation_title">Recommandation </h1>
      {props.friends.map((friend, key) =>
        displayFriend(friend) ? <Friend key={key} friend={friend} /> : null
      )}
    </Grid>
  );
}
