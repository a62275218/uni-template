<script lang="ts">
import Vue from "vue";
import { getIn } from "@/util";
export default Vue.extend({
  mpType: "app",
  onLaunch() {
  },
  methods: {
    // bindchange(callback) {
    //   let globalData = this.globalData;
    //   console.log(this.globalData )
    //   Object.keys(globalData).forEach(data => {
    //     Object.defineProperty(globalData, data, {
    //       set: value => {
    //         console.log(`set ${data} to ${value}`);
    //         console.log(globalData[data])
    //         callback(globalData)
    //       },
    //       get: () => {
    //         console.log("get");
    //       }
    //     });
    //   });
    //   callback();
    // },
    // setData(globalData) {
    //   console.log('callback');
    //   console.log(globalData)
    // }
  },
  onLoad() {
    console.log("load");
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  }
});
</script>

<style lang="scss">
/*每个页面公共css */
.white-card {
  background: #fff;
  border-radius: 20rpx;
  font-size: 26rpx;
  box-sizing: border-box;
}
</style>
