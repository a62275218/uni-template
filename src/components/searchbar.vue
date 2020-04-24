<template>
  <div class="searchbar" :style="{background}">
    <image
      src="/static/search.png"
      style="width:40rpx;margin-right:10rpx;"
      mode="widthFix"
      placeholder-style="color:#9C9C9C"
    />
    <input class="input" :placeholder="placeholder|| '搜索'" @blur="triggerSearch" v-model="input" />
  </div>
</template>

<script>
export default {
  props: ["placeholder", "background", "value"],
  data() {
    return {
      input: ""
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.input = val;
      }
    }
  },
  methods: {
    triggerSearch() {
      this.$emit("search", this.input);
    }
  }
};
</script>

<style lang="scss">
.searchbar {
  margin: 0 auto;
  padding: 10rpx;
  background: #fff;
  border-radius: 80rpx;
  display: flex;
  align-items: center;
  font-size: 28rpx;
}
</style>