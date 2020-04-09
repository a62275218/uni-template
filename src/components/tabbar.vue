<template>
  <div class="tabbar" :style="customStyle">
    <div
      @click="tabChange(index)"
      class="item"
      v-for="(item,index) in dynamicList"
      :key="item"
      :style="{borderBottom:item.active?borderBottom:'',color:item.active?color:normalColor}"
    >{{item.label}}</div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["list", "normalColor", "activeColor", "customStyle"],
  created() {
    this.$emit("change", this.list[this.activeIndex]);
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    dynamicList() {
      return this.list.map((item, idx) => {
        item.active = idx === this.activeIndex;
        return item;
      });
    },
    borderBottom() {
      return `4rpx solid ${this.activeColor}`;
    },
    color() {
      return `${this.activeColor}`;
    }
  },
  methods: {
    tabChange(index) {
      this.activeIndex = index;
      this.$emit("change", this.list[index]);
    }
  }
};
</script>

<style lang="scss">
.tabbar {
  height: 88rpx;
  display: flex;
  align-items: center;
  .item {
    flex: 1;
    line-height: 88rpx;
  }
}
</style>