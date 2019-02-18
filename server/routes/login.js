/*
  登录路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect');

//引入jwt
const jwt = require('jsonwebtoken');

  //统一设置响应头 解决跨域
  router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

/** 
 * 验证登录路由 /checklogin
*/
router.post('/checklogin', (req, res) => {
  //接收账号和密码
  let { username, password } = req.body;
  //构造查询sql语句
  const sqlStr = `select * from account where username='${username}' and password='${password}'`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断是否存在
    if (data.length) {
      // 当前登录账号数据
      const accountData = JSON.parse(JSON.stringify(data[0]));
      // 定义秘钥
      const secretKey = 'zhangrui';
      // 生成token
      const token = jwt.sign(accountData, secretKey, {expiresIn: 60 * 60});//token1小时过期
      res.send({ 'error_code': 0, 'reason': `欢迎您！${data[0].username}`, token, 'username':accountData.username })
    } else {
      res.send({ 'error_code': 1, 'reason': '账号或密码错误！' })
    }
  });
});

module.exports = router;
