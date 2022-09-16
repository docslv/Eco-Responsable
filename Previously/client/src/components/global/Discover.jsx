import React, { useEffect, useState } from 'react';

import {
    Grid
} from '@material-ui/core';

import CardList from '../card/CardList';

import api from '../../assets/js/api';

export default function Discover() {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        api.discover(15)
            .then((res) => {
                setShows(res);
            })
            .catch((err) => {
                console.log('err ' + err);
            })
        return () => { };
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                {shows.length > 0 ? (
                    <CardList shows={shows} />
                ) : (null)}
            </Grid>
        </Grid>
    )
}