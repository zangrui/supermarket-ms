/*
  账号管理路由
 */
const express = require('express');
const router = express.Router();
//引入连接数据库模块
const connection = require('./connect')

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
  const sqlStr = `insert into account(username, password, usergroup,imgurl) values('${username}', '${password}', '${usergroup}','/upload/avatar.jpg')`;
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
  let { oldPwd, username, newPwd } = req.body;
  console.log(newPwd)
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

/* 
  个人信息路由: /accountinfo
*/
router.get('/accountinfo', (req, res) => {
  // 个人信息 响应给前端
  res.send(req.user);
});

// 获取头像请求
router.get('/getavatar', (req, res) => {
  let { username } = req.query;
  // 构造sql
  const sqlStr = `select * from account where username='${username}'`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
})

/* 
  获取菜单路由路由: /role
*/
router.get('/role', (req, res) => {
  // 获取个人信息
  let role = req.user.usergroup;
  if (role === "高级管理员") {
    let navDate = [
      {
        icon: "el-icon-setting",
        title: "系统管理",
        subs: [
          {
            index: "/",
            title: "系统信息"
          }
        ]
      },
      {
        icon: "el-icon-smms-zhanghaoguanli",
        title: "账号管理",
        subs: [
          {
            index: "/accountmanage",
            title: "账号管理"
          },
          {
            index: "/accountadd",
            title: "添加账号"
          },
          {
            index: "/passwordmodify",
            title: "密码修改"
          }
        ]
      },
      {
        icon: "el-icon-goods",
        title: "商品管理",
        subs: [
          {
            index: "/goodsmanage",
            title: "商品管理"
          },
          {
            index: "/goodsadd",
            title: "添加商品"
          }
        ]
      },
      {
        icon: "el-icon-smms-jinhuo",
        title: "进货管理",
        subs: [
          {
            index: "/stockmanage",
            title: "库存管理"
          },
          {
            index: "/stockadd",
            title: "添加库存"
          }
        ]
      },
      {
        icon: "el-icon-smms-chuhuo",
        title: "出货管理",
        subs: [
          {
            index: "/saleslist",
            title: "销售列表"
          },
          {
            index: "/goodsoutstock",
            title: "商品出库"
          },
          {
            index: "/goodsreturn",
            title: "商品退货"
          }
        ]
      },
      {
        icon: "el-icon-smms-tongji",
        title: "统计管理",
        subs: [
          {
            index: "/salestatistics",
            title: "销售统计"
          }
        ]
      },
      {
        icon: "el-icon-menu",
        title: "分类管理",
        subs: [
          {
            index: "/classifymanage",
            title: "分类管理"
          },
          {
            index: "/classifyadd",
            title: "添加分类"
          }
        ]
      },
      {
        icon: "el-icon-smms-huiyuanguanli",
        title: "会员管理",
        subs: [
          {
            index: "/membermanage",
            title: "会员管理"
          },
          {
            index: "/memberadd",
            title: "添加会员"
          }
        ]
      }
    ];
    res.send(navDate);
  } else if (role === "普通用户") {
    let navDate = [
      {
        icon: "el-icon-setting",
        title: "系统管理",
        subs: [
          {
            index: "/",
            title: "系统信息"
          }
        ]
      },
      {
        icon: "el-icon-smms-zhanghaoguanli",
        index: "/passwordmodify",
        title: "密码修改"
      },
      {
        icon: "el-icon-goods",
        title: "商品管理",
        subs: [
          {
            index: "/goodsmanage",
            title: "商品管理"
          },
          {
            index: "/goodsadd",
            title: "添加商品"
          }
        ]
      },
      {
        icon: "el-icon-smms-jinhuo",
        title: "进货管理",
        subs: [
          {
            index: "/stockmanage",
            title: "库存管理"
          },
          {
            index: "/stockadd",
            title: "添加库存"
          }
        ]
      },
      {
        icon: "el-icon-smms-chuhuo",
        title: "出货管理",
        subs: [
          {
            index: "/saleslist",
            title: "销售列表"
          },
          {
            index: "/goodsoutstock",
            title: "商品出库"
          },
          {
            index: "/goodsreturn",
            title: "商品退货"
          }
        ]
      },
      {
        icon: "el-icon-menu",
        title: "分类管理",
        subs: [
          {
            index: "/classifymanage",
            title: "分类管理"
          },
          {
            index: "/classifyadd",
            title: "添加分类"
          }
        ]
      },
      {
        icon: "el-icon-smms-huiyuanguanli",
        title: "会员管理",
        subs: [
          {
            index: "/membermanage",
            title: "会员管理"
          },
          {
            index: "/memberadd",
            title: "添加会员"
          }
        ]
      }
    ];
    res.send(navDate);
  }
});

module.exports = router;
