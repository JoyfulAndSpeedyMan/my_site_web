<template>
  <div class="no">
    <!-- <canvas id="can" ref="canvas" width="700" height="700">
      <p>你的浏览器版本太低</p>
    </canvas>-->
    <h1>暂未开发</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    // let can = document.getElementById("can");
    // let ctx = can.getContext("2d");
    // ctx.translate(can.width / 2, can.height / 2); //将画布移到屏幕中心
    // let width=can.width;
    // let height=can.height;
    // let hw=width/2;
    // let hh=height/2;
    // //绘制原点（测试用）
    // ctx.beginPath();
    // ctx.arc(0, 0, 1, 0, 2 * Math.PI);
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    // // 绘制圆形头部
    // ctx.beginPath();
    // var grd = ctx.createLinearGradient(0, -hw-20, 0, hw-20);
    // grd.addColorStop(0, "#FDF390");
    // grd.addColorStop(1, "#B97814");
    // ctx.fillStyle = grd;
    // ctx.strokeStyle = "#A86B14";
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, hw, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.stroke();
    // //嘴巴
    // ctx.beginPath();
    // ctx.lineCap = "round";
    // ctx.lineJoin = "round";
    // ctx.fillStyle = "#754800";
    // ctx.strokeStyle = "#935B06";
    // ctx.moveTo(-63, -2);
    // ctx.quadraticCurveTo(-37, 90, 49, 46);
    // ctx.lineTo(-63, -2);
    // ctx.fill();
    // ctx.stroke();
    // // 牙齿
    // ctx.beginPath();
    // ctx.lineWidth = 8;
    // ctx.strokeStyle = "#FFF";
    // ctx.moveTo(-58, 6);
    // ctx.lineTo(38, 47);
    // ctx.stroke();
    // // 眼泪左
    // ctx.beginPath();
    // var yanlei = ctx.createLinearGradient(-48, -48, -97, 30);
    // yanlei.addColorStop(0, "#90C1C8");
    // yanlei.addColorStop(1, "#5394C8");
    // var yanleib = ctx.createLinearGradient(-48, -48, -97, 30);
    // yanleib.addColorStop(0, "#7CAEA7");
    // yanleib.addColorStop(1, "#245F6A");
    // ctx.strokeStyle = yanleib;
    // ctx.fillStyle = yanlei;
    // ctx.moveTo(-56, -37);
    // ctx.lineTo(-96, 25);
    // ctx.quadraticCurveTo(-90, 50, -82, 56);
    // ctx.lineTo(-29, -27);
    // ctx.stroke();
    // ctx.fill();
    // // 眼泪右
    // ctx.beginPath();
    // var yanlei = ctx.createLinearGradient(-48, -48, -97, 30);
    // yanlei.addColorStop(0, "#90C1C8");
    // yanlei.addColorStop(1, "#5394C8");
    // ctx.strokeStyle = yanleib;
    // ctx.fillStyle = yanlei;
    // ctx.moveTo(33, 35);
    // ctx.lineTo(34, 91);
    // ctx.quadraticCurveTo(55, 88, 55, 78);
    // ctx.lineTo(53, 44);
    // ctx.stroke();
    // ctx.fill();
    // // 眼睛
    // ctx.beginPath();
    // ctx.lineJoin = "round";
    // ctx.lineCap = "round";
    // ctx.lineWidth = 5;
    // ctx.fillStyle = "#714801";
    // ctx.strokeStyle = "#714801";
    // ctx.moveTo(-58, -39);
    // ctx.quadraticCurveTo(-32, -41, -25, -27);
    // ctx.quadraticCurveTo(-42, -36, -58, -39);
    // ctx.fill();
    // ctx.stroke();
    // // 麒麟臂
    // ctx.beginPath();
    // var qlgrd = ctx.createRadialGradient(30, -19, 5, 30, -19, 60);
    // qlgrd.addColorStop(0, "#F7D25F");
    // qlgrd.addColorStop(1, "#EEB63B");
    // ctx.lineWidth = 5;
    // ctx.strokeStyle = "#CE7F12";
    // ctx.fillStyle = qlgrd;
    // ctx.moveTo(78, 87);
    // ctx.quadraticCurveTo(100, 74, 81, -19);
    // ctx.quadraticCurveTo(68, -45, 49, -39);
    // ctx.quadraticCurveTo(59, -35, 59, -26);
    // ctx.quadraticCurveTo(36, -62, -10, -59);
    // ctx.quadraticCurveTo(-14, -55, -9, -50);
    // ctx.quadraticCurveTo(18, -48, 33, -26);
    // ctx.quadraticCurveTo(0, -54, -28, -48);
    // ctx.quadraticCurveTo(-37, -42, -28, -33);
    // ctx.quadraticCurveTo(-1, -37, 19, -15);
    // ctx.quadraticCurveTo(-5, -37, -34, -28);
    // ctx.quadraticCurveTo(-36, -21, -27, -18);
    // ctx.quadraticCurveTo(-13, -17, 11, 2);
    // ctx.quadraticCurveTo(-10, -15, -27, -11);
    // ctx.quadraticCurveTo(-30, -6, -24, 1);
    // ctx.lineTo(1, 12);
    // ctx.quadraticCurveTo(7, 29, 41, 42);
    // ctx.quadraticCurveTo(43, 63, 52, 81);
    // ctx.quadraticCurveTo(64, 92, 78, 87);
    // ctx.stroke();
    // ctx.fill();
  }
};
</script>

<style lang="scss">
@import "~/assets/css/common";
canvas {
  margin: {
    top: 10px;
  }
  // @include box;
  //   background: red;
}
.no {
  background: white;
  text-align: center;
  width: 100%;
  height: 90vh;
  line-height: 90vh;
  font-size: 2em;
  color: brown;
}
</style>