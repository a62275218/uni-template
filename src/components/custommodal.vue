<template>
  <div v-if="modalShow" class="mask" @click="closeModal">
    <div class="bottom-content" v-if="position === 'bottom'" @click.stop :style="customStyle">
      <slot></slot>
    </div>
    <div class="center-content" v-else @click.stop :style="customStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      modalShow: false
    };
  },
  props: ["visible", "customStyle", "position"],
  watch: {
    visible: function(val) {
      this.modalShow = val;
    }
  },
  methods: {
    closeModal(): void {
      this.modalShow = false;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.mask {
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top:0;
  left:0;
  .center-content {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .bottom-content{
    width: 100%;
    position: fixed;
    left:0;
    bottom:0;
  }
}
</style>