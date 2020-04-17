<template>
  <div class="bg">
    <div class="top">
      <image src="/static/头像.png" style="width:120rpx;" mode="widthFix" />
      <div class="text">立即登录</div>
      <image src="/static/youjiantou.png" style="width:40rpx;margin-top:6rpx" mode="widthFix" />
    </div>
    <div class="white-card bill-section">
      <div class="section-title">我的订单</div>
      <div class="bill-list">
        <div v-for="item in menu" :key="item" class="item">
          <image style="width:80%;" :src="item.icon" mode="widthFix" />
          <div>{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      menu: [
        {
          icon: "/static/daifukuan.png",
          title: "待付款"
        },
        {
          icon: "/static/daipeisong.png",
          title: "待配送"
        },
        {
          icon: "/static/peisongzhong.png",
          title: "配送中"
        },
        {
          icon: "/static/yiwancheng.png",
          title: "已完成"
        },
        {
          icon: "/static/yituikuan.png",
          title: "已退款"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.top {
  color: #fff;
  position: relative;
  display: flex;
  align-items: center;
  padding: 30rpx 30rpx 0;
  height: 280rpx;
  background: url("/static/me_bg.png") no-repeat;
  .text {
    font-size: 35rpx;
    padding: 0 10rpx 0 30rpx;
  }
}

.bill-section {
  padding: 20rpx;
  .bill-list {
    display: flex;
    justify-content: space-around;
    .item {
      display:flex;
      flex-direction: column;
      align-items: center;
      padding: 20rpx;
      font-size: 28rpx;
      color: #555555;
    }
  }
}
</style>