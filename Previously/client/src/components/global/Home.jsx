import React, { useEffect, useState } from 'react';

import {
    Grid
} from '@material-ui/core';

import api from '../../assets/js/api';
import CardList from '../card/CardList';

export default function Home() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        api.followedShows().then((res) => {
            setShows(res.data.shows);
        }).catch((err) => {
            console.log(err);
        })
        return () => { };
    }, []);

    return (
        <Grid container>
            <Grid item>
                {shows.length > 0 ? (
                    <CardList shows={shows} private={true} />
                ) : (null)}
            </Grid>
        </Grid>
    )
}