<template>
  <div class="sale-statistics">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售统计</span>
      </div>
      <div class="text item">
        <el-form size="small" :model="searchForm" inline class="demo-ruleForm">
          <el-form-item label="时间">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="searchForm.startTime"
              style="width: 130px"
            ></el-date-picker>
            <big>-</big>
            <el-date-picker
              type="date"
              placeholder="结束时间"
              v-model="searchForm.endTime"
              style="width: 130px"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.statistics" style="width: 100px">
              <el-option label="销售统计" value="销售统计"></el-option>
              <el-option label="进货统计" value="进货统计"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main" style="width: 900px;height:480px;"></div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      searchForm: {
        startTime: "",
        endTime: "",
        statistics: "销售统计"
      }
    };
  },
  methods: {
    search() {}
  },
  mounted() {
    // 基于准备好的dom，初始化echarts图表
    let myChart = echarts.init(document.getElementById("main"));

    let option = {
      title: {
        text: "动态数据",
        subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56"
          }
        }
      },
      legend: {
        data: ["最新成交价", "预购队列"]
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: (function() {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
              now = new Date(now - 2000);
            }
            return res;
          })()
        },
        {
          type: "category",
          boundaryGap: true,
          data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(10 - len - 1);
            }
            return res;
          })()
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "价格",
          max: 30,
          min: 0,
          boundaryGap: [0.2, 0.2]
        },
        {
          type: "value",
          scale: true,
          name: "预购量",
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: "预购队列",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: (function() {
            var res = [];
            var len = 10;
            while (len--) {
              res.push(Math.round(Math.random() * 1000));
            }
            return res;
          })(),
          itemStyle: {
            normal: {
              //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
              color: function(params) {
                // build a color map as your need.
                var colorList = [
                  "#C1232B",
                  "#B5C334",
                  "#FCCE10",
                  "#E87C25",
                  "#27727B",
                  "#FE8463",
                  "#9BCA63",
                  "#FAD860",
                  "#F3A43B",
                  "#60C0DD",
                  "#D7504B",
                  "#C6E579",
                  "#F4E001",
                  "#F0805A",
                  "#26C0C0"
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        },
        {
          name: "最新成交价",
          type: "line",
          data: (function() {
            var res = [];
            var len = 0;
            while (len < 10) {
              res.push((Math.random() * 10 + 5).toFixed(1) - 0);
              len++;
            }
            return res;
          })()
        }
      ]
    };

    app.count = 11;
    setInterval(function() {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");

      var data0 = option.series[0].data;
      var data1 = option.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      option.xAxis[0].data.shift();
      option.xAxis[0].data.push(axisData);
      option.xAxis[1].data.shift();
      option.xAxis[1].data.push(app.count++);

      myChart.setOption(option);
    }, 2100);

    // 为echarts对象加载数据
    myChart.setOption(option);
  }
};
</script>
<style lang="less">
.sale-statistics {
  .el-card {
    .el-card__header {
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>