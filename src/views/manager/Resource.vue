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
              <el-input placeholder="资源名称" v-model="search_str" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchx">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="visible = true"
                >添加资源</el-button
              >
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
          title="添加资源"
          :visible.sync="visible"
          :close-on-click-modal="false"
          width="40%"
        >
          <el-form :model="form">
            <el-form-item label="资源名称" :label-width="formLabelWidth">
              <el-input v-model="form.reName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="资源网址" :label-width="formLabelWidth">
              <el-input v-model="form.reNet" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="资源简介" :label-width="formLabelWidth">
              <el-input v-model="form.reNext" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="封面图片" :label-width="formLabelWidth">
              <el-input v-model="form.rePicture" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="用户名称" :label-width="formLabelWidth">
              <el-input v-model="form.userName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="学习时常" :label-width="formLabelWidth">
              <el-input v-model="form.totalTime" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="课程类型" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in menux"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
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
import { SourcePaging } from "@/model/paging/SourcePaging.js";
import { column } from "@/columns/manager/SourceColumn.js";
import { Source } from "@/model/entity/Source.js";
import Table from "@/components/Table/index.vue";
import { menu } from "../../configuration/menus/UserMenu.js";
import Menuall from "@/components/Menuall_user.vue";

export default {
  name: "Sources",
  data() {
    return {
      search: new SourcePaging(),
      visible: false,
      result: {
        data: [],
        total: 0,
      },
      form: {
        reName: "",
        reNet: "",
        reNext: "",
        rePicture: "",
        operator: "",
        userName: "",
        totalTime: "",
        type: null,
      },
      model: new Source(),
      search_str: "",
      formLabelWidth: "100px",
      menux: null,
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/resource_index").then((res) => {
      that.result.data = res.data;
      this.result.total = res.data.length;
    });
    that.menux = menu[0].children;
    console.log(that.menux);
  },
  methods: {
    handleOnSearch() {
      // TODO: 查询已反馈的信息
    },
    handleOnSubmit() {
      var that = this;
      // TODO: 提交反馈
      this.visible = false;
      that.$axios
        .get("/User/resource_add", {
          params: {
            date: that.form,
          },
        })
        .then((res) => {
          window.location.reload();
        });
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
