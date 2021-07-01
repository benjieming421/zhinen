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
  name: "Menuall_user",
  data() {
    return {
      menux: [
                {
          name: "视频资源管理", //视频资源管理
          url: "/resource",
        },
                {
          name: "用户信息管理", //用户信息管理
          url: "/learn",
        },
                {
          name: "管理员信息管理",  //管理员信息管理
          url: "/administrator",
        },
        {
          name: "反馈信息",   //反馈信息
          url: "/feedback",
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
