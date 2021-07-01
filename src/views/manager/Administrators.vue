<template>
  <div class="container">
    <el-container>
      <el-aside width="150px">
        <Menuall></Menuall>
      </el-aside>
      <el-main>
        <div class="search-container">
          <el-form :model="search" label-width="85px" :inline="true">
            <el-form-item label="管理员名称">
              <el-input placeholder="管理员名称" v-model="search_str" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchxx">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="visible = true">添加</el-button>
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
          :title="model.managerId ? '更新管理员信息' : '添加管理员信息'"
          :visible.sync="visible"
          :close-on-click-modal="false"
          width="40%"
        >
          <el-form label-width="85px" :model="model">
            <el-form-item label="管理员名称">
              <el-input placeholder="管理员名称" v-model="model.managerName" />
            </el-form-item>
            <el-form-item label="管理员密码">
              <el-input
                show-password
                placeholder="管理员密码"
                v-model="model.managerPw"
              />
            </el-form-item>
            <el-form-item label="联系方式">
              <el-input placeholder="管理员名称" v-model="model.mTelphone" />
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
import { AdministratorPaging } from "@/model/paging/AdministratorPaging.js";
import { column } from "@/columns/manager/AdministratorColumn.js";
import { Administrator } from "@/model/entity/Administrator.js";
import Table from "@/components/Table/index.vue";
import Menuall from "@/components/Menuall_user.vue";
export default {
  name: "Sources",
  data() {
    return {
      search_str: null,
      search: new AdministratorPaging(),
      visible: false,
      result: {
        data: [],
        total: 0,
      },
      model: new Administrator(),
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/administrator_index").then((res) => {
      that.result.data = res.data;
      this.result.total = res.data.length;
    });
  },
  methods: {
    searchxx() {
      var that = this;
      this.$axios
        .get("/User/administrator_search", {
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
    handleOnSearch() {
      // TODO: 查询已反馈的信息
    },
    handleOnSubmit() {
      // TODO: 提交反馈
      this.visible = false;
      this.$axios
        .get("/User/administrator_insert", {
          params: {
            user: this.model,
          },
        })
        .then((res) => {
          window.location.reload();
        });
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
