import axios from 'axios';

class User {
    constructor() {
        this.clientId = '24a24546e256';
        this.secret = '8ffe8ae1aff3da64e8c2e52445066880';
    }

    con() {
        window.location.href = 'https://www.betaseries.com/en/authorize?client_id=24a24546e256&redirect_uri=http://localhost:3000/getcode ';
    }

    discon() {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/members/destroy', {
                key: this.clientId,
                access_token: this.getToken()
            }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    recoverToken(code) {
        return new Promise((resolve, reject) => {
            axios.post('https://api.betaseries.com/oauth/access_token', {
                client_id: this.clientId,
                client_secret: this.secret,
                redirect_uri: 'http://localhost:3000/getcode',
                code: code
            }).then((res) => {
                resolve(res.data.access_token);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    getToken() {
        const token = localStorage.getItem('token');

        return token;
    }

    isAuthenticated() {
        const token = this.getToken();

        if (token === null) {
            return false;
        }
        return true;
    }
}

export default new User();