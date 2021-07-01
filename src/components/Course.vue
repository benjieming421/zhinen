<template>
  <el-card class="card-container" :body-style="{ padding: '0px' }">
    <el-image :src="course.rePicture" lazy></el-image>
    <div class="content-container">
      <section class="title">{{ course.reName }}</section>
      <section class="introduction">{{ course.reNet }}</section>
      <div class="bottom-container clearfix">
        <time class="time">{{ course.updateTime }}</time>
        <el-button type="text" class="button">加入计划</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Course",
  props: {
    course: {
      type: Object,
      require: true,
      default() {
        return null;
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  width: 270px;
  font-size: 14px;
  line-height: 1.5rem;
}
.card-container .content-container {
  padding: 10px;
}
.card-container .content-container .introduction {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 48px;
}
.card-container .content-container .bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
