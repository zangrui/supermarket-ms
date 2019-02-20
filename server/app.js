var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入子路由
var indexRouter = require('./routes/index');
var accountRouter = require('./routes/account');
var goodsRouter = require('./routes/goods');
var classifyRouter = require('./routes/classify');
var memberRouter = require('./routes/member');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//统一设置响应头 解决跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
});

// 引入express-jwt 用于验证token
const expressJwt = require('express-jwt');
// 定义秘钥
const secretKey = 'zhangrui';

// 使用模块 express-jwt 验证token
app.use(expressJwt({
  secret: secretKey
}).unless({
  path: ['/login/checklogin', '/login/upload']  // 不需要验证token的地址
}));

//拦截器
app.use((err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {
    //响应给前端的信息
    res.send({ error_code: 1, reason: '无效的token 未授权...' });
  }
});

//分配路由
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/goods', goodsRouter);
app.use('/classify', classifyRouter);
app.use('/member', memberRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000, () => {
  console.log('服务器启动成功！地址是：http://127.0.0.1:3000')
})
module.exports = app;
