import React from "react";
import { IconButton } from "@material-ui/core";

import BlockIcon from "@material-ui/icons/Block";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";

import api from "../../assets/js/api";

export default function FriendList(props) {
  const blockFriend = (friendId) => {
    api
      .blockFriend(friendId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unblockFriend = (friendId) => {
    api
      .unblockFriend(friendId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFriend = (friendId) => {
    api
      .deleteFriend(friendId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {props.friends.map((friend, key) => (
        <div key={key}>
          <span>{friend.login} </span>
          {props.blocked ? (
            <IconButton
              onClick={() => {
                unblockFriend(friend.id);
              }}
            >
              <RestoreFromTrashIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  blockFriend(friend.id);
                }}
              >
                <BlockIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteFriend(friend.id);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>{" "}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
