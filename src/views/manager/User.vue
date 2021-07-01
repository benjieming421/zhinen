<template>
  <div class="container">
    <div class="search-container">
      <el-form :model="search" label-width="75px" :inline="true">
        <el-form-item label="用户名">
          <el-input placeholder="用户名" :value="search.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
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
  </div>
</template>

<script>
// TODO: 查询没做，反馈意见接口没做
import { UserPaging } from "@/model/paging/UserPaging.js";
import { column } from "@/columns/manager/UserColumn.js";
import { Source } from "@/model/entity/Source.js";
import Table from "@/components/Table/index.vue";
export default {
  name: "Sources",
  data() {
    return {
      search: new UserPaging(),
      result: {
        data: [],
        total: 0
      },
      model: new Source()
    };
  },
  methods: {
    handleOnSearch() {
      // TODO: 查询已反馈的信息
    }
  },
  computed: {
    columns() {
      return column(this);
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.model.ideaUtext = "";
      }
    }
  },
  components: {
    Table
  },
  provide() {
    return {
      search: this.search,
      handleOnSearch: this.handleOnSearch
    };
  }
};
</script>

<style scoped></style>
