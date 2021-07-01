<template>
  <div>
    <Loginx></Loginx>
    <Menu :datax="data_list"></Menu>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
import Loginx from "@/components/Loginx.vue";
export default {
  data() {
    return {
      data_list: null,
      userid: null,
    };
  },
  created() {
    var that = this;
    var userdata = localStorage.getItem("userdata");
    userdata = userdata.split(",");
    that.userid = userdata[0];
    this.$axios
      .get("/User/personal_index", {
        params: {
          date: that.userid,
        },
      })
      .then((res) => {
        that.data_list = res.data;
        console.log(res);
      });
  },
  name: "Default",
  components: {
    Menu,
    Loginx,
  },
};
</script>
<style scoped></style>
