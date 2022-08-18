const Koa = require('koa');
const app = new Koa();
 
const Router = require('koa-router')
const router = new Router()
 
router.get('/', ctx => {
  ctx.body = `这是主页`
})
router.get('/person', ctx => {
  ctx.body = {
    id: 1,
    name: 'Alica'
  }
})

router.get('/user/login', ctx => {
  console.log(ctx.params);
  console.log(ctx.query); // 获取的是对象
  console.log(ctx.querystring); // 获取的是一个字符串
  console.log(ctx.url); // 获取url地址
  if (ctx.query.name === 'jack' || ctx.query.password === 'redballoon') {
    ctx.body = {
        code: 200,
        msg: '登录成功'
    }
    return
  }else{
    ctx.response.status = 401
    ctx.body = '登录失败'
  }
})
router.get('/api/user/login', ctx => {
  console.log(ctx);
  ctx.body = {
    id: 3,
    name: 'Alica'
  }
})
app
  .use(router.routes())
  .use(router.allowedMethods())
 
app.listen(4000);