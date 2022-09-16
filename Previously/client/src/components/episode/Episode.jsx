import React, { useEffect, useState } from 'react';

import {
    Grid,
    Button
} from '@material-ui/core';

import Stars from '../global/Stars';
import Seasons from '../show/Seasons';

import api from '../../assets/js/api';

import './css/episode.css';

import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    commentButton: {
        color: '#f1f1f1',
        fontSize: '24px'
    }
}))

export default function Episode(props) {
    const classes = useStyles();

    const [episode, setEpisode] = useState([]);
    const [episodePicture, setEpisodePicture] = useState([]);
    const [comment, setComment] = useState('');

    const dateformat = require('dateformat');

    useEffect(() => {
        const episodeId = props.match.params.id;

        api.getEpisode(episodeId).then((res) => {
            console.log(res);
            setEpisode(res);
        }).catch((err) => {
            console.log(err);
        })

        api.getEpisodePicture(episodeId).then((res) => {
            setEpisodePicture(res);
        }).catch((err) => {
            console.log(err);
        })
        return () => { };
    }, [props.match.params.id]);

    const dateFormat = (inputDate) => {
        const outputDate = dateformat(inputDate, 'longDate')

        return outputDate;
    }

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const sendComment = (episodeId) => {
        console.log(comment, episodeId)
        api.sendEpisodeComment(comment, episodeId).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            {Object.keys(episode).length > 0 ? (
                <>
                    <Grid container justify='center' id='episode-infos-container'>
                        <Grid item xs={6} id='episode-infos'>
                            <h4 id='episode-big-title'>{episode.show.title} - {episode.code}</h4>
                            <em id='episode-title'>{episode.title} - {dateFormat(episode.date)}</em>
                            <p id='episode-description'>{episode.description}</p>
                            <Stars note={episode.note.mean} />
                            <p id='show-note'>({episode.note.mean.toFixed(2)} from {episode.note.total} votes)</p>
                            <textarea id='episode-comment' onChange={(e) => {
                                handleComment(e);
                            }}></textarea>
                            <Button onClick={() => {
                                sendComment(episode.id);
                            }} className={classes.commentButton}>Comment</Button>
                        </Grid>
                        <Grid item>
                            <img id='episode-img' src={episodePicture}
                                alt={episode.code + ' image'} />
                        </Grid>
                    </Grid>
                    <Grid container justify='center'>
                        <Grid item xs={10}>
                            <Seasons id='episode-season' showId={episode.show.id} season={episode.season} />
                        </Grid>
                    </Grid>
                </>
            ) : (null)}
        </>
    )
}