import React, { useState } from 'react';

import {
    Grid,
    IconButton
} from '@material-ui/core';

import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import user from '../../assets/js/user';

import {
    makeStyles
} from '@material-ui/core/styles';

import './css/login.css';

const useStyles = makeStyles(() => ({
    lockOpen: {
        color: '#2ecc71',
        fontSize: '150px'
    },
    lockClose: {
        color: '#ff2244',
        fontSize: '150px'
    }
}))

export default function Login() {
    const classes = useStyles();
    const [lock, setLock] = useState(false);

    return (
        <Grid container justify='center'>
            <Grid item xs={8}>
                <div id='login-container'>
                    <IconButton onMouseEnter={() => {
                        setLock(true)
                    }} onMouseLeave={() => {
                        setLock(false)
                    }} onClick={() => {
                        user.con();
                    }}>
                        {lock ? (
                            <LockOpenIcon className={classes.lockOpen} />
                        ) : (
                                <LockIcon className={classes.lockClose} />
                            )
                        }
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    )
}