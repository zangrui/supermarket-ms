/*
  登录路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect');
//引入jwt
const jwt = require('jsonwebtoken');


/** 
 * 验证登录路由 /checklogin
*/
router.post('/checklogin', (req, res) => {
  //接收账号和密码
  console.log(1)

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
      const token = jwt.sign(accountData, secretKey, { expiresIn: 60*60 });//token1小时过期
      res.send({ 'error_code': 0, 'reason': `欢迎您！${data[0].username}`, token, 'username': accountData.username })
    } else {
      res.send({ 'error_code': 1, 'reason': '账号或密码错误！' })
    }
  });
});

/* 
  头像上传请求
*/
// node后端处理上传文件的模块
var multer = require('multer');

// 配置存储路径 重命名
var storage = multer.diskStorage({
  // 配置文件上传到服务器后的位置
  destination: 'public/upload',
  // 文件的名字
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  // ['avatar', 'jpg']
    // 取时间戳
    var filename = new Date().getTime();
    // 拼接文件名 时间戳.jpg
    cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
  }
});

// 上传对象
var upload = multer({
  storage
});

// 上传请求
router.post('/upload', upload.single('file'), (req, res) => {
  let { filename } = req.file;
  let { username } = req.body;
  let imgUrl = '/upload/' + filename;
  // 把图片地址存入数据库
  // 构造sql
  const sqlStr = `update account set imgurl='${imgUrl}' where username='${username}'`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send('上传成功!');
    } else {
      res.send('上传失败!');
    }
  });
});


module.exports = router;
