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
 * 验证账号路由 /checkaccount
*/
router.get('/checkaccount', (req, res) => {
  //接收数据
  let { username } = req.query;
  //构造sql语句
  const sqlStr = `select * from account where username='${username}'`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.length) {
      res.send({ "error_code": 1, "reason": "账号已存在" });
    } else {
      res.send({ "error_code": 0, "reason": "账号可以使用" });
    }
  });
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
 * 按分页显示账号列表路由 /accountlistbypage
*/
router.get('/accountlistbypage', (req, res) => {
  //接收参数
  let { pageSize, currentPage } = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  //构造查询所有账号数据的sql语句   按照时间排序  降序
  let sqlStr = 'select * from account order by ctime desc';
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //获取数据总条数
    let total = data.length;
    //分页条件 跳过多少条
    let n = (currentPage - 1) * pageSize;
    //拼接分页的sql语句
    sqlStr += ` limit ${n}, ${pageSize}`;
    //执行sql语句
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      res.send({ total, data });
    });
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

/** 
 * 账号保存修改路由 /accountsaveedit
*/
router.post('/accountsaveedit', (req, res) => {
  //接收修改后的账号数据 和id
  let { username, usergroup, id } = req.body;
  //构造修改账号的sql语句 
  const sqlStr = `update account set username='${username}', usergroup='${usergroup}' where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改账号成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "修改账号失败！" });
    }
  });
});

/** 
 * 批量删除路由 /batchdelete
*/
router.get('/batchdelete', (req, res) => {
  //接收id
  let { selectedId } = req.query;
  //构造删除账号的sql语句 
  const sqlStr = `delete from account where id in (${selectedId})`;
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
 * 验证旧密码路由 /checkOldPwd
 */
router.get('/checkOldPwd', (req, res) => {
  //接收旧密码和用户名
  let { oldPwd, username } = req.query;
  //构造sql
  const sqlStr = `select * from account where username='${username}' and password='${oldPwd}'`;
  //执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.length) {
      res.send({ "error_code": 0, "reason": "旧密码正确" });
    } else {
      res.send({ "error_code": 1, "reason": "旧密码错误" });
    }
  });
});

/**
 * 保存新密码路由 /savenewpwd
 */
router.post('/savenewpwd', (req, res) => {
  //接收旧密码和用户名和新密码
  let { oldPwd, username, newPwd } = req.query;
  //构造sql
  const sqlStr = `update account set password='${newPwd}' where username='${username}' and password='${oldPwd}'`;
  //执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "密码修改成功！请重新登录！" });
    } else {
      res.send({ "error_code": 1, "reason": "密码修改失败！" });
    }
  });
});

module.exports = router;
