<template>
  <div class="container">
    <el-container>
      <el-aside width="150px">
        <Menuall></Menuall>
      </el-aside>
      <el-main>
        <div class="search-container">
          <el-form :model="search" label-width="75px" :inline="true">
            <el-form-item label="用户名称">
              <el-input placeholder="用户名称" v-model="search_str" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchx">查询</el-button>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
// TODO: 查询没做，反馈意见接口没做
import { LearnPaging } from "@/model/paging/LearnPaging.js";
import { column } from "@/columns/manager/LearnColumn.js";
import Table from "@/components/Table/index.vue";
import Menuall from "@/components/Menuall_user.vue";
export default {
  name: "Sources",
  data() {
    return {
      search: new LearnPaging(),
      search_str: null,
      visible: false,
      result: {
        data: [],
        total: 0,
      },
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/learn_index").then((res) => {
      that.result.data = res.data;
      this.result.total = res.data.length;
    });
  },
  methods: {
    handleOnSearch() {
      // TODO: 查询已反馈的信息
    },
    searchx() {
      var that = this;
      this.$axios
        .get("/User/resource_search", {
          params: {
            search: that.search_str,
          },
        })
        .then((res) => {
          that.result.data = res.data;
          this.result.total = res.data.length;
          console.log(res);
        });
    },
  },
  computed: {
    columns() {
      return column(this);
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
