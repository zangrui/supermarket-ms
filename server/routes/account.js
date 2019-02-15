/*
  账号管理路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect')
//统一设置响应头 解决跨域
router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

/** 
 * 添加账号路由 /accountadd
*/
router.post('/accountadd', (req, res) => {
  //接收数据
  let { username, password, usergroup } = req.body;
  //构造增加账号的sql语句
  const sqlStr = `insert into account(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "添加账号成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "添加账号失败！" });
    }
  });
});

/** 
 * 账号列表路由 /accountlist
*/
router.get('/accountlist', (req, res) => {
  //构造查询账号数据的sql语句   按照时间排序  降序
  const sqlStr = 'select * from account order by ctime desc';
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/** 
 * 账号删除路由 /accountdel
*/
router.get('/accountdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造删除账号的sql语句   根据id删除
  const sqlStr = `delete from account where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除账号成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除账号失败！" });
    }
  });
});

/** 
 * 账号修改路由 /accountedit
*/
router.get('/accountedit', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造查询账号的sql语句 
  const sqlStr = `select * from account where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
module.exports = router;
