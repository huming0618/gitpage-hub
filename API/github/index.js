const API = "/github";
const prefix = {'prefix': API};
const router = require('koa-router')(prefix);
const url = require('url');
const querystring  = require("querystring");
const axios = require('axios');
const github = require('../../github');

const API_CLIENTID = '7bac713cd8c6857a392d';
const API_SECRET = 'b4207660fd700caef43412018c6588809df13beb';

router.get('/', async (ctx) => {
    ctx.body = {
        'error': 'the detail of action is required',
        'errorCode': 100
    }
    ctx.res.statusCode = 500;
});

router.get('/get/ref', async (ctx)=>{

    ///repos/:owner/:repo/git/refs/heads/skunkworkz/featureA
    const repo = 'huming0618.github.io';
    const ref = 'heads/master';
    const user = 'huming0618';
    const url = `https://api.github.com/repos/${user}/${repo}/git/refs/${ref}`;
    console.log(url);
    await axios
            .get(url)
            .then((resp)=>{
                //https://api.github.com/repos/huming0618/huming0618.github.io/git/commits/47c8c06d79e7020fd9815aca22e3352d609ed5ee
                if (resp.status === 200){
                    ctx.body = 'auth OK ! ' + resp.data;
                    console.log(resp.data)
                }
                else {
                    ctx.body = 'auth Error!';
                }
            })
});

router.get('/auth/success', async (ctx)=>{
    //http://localhost:9003/github/auth/success?code=9a5d4d559903badff7bb
    
    const authCode = querystring.parse(ctx.querystring)['code'];
    console.log('authCode', authCode);

    if (authCode){
        const result = await github.doAuth(authCode);
        ctx.body = 'auth OK!';
    }
});

//http://localhost:9003/github/auth/github.com
router.get('/auth/:host', async (ctx) => {
    const host = ctx.params.host;
    const res = ctx.res;

    github.init(host);

    //ctx.body = {'host': host };
    const authURL = github.getOAuthURL();
    console.log(authURL);
    //res.statusCode = 302;
    ctx.redirect(authURL);
});

module.exports = router;
