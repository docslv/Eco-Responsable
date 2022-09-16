import React, { useState } from 'react';

import {
    Grid,
    IconButton
} from '@material-ui/core';

import AddBoxIcon from '@material-ui/icons/AddBox';

import './css/card.css';

import api from '../../assets/js/api';

import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    addIcon: {
        fontSize: '50px',
        color: '#ff2244',
        transition: 'all 0.3s',
        '&:hover': {
            color: '#2ecc71'
        }
    }
}))

export default function Card(props) {

    const [pressStart, setPressStart] = useState(null);

    const classes = useStyles();
//genre cinémato
    const displayGenres = (genres) => {
        let genresOutput = [];
        let i = 0;
        for (const genre in genres) {
            genresOutput.push(genre);
            i++;
            if (i === 2) {
                break;
            }
        }
        return genresOutput;
    }
// résumé
    const shortenDesc = (str, maxLen, separator = ' ') => {
        if (str.length <= maxLen) {
            return str;
        }
        return str.substr(0, str.lastIndexOf(separator, maxLen)) + '...';
    }
// fav
    const addShow = (id) => {
        if (!props.private) {
            api.addShow(id).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
// appui long
    const longPress = (id) => {
        const now = Date.now();

        if ((now - pressStart) > 600) {
            window.location.replace('/show/' + id);
        }
    };

    return (
        <Grid item xs={4} className='card'>
            <div className='img-container'>
                <img
                    className='card-img' src={props.show.images.poster}
                    alt={props.show.original_title + 'banner'}
                    onMouseDown={(e) => {
                        setPressStart(Date.now())
                    }}
                    onMouseUp={(e) => {
                        longPress(props.show.id);
                    }} />
            </div>
            <div className='infos-container'>
                <h3 className='card-title'>{props.show.original_title}</h3>
                <p>Saison(s): <em>{props.show.seasons}</em></p>
                <p>Genre: {displayGenres(props.show.genres).map((genre, key) =>
                    <em key={key}>{genre + ' '}</em>
                )}</p>
                <p><em>{props.show.episodes}</em> épisode(s)</p>
                <p><em>{shortenDesc(props.show.description, 150)}</em></p>
                {
                    props.private ? (null) : (
                        <IconButton
                            onClick={() => { addShow(props.show.id) }}>
                            <AddBoxIcon
                                size='large' className={classes.addIcon} />
                        </IconButton>
                    )
                }
            </div>
        </Grid>
    )
}