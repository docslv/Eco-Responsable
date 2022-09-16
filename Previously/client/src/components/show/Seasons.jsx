import React, { useEffect, useState, } from 'react';

import EpisodeCard from './EpisodeCard';

import api from '../../assets/js/api';

import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './css/seasons.css';

import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    arrowIcon: {
        fontSize: '45px'
    }
}))

export default function Seasons(props) {
    const classes = useStyles();

    const [episodes, setEpisodes] = useState([]);

    const carousel = React.createRef();

    useEffect(() => {
        api.getEpisodesBySeason(props.showId, props.season).then((res) => {
            console.log(res);
            setEpisodes(res);
        }).catch((err) => {
            console.log(err);
        })
        return () => { };
    }, [props.season, props.showId]);

    const scrollLeft = () => {
        carousel.current.scrollLeft = carousel.current.scrollLeft + 720;
    }

    const scrollRight = () => {
        carousel.current.scrollLeft = carousel.current.scrollLeft - 720;
    }

    return (
        <div id='episodes-container'>
            <div
                className='carousel-arrow'
                id='carousel-arrow-left'
                onClick={() => {
                    scrollRight();
                }}>
                <NavigateBeforeIcon className={classes.arrowIcon} />
            </div>
            <div
                className='carousel-arrow'
                id='carousel-arrow-right'
                onClick={() => {
                    scrollLeft();
                }}>
                <NavigateNextIcon className={classes.arrowIcon} />
            </div>
            <div ref={carousel} id='episodes-carousel'>
                {episodes.length > 0 ? (
                    episodes.map((episode, key) =>
                        <EpisodeCard key={key} episode={episode} />
                    )
                ) : (null)}
            </div>
        </div>
    )
}