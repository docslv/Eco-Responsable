import React from 'react';

import {
    Grid
} from '@material-ui/core';

import Card from './Card';

import './css/card_list.css';

export default function CardList(props) {
    return (
        <Grid container>
            {props.shows.map((show, key) =>
                <Card key={key} show={show} private={props.private ? true : false} />
            )}
        </Grid>
    )
}