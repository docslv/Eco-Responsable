import React, { useEffect } from 'react';

import {
    Grid,
    CircularProgress
} from '@material-ui/core';

import user from '../../assets/js/user';

import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    loading: {
        color: '#ff2244'
    }
}))

export default function GetCode(props) {
    const classes = useStyles();

    useEffect(() => {
        const queryString = require('query-string');

        const parsed = queryString.parse(props.location.search);

        const code = parsed.code;

        if (code !== null) {
            console.log(code);
            user.recoverToken(code).then((res) => {
                user.setToken(res);
                window.location.href = '/home';
            }).catch((err) => {
                console.log(err);
            })
        }

        return () => { };
    }, [props.location.search]);

    return (
        <Grid container justify='center' alignItems='center'>
            <Grid style={{ textAlign: 'center' }} item>
                <h2>Connexion ...</h2>
                <CircularProgress size='75px' className={classes.loading} />
            </Grid>
        </Grid>
    )
}