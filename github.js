const axios = require('axios');
const querystring  = require("querystring");

const API_CLIENTID = '7bac713cd8c6857a392d';
const API_SECRET = 'b4207660fd700caef43412018c6588809df13beb';

let accessToken = null;
let host = null;

const symbol = Symbol.for("github.api");

const isCreated = ()=>{
    return Object.getOwnPropertySymbols(global).indexOf(symbol) > -1;
}

const wrapper = {
    init: (hostname)=>{
        if (isCreated()){
            return;
        }
        host = hostname;
        global[symbol] = this;
    },

    getOAuthURL: ()=>{
        const oauthConfig = {
            client_id: API_CLIENTID,
            //redirect_uri: 'http://localhost:9000/github/auth/success',
            scope: 'repo, user'
        }

        return `https://${host}/login/oauth/authorize?${querystring.stringify(oauthConfig)}`;
    },

    doAuth: (authCode)=>{
        return new Promise((resolve,reject)=>{
            const payload = {
                client_id: API_CLIENTID,
                client_secret: API_SECRET,
                code: authCode
            }
    
            axios
                .post(`https://${host}/login/oauth/access_token`, payload)
                .then((resp)=>{
                    if (resp.status === 200){
                        accessToken = querystring.parse(resp.data)['access_token'];
                        console.log('accessToken', accessToken);
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                })
        })
    },


}

module.exports = wrapper;