/*
  会员管理路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect')

/** 
 * 添加会员路由 /memberadd
*/
router.post('/memberadd', (req, res) => {
  //接收数据
  let { name, cardNum, grade, integral, idNum, status, phoneNum, telNum, email, areaSelection, address, postalCode } = req.body;
  //构造增加会员的sql语句
  const sqlStr = `insert into member(name, cardNum, grade, integral, 
                  idNum, status, phoneNum, telNum, email, areaSelection, 
                  address, postalCode) values('${name}', '${cardNum}', 
                  '${grade}', '${integral}','${idNum}', '${status}','${phoneNum}', 
                  '${telNum}','${email}', '${areaSelection}','${address}', '${postalCode}')`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "添加会员成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "添加会员失败！" });
    }
  });
});

/** 
 * 按分页显示会员列表路由 /memberlistbypage
*/
router.get('/memberlistbypage', (req, res) => {
  //接收参数
  let { pageSize, currentPage } = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  //构造查询所有会员数据的sql语句   按照时间排序  降序
  let sqlStr = 'select * from member order by ctime desc';
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
      if(err) throw err;
      res.send({total,data});
    });
  });
});

/** 
 * 会员删除路由 /memberdel
*/
router.get('/memberdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造删除会员的sql语句   根据id删除
  const sqlStr = `delete from member where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除会员成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除会员失败！" });
    }
  });
});

/** 
 * 会员修改路由 /memberedit
*/
router.get('/memberedit', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造查询会员的sql语句 
  const sqlStr = `select * from member where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/** 
 * 会员保存修改路由 /membersaveedit
*/
router.post('/membersaveedit', (req, res) => {
  //接收修改后的会员数据 和id
  let { name, cardNum, grade, integral, phoneNum, telNum, id } = req.body;
  //构造修改会员的sql语句 
  const sqlStr = `update member set name='${name}', cardNum='${cardNum}', grade='${grade}', 
                integral='${integral}', phoneNum='${phoneNum}', telNum='${telNum}' where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改会员成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "修改会员失败！" });
    }
  });
});

/** 
 * 批量删除路由 /batchdelete
*/
router.get('/batchdelete', (req, res) => {
  //接收id
  let { selectedId } = req.query;
  //构造删除会员的sql语句 
  const sqlStr = `delete from member where id in (${selectedId})`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除会员成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除会员失败！" });
    }
  });
});
module.exports = router;
