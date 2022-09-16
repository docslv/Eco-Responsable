import React from 'react';

import {
    Switch,
    Route,
    withRouter,
    Redirect
} from 'react-router-dom';

import Header from '../components/global/Header';

import GetCode from '../components/global/GetCode';

import Home from '../components/global/Home';
import Discover from '../components/global/Discover';
import Friends from '../components/friend/Friends';

import Show from '../components/show/Show';
import Episode from '../components/episode/Episode';

import Login from '../components/global/Login';
import Logout from '../components/global/Logout';

import user from '../assets/js/user';

const ConnectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        user.isAuthenticated()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

const NotConnectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        user.isAuthenticated()
            ? <Redirect to='/home' />
            : <Component {...props} />
    )} />
)

function Routes() {
    return (
        <>
            <Header />
            <Switch>
                <NotConnectedRoute exact path='/login' component={Login} /> 
                <NotConnectedRoute exact path='/getcode' component={GetCode} />
                <ConnectedRoute exact path='/disconnect' component={Logout} />
                <ConnectedRoute exact path='/home' component={Home} />
                <ConnectedRoute exact path='/discover' component={Discover} />
                <ConnectedRoute exact path='/friends' component={Friends} />
                <ConnectedRoute path='/show/:id' component={Show} />
                <ConnectedRoute path='/episode/:id' component={Episode} />
                <Route path='*'>
                    <Redirect to='/home' />
                </Route>
            </Switch>
        </>
    )
}

export default withRouter(Routes);