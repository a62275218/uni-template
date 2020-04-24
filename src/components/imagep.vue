<template>
  <div id="container" class="container" :style="customStyle">
    <image :src="src" :mode="customMode" :style="[innerStyle]" @load="handleLoad" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return { widthMode: false, customMode: "", innerStyle: {} };
  },
  props: ["src", "customStyle"],
  watch: {
    widthMode: {
      immediate: true,
      handler(val) {
        this.customMode = val ? "widthFix" : "heightFix";
      }
    }
  },
  methods: {
    handleLoad(e) {
      const height = e.detail.height;
      const width = e.detail.width;
      uni
        .createSelectorQuery()
        .in(this)
        .select("#container")
        .boundingClientRect(data => {
          const ratio = data.height / data.width;
          this.widthMode = height / width > ratio;
          this.innerStyle = this.widthMode
            ? { width: "100%" }
            : { height: "100%" };
        })
        .exec();
    }
  }
};
</script>

<style lang="scss">
.container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
image {
  will-change: transform;
}
</style>