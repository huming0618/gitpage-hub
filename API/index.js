const github = require('./github');
const list = [github];

const fn = (app) => {
  //CQRS, refer to npm install koa-cors


  list.forEach((route) => {
    app.use(route.routes())
       .use(route.allowedMethods({ throw: true }))
  });
}

module.exports = fn;
