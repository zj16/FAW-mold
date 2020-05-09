<template>
  <div class="app-container">
    <div class="new-built-box">
      <button><i class="el-icon-plus"></i>新增工位</button>
      <div style="" class="search">
         <el-select v-model="selectGC" slot="prepend">
          <el-option label="xx" value="1"></el-option>
          <el-option label="xx" value="2"></el-option>
          <el-option label="xx" value="3"></el-option>
        </el-select>
        <el-select v-model="selectCJ" slot="prepend">
          <el-option label="xx" value="1"></el-option>
          <el-option label="xx" value="2"></el-option>
          <el-option label="xx" value="3"></el-option>
        </el-select>
        <el-select v-model="selectCX" slot="prepend">
          <el-option label="xx" value="1"></el-option>
          <el-option label="xx" value="2"></el-option>
          <el-option label="xx" value="3"></el-option>
        </el-select>
        <el-select v-model="selectGW" slot="prepend">
          <el-option label="xx" value="1"></el-option>
          <el-option label="xx" value="2"></el-option>
          <el-option label="xx" value="3"></el-option>
        </el-select>
        <el-select v-model="selectCXing" slot="prepend">
          <el-option label="xx" value="1"></el-option>
          <el-option label="xx" value="2"></el-option>
          <el-option label="xx" value="3"></el-option>
        </el-select>
        <button style="float:right">
          <i class="el-icon-search"></i>
        </button>
      </div>
    </div>
    <div class="h3-box">
      <h3>工位数据</h3>
      <button>批量删除</button>
    </div>
    <div style="padding:40px;background:#fff;borderRadius:10px">
      <div style="width:61%">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="header"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="66"
            align='center'>
          </el-table-column>
          <el-table-column
            label="编号"
            width="60"
            align='center'>
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="工序内容"
            width="250"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位时间"
            width="136"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="name"
            label="工艺定量"
            width="136"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="name"
            label="开始"
            width="58"
            align='center'>
          </el-table-column>
          <el-table-column
            prop="address"
            label="持续"
            width="58"
            align='center'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="address"
            label="结束"
            width="58"
            align='center'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="110" align='center'>
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
              <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" />
            </template>
          </el-table-column>
        </el-table>
        <!-- 甘特图 -->
        <div id="myChart" ref="chart" style="height:600px"></div>
      </div>
      <div class="community">
        共{{altogether}}条数据信息，以选择{{selectAltogether}}条
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  name: 'DhtmlxGantt',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectGC: '--请选择工厂--',
      selectCJ: '--请选择车间--',
      selectCX: '--请选择产线--',
      selectGW: '--请选择工位--',
      selectCXing: '--请选择车型--',
      input: '',
      altogether: '207',
      selectAltogether: '1',
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      // 甘特图数据
      tasks: {
        data: [
          { id: 1, text: 'Task #1', start_date: '15-04-2017', personName: '张总', duration: 3, progress: 0.6 },
          { id: 2, text: 'Task #2', start_date: '18-04-2017', personName: '李总', duration: 3, progress: 0.4 },
          { id: 3, text: 'Task #2-1', start_date: '20-04-2017', personName: '赵总', duration: 3, progress: 0.4, parent: 2 }
        ],
        links: [
          { id: 1, source: 1, target: 2, type: '0' }
        ]
      }

      // list: null,
      // listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    // 甘特图
    drawLine(){
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '阶梯瀑布图',
          subtext: 'From ExcelHome',
          sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar;
            if (params[1].value != '-') {
              tar = params[1];
            }
            else {
              tar = params[0];
            }
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        },
        legend: {
          data: ['支出', '收入']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          splitLine: { show: false },
          data: function () {
            var list = [];
            for (var i = 1; i <= 11; i++) {
              list.push('11月' + i + '日' );
            }
            return list
          }()
        },
        xAxis: {
          type: 'value'
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
          },
          {
            name: '收入',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
          },
          {
            name: '支出',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scope>
  @import "~@/styles/variables.scss";

.header{
  color: black;
}
i{
  margin: 0 2px;
}
.new-built-box{
  background: #fff;
  border-radius: 10px;
  padding: 38px 24px;
  overflow: hidden;
  button{
    background-color: $subMenuActiveText;
    border: none;
    color: #fff;
    font-size: 16px;
    display: block;
    padding: 12px;
    border-radius: 5px;
    float: left;
  }
  .search{
    display: flex;
    width: auto;
    // float: right;
    justify-content: flex-end;
    .el-input-group__append{
      background-color: $subMenuActiveText;
      i{
        color: #fff;
      }
    }
  }
}
.is-indeterminate{
  .el-checkbox__inner{
    background-color: $subMenuActiveText !important;
    border-color: $subMenuActiveText !important;
  }
}
.is-checked{
  .is-focus{
    .el-checkbox__inner{
      border-color: $subMenuActiveText;
    }
  }
  .is-checked{
    .el-checkbox__inner{
      background-color: $subMenuActiveText;
      border-color: $subMenuActiveText;
    }
  }

}
.el-table tbody tr:hover>td {
    background-color:$menuActiveText !important;
}
.h3-box{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  button{
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #818181;
    margin-top: 14px;
    margin-bottom: 14px;
    margin-right: 24px;
    background: white;
  }
}
.community{
  color: #818181;
  font-size: 14px;
  margin: 30px 0 0 30px;
}
.el-select{
  min-width: 200px;
  border: 1px solid $borderColor !important ;
  border-radius: 5px;
  color:$borderColor !important;
  margin-right: 20px;
  }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
