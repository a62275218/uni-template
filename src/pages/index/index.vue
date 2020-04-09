<template>
  <view class="bg">
  </view>
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
    handleChange(e){
      console.log(e)
    }
  }
});
</script>

<style>
.content {
  text-align: center;
  height: 400upx;
}
.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}
.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
