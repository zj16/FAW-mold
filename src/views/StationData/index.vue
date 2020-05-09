<template>
  <div class="app-container">
    <div class="new-built-box">
      <button><i class="el-icon-plus"></i>新增工位</button>
      <div style="" class="search">
        <!-- <el-input placeholder="请输入工厂名称" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
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
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        header-row-class-name="header"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="78"
          align='center'>
        </el-table-column>
        <el-table-column
          label="编号"
          width="150"
          align='center'>
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="150"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属工厂"
          width="150"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属车间"
          width="150"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属产线"
          width="150"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="address"
          label="内容描述"
          width="500"
          align='center'
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="200" align='center'>
          <template slot-scope="scope">
            <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
            <i class="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <div class="community">
        共{{altogether}}条数据信息，以选择{{selectAltogether}}条
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      selectGC:'--请选择工厂--',
      selectCJ:'--请选择车间--',
      selectCX:'--请选择产线--',
      input: '',
      altogether:'207',
      selectAltogether:'1',
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
      multipleSelection: []

      // list: null,
      // listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

//++++++++++++++++++++++++++++++++下拉菜单 
   
//++++++++++++++++++++++++++++++++++++++++
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
  min-width: 284px;
  border: 1px solid $borderColor !important ;
  border-radius: 5px;
  color:$borderColor !important;
  margin-right: 20px;
  }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
