/*
  商品管理路由
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
 * 添加商品路由 /goodsadd
*/
router.post('/goodsadd', (req, res) => {
  //接收数据
  let { cateName, barCode, goodsName, salePrice,
        marketPrice, costPrice, goodsNum, goodsWeight,
        goodsUnit, discount, promotion, goodsDesc } = req.body;
  //构造添加商品的sql语句
  const sqlStr = `insert into goods(cateName, barCode, goodsName, salePrice,
                  marketPrice, costPrice, goodsNum, goodsWeight,
                  goodsUnit, discount, promotion, goodsDesc) values('${cateName}',
                   '${barCode}', '${goodsName}','${salePrice}', '${marketPrice}', 
                   '${costPrice}','${goodsNum}', '${goodsWeight}', '${goodsUnit}',
                   '${discount}', '${promotion}', '${goodsDesc}')`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "添加商品成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "添加商品失败！" });
    }
  });
});

/** 
 * 按分页显示商品列表路由 /goodslistbypage
*/
router.get('/goodslistbypage', (req, res) => {
  //接收参数
  let { pageSize, currentPage } = req.query;
  //默认值
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;
  //构造查询所有商品数据的sql语句   按照时间排序  降序
  let sqlStr = 'select * from goods order by ctime desc';
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
 * 商品删除路由 /goodsdel
*/
router.get('/goodsdel', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造删除商品的sql语句   根据id删除
  const sqlStr = `delete from goods where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除商品成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除商品失败！" });
    }
  });
});

/** 
 * 商品修改路由 /goodsedit
*/
router.get('/goodsedit', (req, res) => {
  //接收id
  let { id } = req.query;
  //构造查询商品的sql语句 
  const sqlStr = `select * from goods where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/** 
 * 商品保存修改路由 /goodssaveedit
*/
router.post('/goodssaveedit', (req, res) => {
  //接收修改后的商品数据 和id
  let { cateName, barCode, goodsName, salePrice, marketPrice,  goodsNum, id } = req.body;
  //构造修改商品的sql语句 
  const sqlStr = `update goods set cateName='${cateName}', barCode='${barCode}', 
                  goodsName='${goodsName}', salePrice='${salePrice}', marketPrice='${marketPrice}', 
                  goodsNum='${goodsNum}' where id = ${id}`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改商品成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "修改商品失败！" });
    }
  });
});

/** 
 * 批量删除路由 /batchdelete
*/
router.get('/batchdelete', (req, res) => {
  //接收id
  let { selectedId } = req.query;
  //构造删除商品的sql语句 
  const sqlStr = `delete from goods where id in (${selectedId})`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断受影响的行数
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除商品成功！" });
    } else {
      res.send({ "error_code": 1, "reason": "删除商品失败！" });
    }
  });
});
module.exports = router;
