<template>
  <div>
    <el-tabs
      :tab-position="tabPosition"
      style="height: 1200px"
      type="border-card"
      @tab-click="personal_resources"
    >
      <el-tab-pane
        v-for="(item, i) in menu"
        :key="i"
        :data-idx="item.id"
        :label="item.name"
      >
        <span slot="label"><i class="el-icon-menu"></i> {{ item.name }}</span>
        <el-row :gutter="20">
          <div v-for="(item_chi, index) in datax" :key="index">
            <div v-if="item_chi.type == item.name">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <h3>{{ item_chi.title }}</h3>
                  <img
                    @click="video_open"
                    :src="item_chi.videoimg"
                    style="width: 100%; height: 280px"
                    :data-idx="item_chi.id"
                    :data-keyx="index"
                  />
                  <el-dialog
                    title="提示"
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    center
                  >
                    <video
                      :src="item_chi.videosrc"
                      controls="controls"
                      style="width: 100%"
                    >
                      your browser does not support the video tag
                    </video>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="video_del">取 消</el-button>
                      <el-button
                        type="primary"
                        @click="centerDialogVisible = false"
                        >确 定</el-button
                      >
                    </span>
                  </el-dialog>
                </div></el-col
              >
            </div>
          </div>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="个人资源">个人资源</el-tab-pane>
    </el-tabs>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClosexx"
    >
      <span>是否将次学习视频添加到个人资源</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_resource">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { menu } from "../configuration/menus/UserMenu.js";
export default {
  name: "Menu",
  data() {
    return {
      menu: null,
      data: null,
      tabPosition: "left",
      centerDialogVisible: false,
      dialogVisible: false,
      videoindex: null,
      form: {
        title: "",
        videosrc: "",
        videoimg: "",
        type: "",
        userid: "",
      },
    };
  },
  methods: {
    //将资源添加到个人资源数据库
    add_resource() {
      var that = this;
      that.dialogVisible = false;
      var userdata = localStorage.getItem("userdata");
      userdata = userdata.split(",");
      that.form.userid = userdata[0];
      var data = that.datax[that.videoindex];
      that.form.title = data.title;
      that.form.videosrc = data.videosrc;
      that.form.videoimg = data.videoimg;
      that.form.type = data.type;
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

    personal_resources(tab, event) {
      var that = this;
      if (tab.$options.propsData.label == "个人资源") {
        that.$router.push("/user/Personal");
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClosexx(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    video_open(e) {
      var that = this;
      var crtTime = new Date();
      var time = this.datex("yyyy-MM-dd hh:mm:ss", crtTime);
      this.idxx = e.target.attributes[2].value;
      that.videoindex = e.target.dataset.keyx;

      if (this.$route.fullPath == "/user/videos") {
        that.dialogVisible = true;
      } else {
        this.centerDialogVisible = true;
        this.$axios
          .get("/User/videos_time", {
            params: {
              start: time,
              id: e.target.attributes[2].value,
            },
          })
          .then((res) => {
            //   alert("开始学习");
          });
      }
    },
    video_del(e) {
      this.centerDialogVisible = false;
      var crtTime = new Date();
      var time = this.datex("yyyy-MM-dd hh:mm:ss", crtTime);
      var that = this;
      this.$axios
        .get("/User/videos_time", {
          params: {
            end: time,
            id: that.idxx,
          },
        })
        .then((res) => {
          //   alert("开始学习");
        });
    },
    handleOnSearch() {
      // TODO: 查询已反馈的信息
    },

    datex(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
  },
  created() {
    this.menu = menu[0].children;
    this.data = menu;
    console.log(menu);
  },
  props: {
    datax: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>
<style scoped>
</style>