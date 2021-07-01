<template>
  <div class="container">
    <Loginx></Loginx>
    <Menu :datax="data_list"></Menu>
  </div>
</template>

<script>
// TODO: 查询没做，反馈意见接口没做
import { UserPaging } from "@/model/paging/UserPaging.js";
import { column } from "@/columns/manager/UserColumn.js";
import { Source } from "@/model/entity/Source.js";
import Menu from "@/components/Menu.vue";
import Loginx from "@/components/Loginx.vue";
import { menu } from "../../configuration/menus/UserMenu.js";

export default {
  name: "Sources",
  data() {
    return {
      search: new UserPaging(),
      result: {
        data: [],
        total: 0,
      },
      data_list: null,
      model: new Source(),
      centerDialogVisible: false,
      number: 0,
      idxx: null,
      visible: false,
      form: {
        reName: "",
        reNet: "",
        reNext: "",
        rePicture: "",
        operator: "",
        userName: "",
        totalTime: "",
        type: null,
        userid:null,
      },
      search_str: "",
      formLabelWidth: "100px",
      menux: null,
    };
  },
  created() {
    var that = this;
    this.$axios.get("/User/videos_index").then((res) => {
      that.data_list = res.data;
      console.log(res);
    });
    var userdata = localStorage.getItem("userdata");
    userdata = userdata.split(",");

    that.menux = menu[0].children;
    that.form.userid = userdata[0];
  },
  watch: {
    visible(val) {
      if (val) {
        this.model.ideaUtext = "";
      }
    },
  },
  methods: {
    handleOnSubmit() {
      var that = this;
      // TODO: 提交反馈
      this.visible = false;
      that.$axios
        .get("/User/personal_add", {
          params: {
            date: that.form,
          },
        })
        .then((res) => {
          window.location.reload();
        });
    },
    addlist() {},
    start: function () {
      var that = this;
    },
    stop: function () {
      clearInterval(this.time);
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
    Menu,
    Loginx,
  },
};
</script>

<style scoped>
.addx {
  position: absolute;
  top: 0;
  right: 130px;
}
.videox-w {
  widows: 100% !important;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
