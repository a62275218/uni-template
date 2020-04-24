<template>
  <div class="bg">
    <tabbar :list="list" normalColor="#666666" activeColor="#FFCB34" @change="getBillList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { label: "待付款" },
        { label: "待配送" },
        { label: "配送中" },
        { label: "已完成" },
        { label: "已退款" }
      ],
      bills:[]
    };
  },
  methods: {
    async getBillList(index) {
      console.log(index);
      console.log(this.list[index]);
      const label = this.list[index].label;
      const billRes = await this.$request("fetchOrderByUserIdAndStatus", {
        data: {
          id: 1,
          status: label
        }
      });
      this.bills= billRes
      console.log(billRes);
    }
  }
};
</script>

<style>
</style>