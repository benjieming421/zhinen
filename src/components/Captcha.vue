<template>
  <div>
    <canvas ref="captcha" @click="draw"></canvas>
  </div>
</template>

<script>
export default {
  name: "Captcha",
  data() {
    return {
      captcha: ""
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.draw();
    });
  },
  watch: {
    captcha: {
      immediate: true,
      deep: true,
      handler: function(oval, nval) {
        if (oval !== nval) {
          this.$store.commit("pushCaptcha", this.captcha);
        }
      }
    }
  },
  methods: {
    draw() {
      this.captcha = "";
      let canvas = this.$refs.captcha;
      let width = canvas.width;
      let height = canvas.height;
      var context = canvas.getContext("2d");
      context.clearRect(0, 0, width, height);
      var randomCode =
        "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
      var randomCodeStr = randomCode.split(",");
      var randomCodeLength = randomCodeStr.length;
      for (var i = 0; i <= 3; i++) {
        //绘制数字
        var j = Math.floor(Math.random() * randomCodeLength);
        var rotate = (Math.random() * 50 * Math.PI) / 180;
        var content = randomCodeStr[j];
        this.captcha += content.toUpperCase();
        var x = 30 + i * 60;
        var y = 60 + Math.random() * 8;
        context.font = "bold 60px 微软雅黑";
        context.translate(x, y);
        context.rotate(rotate);
        context.fillStyle = this.randomColor();
        context.fillText(content, 0, 0);
        context.rotate(-rotate);
        context.translate(-x, -y);
      }
      this.drawLine(context, width, height);
      this.drawPoint(context, width, height);
    },
    drawLine(context, width, height) {
      for (var i = 0; i <= 5; i++) {
        //绘制线条
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(Math.random() * width, Math.random() * height);
        context.lineTo(Math.random() * width, Math.random() * height);
        context.stroke();
      }
    },
    drawPoint(context, width, height) {
      for (var i = 0; i <= 60; i++) {
        //绘制小点
        context.strokeStyle = this.randomColor();
        context.beginPath();
        var x = Math.random() * width;
        var y = Math.random() * height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
      }
    },
    randomColor() {
      //得到随机的颜色值
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
};
</script>

<style scoped>
canvas {
  border: 1px solid #b9b0b4 !important;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  width: 100%;
}
</style>
