<template>
  <div class="container">
    <div class="content-container">
      <div class="grid-container">
        <course
          v-for="(item, index) of tempCourse"
          :key="index"
          :course="item"
        />
      </div>
    </div>
    <div class="paging-container">
      <el-pagination background layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Course from "@/components/Course.vue";
import { CoursePaging } from "@/model/paging/CoursePaging.js";
export default {
  name: "Courses",
  data() {
    return {
      paging: new CoursePaging(this.$route.params.name),
      total: 0,
      courses: [
        {
          partNum: 1,
          reNumber: 1,
          reName: "c++",
          reNet:
            "操作按钮操作按钮操作按钮操作按钮操作按钮操作按钮操作按钮操作按钮操作按钮操作按钮",
          reNext: "简介",
          updateTime: "2020-04-20 15:33:33",
          rePicture:
            "http://img3.mukewang.com/szimg/60497cca092fcd4805400304.png"
        }
      ]
    };
  },
  methods: {
    handleOnSearch() {
      this.axios.course.list(this.paging).then(res => {
        // TODO: 分页查询结果赋值
        this.courses = res;
      });
    }
  },
  computed: {
    tempCourse() {
      let course = [];
      for (let i = 0; i < 22; i++) {
        course.push(this.courses[0]);
      }
      return course;
    }
  },
  components: { Course }
};
</script>

<style scoped>
.container .content-container {
  height: calc(100vh - 132px);
  overflow-y: scroll;
}
.container .grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-items: center;
  grid-row-gap: 25px;
}
.container .paging-container {
  margin: 20px 0 0 65px;
  margin-left: 65px;
}
</style>
