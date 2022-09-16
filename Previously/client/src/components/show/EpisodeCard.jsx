import React, { useEffect, useState } from 'react';

import {
    makeStyles
} from '@material-ui/core/styles';

import FindInPageIcon from '@material-ui/icons/FindInPage';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import './css/episode_card.css';

import api from '../../assets/js/api';

const useStyles = makeStyles(() => ({
    moreIcon: {
        fontSize: '95px',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.05)'
        },
        '&:active': {
            transform: 'scale(0.95)'
        }
    },
    seenIcon: {
        color: '#2ecc71',
        cursor: 'pointer',
        '&:hover': {
            color: '#ff2244'
        }
    },
    notSeenIcon: {
        color: '#ff2244',
        cursor: 'pointer',
        '&:hover': {
            color: '#2ecc71'
        }
    }
}))

export default function EpisodeCard(props) {

    const classes = useStyles();

    const [episodePicture, setEpisodePicture] = useState([]);
    const [seen, setSeen] = useState(false);
    const [pressStart, setPressStart] = useState(null);

    useEffect(() => {
        api.getEpisodePicture(props.episode.id).then((res) => {
            setEpisodePicture(res);
        }).catch((err) => {
            console.log(err);
        });

        if (props.episode.user.seen) {
            setSeen(true);
        } else {
            setSeen(false);
        }
        return () => { };
    }, [props.episode]);

    const longPress = (id) => {
        const now = Date.now();

        if ((now - pressStart) > 600) {
            window.location.replace('/episode/' + id);
        }
    };

    const addViewed = (episodeId) => {
        api.addViewedEpisode(episodeId).then((res) => {
            setSeen(true);
        }).catch((err) => {
            console.log(err);
        })
    };

    const deleteViewed = (episodeId) => {
        api.deleteViewedEpisode(episodeId).then((res) => {
            setSeen(false);
        }).catch((err) => {
            console.log(err);
        })
    };

    return (
        <div className='episode-container'>
            <img src={episodePicture} className='episode-img'
                alt={props.episode.code + ' image'} />
            <div className='episodes-infos'>
                <h4 className='episode-code'>{props.episode.code}
                </h4>
                <p className='episode-title'>{props.episode.title}</p>
                <p><FindInPageIcon
                    onMouseDown={(e) => {
                        setPressStart(Date.now())
                    }}
                    onMouseUp={(e) => {
                        longPress(props.episode.id);
                    }}
                    className={classes.moreIcon} />
                </p>
                {seen ? (
                    <p>
                        <VisibilityIcon onClick={() => {
                            deleteViewed(props.episode.id);
                        }} className={classes.seenIcon} />
                    </p>
                ) : (
                        <p>
                            <VisibilityOffIcon onClick={() => {
                                addViewed(props.episode.id);
                            }} className={classes.notSeenIcon} />
                        </p>
                    )}
            </div>
        </div>
    )
}