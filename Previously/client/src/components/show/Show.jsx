import React, { useEffect, useState } from 'react';

import {
    Grid,
    Button
} from '@material-ui/core';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import {
    makeStyles
} from '@material-ui/core/styles';

import Stars from '../global/Stars';

import Seasons from './Seasons';
import api from '../../assets/js/api';

import './css/show.css';

const useStyles = makeStyles(() => ({
    seasonButton: {
        color: '#ff2244',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    actived: {
        backgroundColor: '#ff2244',
        color: '#f1f1f1',
        fontSize: '20px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#ff2244'
        }
    },
    icons: {
        fontSize: '35px',
        cursor: 'pointer'
    }
}));

export default function Show(props) {
    const classes = useStyles();

    const [show, setShow] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(1);

    const [favorited, setFavorited] = useState(null);
    const [archived, setArchived] = useState(null);

    useEffect(() => {
        const showId = props.match.params.id;

        api.getShow(showId).then((res) => {
            console.log(res);
            if (res.user.archived) {
                setArchived(true)
            } else {
                setArchived(false);
            }
            if (res.user.favorited) {
                setFavorited(true)
            } else {
                setFavorited(false);
            }
            setShow(res);
        }).catch((err) => {
            console.log(err);
        })

        return () => { };
    }, [props.match.params.id]);

    const displayGenres = (genres) => {
        let genresOutput = [];
        for (const genre in genres) {
            genresOutput.push(genre);
        }
        return genresOutput;
    }

    const addArchive = (id) => {
        api.addShowArchive(id).then((res) => {
            setArchived(true);
            console.log('show added to archive');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteArchive = (id) => {
        api.deleteShowArchive(id).then((res) => {
            setArchived(false);
            console.log('show deleted from archive');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const addFavorite = (id) => {
        api.addShowFavorite(id).then((res) => {
            setFavorited(true);
            console.log('show added to favorite');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteFavorite = (id) => {
        api.deleteShowFavorite(id).then((res) => {
            setFavorited(false);
            console.log('show deleted from favorite');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            {
                Object.keys(show).length > 0 ? (
                    <Grid container>
                        <Grid item xs={3} id='img-container'>
                            <img
                                id='show-img' src={show.images.poster}
                                alt={show.original_title + 'banner'} />
                        </Grid>
                        <Grid item xs={9} id='infos-container'>
                            <h3 id='show-title'>{show.original_title}</h3>
                            {favorited ? (
                                <FavoriteIcon onClick={() => {
                                    deleteFavorite(show.id);
                                }} className={classes.icons} />
                            ) : (
                                    <FavoriteBorderIcon onClick={() => {
                                        addFavorite(show.id);
                                    }} className={classes.icons} />
                                )}
                            {archived ? (
                                <BookmarkIcon onClick={() => {
                                    deleteArchive(show.id);
                                }} className={classes.icons} />
                            ) : (
                                    <BookmarkBorderIcon onClick={() => {
                                        addArchive(show.id);
                                    }} className={classes.icons} />
                                )}
                            <p><em>Seasons: {show.seasons}</em></p>
                            <p>Genre: {displayGenres(show.genres).map((genre, key) =>
                                <em key={key}>{genre + ' '}</em>
                            )}</p>
                            <p><em>{show.episodes}</em> épisode(s)</p>
                            <p id='show-description'><em>{show.description}</em></p>
                            <p>Average episode length : <em>{show.length} min.</em></p>
                            <Stars note={show.notes.mean} />
                            <p id='show-note'>({show.notes.mean.toFixed(2)} from {show.notes.total} votes)</p>
                            <div id='seasons-container'>
                                {show.seasons_details.map((season, key) =>
                                    <Button
                                        onClick={() => {
                                            setCurrentSeason(season.number)
                                        }}
                                        className={currentSeason === season.number ? classes.actived : classes.seasonButton} key={key}>
                                        Season {season.number}
                                    </Button>
                                )}
                                <Seasons id='show-episodes' showId={show.id} season={currentSeason} />
                            </div>
                        </Grid>
                    </Grid>
                ) : (null)
            }
        </>
    )
}