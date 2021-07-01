<template>
  <div id="container">
    <el-container>
      <el-aside width="150px">
        <Menuall></Menuall>
      </el-aside>
      <el-main>
        <el-container>
          <el-main class="div-shadow">
            <el-calendar v-model="value">
              <template slot="dateCell" slot-scope="{ date, data }">
                <div @click="calendarOnClick(data)" class="div-Caldran">
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split("-").slice(1).join("-") }}
                  </p>
                </div>
              </template>
            </el-calendar>
          </el-main>
          <el-aside>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ today }}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="Addlist"
                  >添加</el-button
                >
              </div>
              <div
                v-for="(index, o) in MainCharacter"
                :key="o"
                class="text item delete_button"
              >
                <span
                  class="text_key"
                  @click.stop="popup_edit_box"
                  :key_x="current_task_subscript"
                  :key_s="o"
                  >{{ o + 1 + "：" + index }}</span
                >
                <i
                  class="el-icon-close"
                  @click.stop="delete_daily_task"
                  :key_x="current_task_subscript"
                  :key_s="o"
                  :key_content="index"
                ></i>
              </div>
            </el-card>
          </el-aside>
        </el-container>
      </el-main>
    </el-container> 
  </div>
</template>

<script>
// import sim from "../../components/Simulationframe.vue";
import Menuall from "@/components/Menuall.vue";
export default {
  data() {
    return {
      value: new Date(),
      Program: {},
      today: null,
      MainCharacter: null,
      current_task_subscript: null,
    };
  },
  created() {
    var that = this;
    var obj = {};
    this.$axios.get("/User/calendar_index").then((res) => {
      console.log(res); //{x20210502:[asdasdasd,asdasdasdwe]}
      var s = res.data;
      s.forEach((element) => {
        if (!eval(`obj.${element.dates}`)) {
          obj[element.dates] = [`${element.content}---${element.id}`]; // that.Program[listall_flit] = listx;
        } else {
          var list = eval(`obj.${element.dates}`);
          list.push(`${element.content}---${element.id}`);
          obj[element.dates] = list;
        }
      });
      that.Program = obj;
      console.log(obj);
    });
  },
  methods: {
    popup_edit_box(e) {
      var that = this;
      var str = e.target.innerHTML;
      var character_segmentation = str.split("：")[1];
      this.$prompt("请输入要编辑的内容", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "计划为空提交失败",
        inputValue: character_segmentation,
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你程序编辑的计划是: " + value,
          });

          //保存编辑的value
          //生成变量名
          var listall_for_time_be = eval(
            `that.Program.${e.target.attributes[0].value}`
          );
          var num = parseInt(e.target.attributes[1].value);
          listall_for_time_be[num] = value;
          var after_split_str = value.split("-");
          that.$axios
            .get("/User/calendar_update", {
              params: {
                id: after_split_str[3],
                content: after_split_str[0],
              },
            })
            .then((res) => {
              console.log(res);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //删除函数
    delete_daily_task(e) {
      var that = this;

      //获取id值
      var val_result = e.target.attributes[2].value;
      var after_split_str = val_result.split("-");
      var delete_location = e.target.attributes[1].value;
      var str_double = eval(`that.Program.${e.target.attributes[0].value}`);
      str_double.splice(delete_location, 1);
      that.$axios
        .get("/User/calendar_del", {
          params: {
            id: after_split_str[3],
          },
        })
        .then((res) => {
          if (res.status == 200) {
            alert("删除成功！");
          }
        });
    },

    calendarOnClick(data) {
      var that = this;
      this.$notify({
        title: "查看",
        message: `这是${data.day}的计划`,
        type: "success",
        position: "top-left",
      });
      this.today = data.day;
      //生成变量名
      var listall = `that.Program.${that.Filtering(this.today)}`;
      this.MainCharacter = eval(listall);
      this.current_task_subscript = that.Filtering(this.today);
    },
    Addlist() {
      var that = this;
      this.$prompt("请输入你的学习计划", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "计划为空提交失败",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你新建的计划是: " + value,
          });
          //生成变量名
          var listall = `that.Program.${that.Filtering(that.today)}`;
          console.log(that.Program);
          var listall_flit = that.Filtering(that.today);
          //判断有无数据，有数据保存后添加 无数据直接添加
          if (eval(listall) == undefined) {
            var listx = [value];
          } else {
            var listx = eval(listall);
            listx.push(value);
          }
          //添加到data全局数据中
          that.Program[listall_flit] = listx;
          that.$axios
            .get("/User/calendar_add", {
              params: {
                dates: listall_flit,
                content: value,
              },
            })
            .then((res) => {
              console.log(res);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    Filtering(str) {
      var reg = new RegExp("-", "g");
      var newstr = str.replace(reg, "");
      return "x" + newstr;
    },
  },
  components: {
    Menuall,
  },
};
</script>

<style>
.is-selected {
  color: #1989fa;
}
.div-Caldran {
  box-sizing: border-box;
  height: 70px;
  padding: 8px;
}
.div-shadow {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.delete_button {
  display: flex;
  justify-content: space-between;
}
.el-icon-close,
.text_key {
  cursor: pointer;
}
</style>
