<template>
  <div class="box">
    <div class="side" @click="minus">-</div>
    <div class="center">
      <input type="number" @confirm="handleValChange" v-model="value" />
    </div>
    <div class="side" @click="add">+</div>
  </div>
</template>

<script>
export default {
  props: ["max", "min", "initialVal", "index"],
  data() {
    return {
      value: 0
    };
  },
  watch: {
    initialVal: {
      immediate: true,
      handler(val) {
        if (val) {
          this.value = val;
        }
      }
    }
  },
  methods: {
    handleValChange(e) {
      if (this.max) {
        this.value =
          Number(e.detail.value) > Number(this.max)
            ? Number(this.max)
            : Number(e.detail.value);
      }
      if (this.min) {
        this.value =
          Number(e.detail.value) < Number(this.min)
            ? Number(this.min)
            : Number(e.detail.value);
      }
      this.$emit("change", this.value, this.index);
    },
    minus() {
      this.value = this.value - 1 < this.min ? this.min : this.value - 1;
      this.$emit("change", this.value, this.index);
    },
    add() {
      this.value = this.value + 1 > this.max ? this.max : this.value + 1;
      this.$emit("change", this.value, this.index);
    }
  }
};
</script>

<style lang="scss">
.box {
  width: 200rpx;
  height: 60rpx;
  display: flex;
  .center {
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    padding: 10rpx 0;
    height: 100%;
  }
  .side {
    padding: 0 20rpx;
    line-height: 55rpx;
    border: 2rpx solid #c5c5c5;
    color: #c5c5c5;
    border-radius: 10rpx;
    font-size:30rpx;
  }
}
</style>