import React, { useState } from 'react';

import {
    Grid,
    IconButton
} from '@material-ui/core';

import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

import {
    Link
} from 'react-router-dom';

import './css/header.css';

import user from '../../assets/js/user';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    toggleOnIcon: {
        fontSize: '75px',
        color: '#2ecc71'
    },
    toggleOffIcon: {
        fontSize: '75px',
        color: '#ff2244'
    },
    button: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function Header() {
    const classes = useStyles();
    const [toggle, setToggle] = useState(user.isAuthenticated());

    return (
        <Grid
            id='header' container
            justify='center' alignItems='center'>
            <Grid item xs={8}>
                <Grid container justify='space-evenly' alignItems='center' id='header-links-container'>
                    <Grid item className='header-links'>
                        <Link to='/home' className='header-link'>Accueil</Link>
                    </Grid>
                    <Grid item className='header-links'>
                        <Link to='/discover' className='header-link'>Découvrir</Link>
                    </Grid>
                    <Grid item className='header-links'>
                        <Link to='/friends' className='header-link'>Amis</Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container justify='center' alignItems='center'>
                    <Grid item>
                        <IconButton onClick={() => {
                            if (user.isAuthenticated()) {
                                window.location.href = '/disconnect';
                            }
                        }} onMouseEnter={() => {
                            if (user.isAuthenticated()) {
                                setToggle(false);
                            } else {
                                setToggle(true);
                            }
                        }} onMouseLeave={() => {
                            if (user.isAuthenticated()) {
                                setToggle(true);
                            } else {
                                setToggle(false);
                            }
                        }} className={classes.button}>
                            {user.isAuthenticated() ? (
                                toggle ? (
                                    <ToggleOnIcon className={classes.toggleOnIcon} />
                                ) : (
                                        <ToggleOffIcon className={classes.toggleOffIcon} />
                                    )
                            ) : (
                                    toggle ? (
                                        <ToggleOnIcon className={classes.toggleOnIcon} />
                                    ) : (
                                            <ToggleOffIcon className={classes.toggleOffIcon} />
                                        )
                                )}
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}