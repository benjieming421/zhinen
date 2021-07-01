<template>
  <div class="container">
    <el-container>
      <el-aside width="150px">
        <Menuall></Menuall>
      </el-aside>
      <el-main>
        <div class="search-container">
          <el-form :model="search" label-width="75px" :inline="true">
            <el-form-item label="处理状态">
              <el-select clearable v-model="search.status">
                <el-option label="未处理" value="未处理" />
                <el-option label="已处理" value="已处理" />
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="search.begin"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="search.end"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleOnSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="visible = true">反馈</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-container">
          <Table
            :columns="columns"
            :data="result.data"
            :currentPage="search.page"
            :total="result.total"
            :pageCount="search.count"
          ></Table>
        </div>
        <el-dialog
          title="处理意见"
          :visible.sync="visible"
          :close-on-click-modal="false"
          width="40%"
        >
          <el-form>
            <el-form-item>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="model.ideaUtext"
              />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="handleOnSubmit"> 确定 </el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// TODO: 查询没做，反馈意见接口没做
import { OpinionPaging } from "@/model/paging/OpinionPaging.js";
import { column } from "@/columns/user/FeedBackColumn.js";
import { Idea } from "@/model/entity/Idea.js";
import Table from "@/components/Table/index.vue";
import Menuall from "@/components/Menuall.vue";
export default {
  name: "Opinion",
  data() {
    return {
      search: new OpinionPaging(),
      visible: false,
      result: {
        data: [],
        total: 0,
      },
      model: new Idea(),
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/opinion_index?id=2").then((res) => {
      that.result.data = res.data;
      this.result.total = res.data.length;
    });
  },
  methods: {
    handleOnSearch() {
      // TODO: 查询已反馈的信息
      var that = this;
      this.$axios
        .get("/User/opinion_search", {
          params: {
            search: that.search,
          },
        })
        .then((res) => {
          that.result.data = res.data;
          this.result.total = res.data.length;
          console.log(res);
        });
    },
    handleOnSubmit() {
      // TODO: 提交反馈
      var str = this.model.ideaUtext;
      this.$axios
        .get("/User/opinion_add", {
          params: {
            ideaUtext: str,
          },
        })
        .then((res) => {
          alert("添加成功");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });

      this.visible = false;
    },
  },
  computed: {
    columns() {
      return column(this);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.model.ideaUtext = "";
      }
    },
  },
  components: {
    Table,
    Menuall,
  },
  provide() {
    return {
      search: this.search,
      handleOnSearch: this.handleOnSearch,
    };
  },
};
</script>

<style scoped></style>
