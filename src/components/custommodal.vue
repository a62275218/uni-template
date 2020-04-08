<template>
  <div v-if="modalShow" class="mask" @click="closeModal">
    <div class="center-content" @click.stop :style="customStyle">
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
  props: ["visible", "customStyle"],
  watch: {
    visible: function(val) {
      this.modalShow = val;
    }
  },
  methods: {
    closeModal(): void {
      this.modalShow = false;
      this.$emit('close');
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
  .center-content {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>