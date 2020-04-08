<template>
  <view class="content">
    <custom-modal :visible="modalShow" @close="()=>this.modalShow = false">
      <div class="white-card">123213</div>
    </custom-modal>
    <image class="logo" src="../../static/logo.png" @click="()=>this.modalShow = true" />
    <view>
      <text class="title">{{userInfo}}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import customModal from "@/components/custommodal.vue";
export default Vue.extend({
  data() {
    return {
      title: "Hello",
      modalShow: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  onLoad() {
    console.log(this.$store)
  },
  components: {
    customModal
  },
  methods: {}
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
