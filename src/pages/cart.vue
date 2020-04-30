<template>
  <div class="bg">
    <block v-for="(item,index) in cart" :key="item.product.id">
      <div class="white-card item">
        <div
          :class="[{'active button':item.active},{'button':!item.active}]"
          @click="toggleActive(index)"
        />
        <div class="center">
          <image :src="item.product.imgUrls[0]" style="width:200rpx;" mode="widthFix" />
          <div class="content">
            <div>{{item.product.title}}</div>
            <div class="control">
              <div class="price">${{item.product.price}}</div>
              <numberbox
                :min="1"
                :max="item.product.storageNum"
                :initialVal="item.num"
                :index="index"
                @change="changeNum"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="gap"></div>
    </block>
    <div class="bottom-control white-card">
      <div>
        <div :class="[{'active button':selectAll},{'button':!selectAll}]"></div>
        <div>全选</div>
      </div>
      <div class="action">
        <div class="price">$3423423</div>
        <div>结算(1)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectAll: false
    };
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    toggleActive(index) {
      this.$store.commit("changeCart", {
        index,
        active: !this.cart[index].active
      });
    },
    changeNum(num, index) {
      this.$store.commit("changeCart", {
        index,
        num
      });
    }
  }
};
</script>

<style lang="scss">
.item {
  display: flex;
  padding: 0 20rpx;
  align-items: center;
  .button {
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    border: 2rpx solid #bdbdbd;
    margin-right: 20rpx;
  }
  .active {
    border: 2rpx solid #ffcb34;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: #ffcb34;
    }
  }
  .center {
    flex: 1;
    display: flex;
    height: 250rpx;
    align-items: center;
    padding: 40rpx 0;
    box-sizing: border-box;
    .content {
      padding: 0 20rpx;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      .control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          color: rgba(255, 159, 36, 1);
        }
      }
    }
  }
}
.bottom-control {
  .button {
    @extend .button;
  }
  .active {
    @extend .active;
  }
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>