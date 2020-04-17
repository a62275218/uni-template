<template>
  <div class="bg">
    <div class="white-card">
      <imagep src="/static/banner.png" customStyle="height:380rpx" />
      <div class="category">
        <div class="item" v-for="item in category" :key="item">
          <image class="logo" :src="item.img" mode="widthFix" />
          <div>{{item.label}}</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card ad-card">
      <image src="/static/guanggao.png" style="width:100%;vertical-align:middle" mode="widthFix" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import customModal from "@/components/custommodal.vue";
import tabBar from "@/components/tabbar.vue";
export default Vue.extend({
  data() {
    return {
      title: "Hello",
      modalShow: false,
      category: [
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        },
        {
          img: "/static/新鲜蔬菜.png",
          label: "新鲜蔬菜"
        }
      ],
      list: [
        { label: "待付款" },
        { label: "待配送" },
        { label: "配送中" },
        { label: "已完成" },
        { label: "已退款" }
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  onLoad() {
    console.log(this.$store);
  },
  components: {
    customModal,
    tabBar
  },
  methods: {
    handleChange(e) {
      console.log(e);
    }
  }
});
</script>

<style lang="scss">
.category {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30rpx;
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 30rpx 40rpx 0;
    box-sizing: border-box;
    width: 25%;
    font-size: 26rpx;
    .logo {
      width: 100%;
      margin-bottom: 20rpx;
    }
  }
}
.ad-card{
  padding:10rpx 20rpx;
}
.top-image {
  height: 570rpx;
  overflow: hidden;
}
</style>
