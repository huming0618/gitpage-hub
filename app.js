// require("babel-core/register")({
//      presets: ['es2015-node5', 'stage-3']
// });

const github = require('./github');
const koa = require('koa');
const convert = require('koa-convert');
const cors = require('koa-cors');
const path = require('path');
const fs = require('fs');

const serve = require('koa-static-server');

const addAPIRoutes = require('./API');



const app = new koa();

// app.use(convert(router.routes()));
app.use(cors());
addAPIRoutes(app);
app.use(convert(serve({"rootDir":"public", "index": "index.html"})));




// app.use(async (ctx, next) => {
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       ctx.body = 'Hello asynchronous world!';
//       resolve();
//     }, 100);
//   });
// });

(function(){
    const walk = require('walk');
    const sourcePath = path.join(__dirname, 'git-blog/public')

    const items = require('./scan-folder')(sourcePath);


}())

app.listen(9003);
