<template>
  <div id="app">
    <el-col :span="12">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router="true"
      >
        <el-menu-item v-for="(item, i) in menux" :index="item.url" :key="i">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "Menuall",
  data() {
    return {
      menux: [
        {
          name: "视频资源",
          url: "/user/videos",
        },
        {
          name: "用户个人资源",
          url: "/user/personal",
        },
        {
          name: "学习计划",
          url: "/calendar",
        },
        {
          name: "反馈意见",
          url: "/opinion",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>
