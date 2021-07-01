<template>
  <div class="container">
    <el-container>
      <el-aside width="150px">
    <Menuall></Menuall>
    </el-aside>
    <el-main>
    <div class="search-container">
      <el-form :model="search" label-width="75px" :inline="true">
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
      title="反馈意见"
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
import { FeedBackPaging } from "@/model/paging/FeedBack.js";
import { column } from "@/columns/user/FeedBackColumn.js";
import { Idea } from "@/model/entity/Idea.js";
import Table from "@/components/Table/index.vue";
import Menuall from "@/components/Menuall_user.vue";
export default {
  name: "FeedBack",
  data() {
    return {
      search: new FeedBackPaging(),
      visible: false,
      result: {
        data: [], //数据格式 [{ideaMtext:'',ideaState:'',ideaUtext:''}]
        total: 0, //可以控制分页，每10条一页
      },
      model: new Idea(),
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/opinion_index").then((res) => {
      that.result.data = res.data;
      this.result.total = res.data.length;
    });
  },
  methods: {
    handleOnSearch() {
      var that = this;
      this.$axios
        .get("/User/feedback_search", {
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
      var str = this.model.ideaUtext;
      this.$axios
        .get("/User/opinion_add", {
          params: {
            ideaUtext: str,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          window.location.reload();
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
    Menuall
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
