import axios from 'axios';

import user from './user';

class Api {
    constructor() {
        this.clientId = '24a24546e256';
        this.secret = '8ffe8ae1aff3da64e8c2e52445066880';
        this.token = user.getToken();
    }

    discover(limit) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/shows/discover?limit=' + limit + '&key=' + this.clientId).then((res) => {
                resolve(res.data.shows)
            }, (err) => {
                reject(err);
            });
        });
    }

    followedShows() {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/shows/member?key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res);
            }).catch((err) => {
                console.log(err)
                reject(err);
            });
        })
    }

    addShow(id) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/shows/show', {
                id: id,
                key: this.clientId,
                access_token: this.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getShow(id) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/shows/display?id=' + id + '&key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res.data.show);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getEpisodesBySeason(showId, season) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/shows/episodes?id=' + showId + '&season=' + season + '&key=' + this.clientId + "&access_token=" + this.token).then((res) => {
                resolve(res.data.episodes);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getEpisode(episodeId) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/episodes/display?id=' + episodeId + '&key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res.data.episode);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    getEpisodePicture(episodeId) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/pictures/episodes?id=' + episodeId + '&width=350&height=250&key=' + this.clientId, {
                responseType: 'blob'
            }).then((res) => {
                resolve(URL.createObjectURL(res.data));
            }).catch((err) => {
                reject(err);
            })
        })
    }

    addShowArchive(showId) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/shows/archive', {
                id: showId,
                key: this.clientId,
                access_token: this.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    deleteShowArchive(showId) {
        return new Promise((resolve, reject) => {
            axios.delete('https://api.betaseries.com/shows/archive?id=' + showId + '&key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    addShowFavorite(showId) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/shows/favorite', {
                id: showId,
                key: this.clientId,
                access_token: this.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    deleteShowFavorite(showId) {
        return new Promise((resolve, reject) => {
            axios.delete('https://api.betaseries.com/shows/favorite?id=' + showId + '&key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    getRecommandationFriends() {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    'https://api.betaseries.com/friends/find?key=' + this.clientId + '&access_token=' + this.token
                )
                .then((res) => {
                    resolve(res.data.users);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    addFriend(friendId) {
        return new Promise((resolve, reject) => {
            axios
                .post("https://api.betaseries.com/friends/friend", {
                    id: friendId,
                    key: this.clientId,
                    access_token: this.token,
                })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getMemberFriends() {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    "https://api.betaseries.com/friends/list?key=" +
                    this.clientId +
                    "&access_token=" +
                    this.token
                )
                .then((res) => {
                    resolve(res.data.users);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    blockFriend(friendId) {
        return new Promise((resolve, reject) => {
            axios
                .post("https://api.betaseries.com/friends/block", {
                    id: friendId,
                    key: this.clientId,
                    access_token: this.token,
                })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    unblockFriend(friendId) {
        return new Promise((resolve, reject) => {
            axios
                .delete(
                    "https://api.betaseries.com/friends/block?key=" +
                    this.clientId +
                    "&access_token=" +
                    this.token +
                    "&id=" +
                    friendId
                )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    deleteFriend(friendId) {
        return new Promise((resolve, reject) => {
            axios
                .delete(
                    "https://api.betaseries.com/friends/friend?key=" +
                    this.clientId +
                    "&access_token=" +
                    this.token +
                    "&id=" +
                    friendId
                )
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    getBlockedFriends() {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    "https://api.betaseries.com/friends/list?key=" +
                    this.clientId +
                    "&access_token=" +
                    this.token +
                    "&blocked=true"
                )
                .then((res) => {
                    resolve(res.data.users);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    addViewedEpisode(episodeId) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/episodes/watched', {
                id: episodeId,
                key: this.clientId,
                access_token: this.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    deleteViewedEpisode(episodeId) {
        return new Promise((resolve, reject) => {
            axios.delete('https://api.betaseries.com/episodes/watched?id=' + episodeId + '&key=' + this.clientId + '&access_token=' + this.token).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    findFriendByMail(friendEmail) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.betaseries.com/friends/find?key=' + this.clientId + '&access_token=' + this.token + '&type=emails&emails=' + friendEmail).then((res) => {
                resolve(res.data.users);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    sendEpisodeComment(comment, episodeId) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/comments/comment', {
                type: 'episode',
                id: episodeId,
                text: comment,
                key: this.clientId,
                access_token: this.token
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default new Api();