import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import api from "../../assets/js/api";

import FriendListRecommandation from "./FriendListRecommandation";
import FriendList from "./FriendList";
import SearchIcon from "@material-ui/icons/Search";

import { makeStyles } from "@material-ui/core/styles";

import "./css/friends.css";

const useStyles = makeStyles(() => ({
  PersonAddIcon: {
    color: "#f1f1f1",
    fontSize: "35px",
    verticalAlign: "middle",
    marginLeft: "15px",
    cursor: "pointer",
  },
}));

export default function Friends(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [friends, setFriends] = useState([]);
  const [blockedFriends, setBlockedFriends] = useState([]);
  const [friendsRecommandation, setFriendsRecommandation] = useState([]);

  useEffect(() => {
    api
      .getRecommandationFriends()
      .then((res) => {
        setFriendsRecommandation(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getMemberFriends()
      .then((res) => {
        setFriends(res);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getBlockedFriends()
      .then((res) => {
        setBlockedFriends(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const findFriend = () => {
    api
      .findFriendByMail(name)
      .then((res) => {
        setFriendsRecommandation(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid id="friend-box" container>
      <Grid item xs={5}>
        <div id="friend-container">
          <h2 id="friend-title"> Amis </h2>
          <FriendList friends={friends} />
          <h2 id="friend-title"> Utilisateurs Bloqués </h2>
          <FriendList friends={blockedFriends} blocked={true} />
        </div>
      </Grid>
      <Grid item xs={7}>
        <div id="friend-recommandation">
          <input
            placeholder="Envoyer une demande d'ami .."
            type="text"
            onChange={(e) => {
              handleName(e);
            }}
            id="friend-search"
          />
          <SearchIcon
            onClick={() => {
              findFriend();
            }}
            className={classes.PersonAddIcon}
          />{" "}
        </div>
        <div>
          <FriendListRecommandation friends={friendsRecommandation} />
        </div>
      </Grid>
    </Grid>
  );
}
