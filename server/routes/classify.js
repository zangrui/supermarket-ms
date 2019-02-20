/*
  分类管理路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect')

/** 
 * 添加分类路由 /classifyadd
*/
router.post('/classifyadd', (req, res) => {
  //接收数据
  let { classify, classifyName, status } = req.body;
  //构造增加分类的sql语句
  const sqlStr = `insert into classify(classify, classifyName, status) values('${classify}', '${classifyName}', '${status}')`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "添加分类成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "添加分类失败！" });
    }
  });
});

/** 
 * 按分页显示分类列表路由 /classifylistbypage
*/
router.get('/classifylistbypage', (req, res) => {
  //接收参数
  let { pageSize, currentPage } = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  //构造查询所有分类数据的sql语句   按照时间排序  降序
  let sqlStr = 'select * from classify order by ctime desc';
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
 * 分类删除路由 /classifydel
*/
router.get('/classifydel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造删除分类的sql语句   根据id删除
  const sqlStr = `delete from classify where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除分类成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除分类失败！" });
    }
  });
});

/** 
 * 分类修改路由 /classifyedit
*/
router.get('/classifyedit', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造查询分类的sql语句 
  const sqlStr = `select * from classify where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/** 
 * 分类保存修改路由 /classifysaveedit
*/
router.post('/classifysaveedit', (req, res) => {
  //接收修改后的分类数据 和id
  let { classify, classifyName, id } = req.body;
  //构造修改分类的sql语句 
  const sqlStr = `update classify set classify='${classify}', classifyName='${classifyName}' where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改分类成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "修改分类失败！" });
    }
  });
});

/** 
 * 批量删除路由 /batchdelete
*/
router.get('/batchdelete', (req, res) => {
  //接收id
  let { selectedId } = req.query;
  //构造删除分类的sql语句 
  const sqlStr = `delete from classify where id in (${selectedId})`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除分类成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除分类失败！" });
    }
  });
});
module.exports = router;
