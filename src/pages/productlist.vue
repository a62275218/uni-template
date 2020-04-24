<template>
  <div class="bg">
    <div class="header">
      <div class="search">
        <searchbar placeholder="商品名称" background="#F4F4F4" @search="changeSearch" :value="searchWord"/>
      </div>
      <div class="filter">
        <div class="item" v-for="item in filterTab" :key="item.name" @click="changeStatus(item)">
          {{item.name}}
          <image style="width:34rpx;" :src="judgeSortImg(item.status)" mode="widthFix" />
        </div>
      </div>
      <div class="products">
        <div
          class="product-item"
          v-for="item in filterProductList"
          :key="item.id"
          @click="goDetail(item.id)"
        >
          <productcard :item="item" />
        </div>
      </div>
    </div>
    <div class="page-gap"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      filterTab: [
        { name: "销量", status: "" },
        { name: "最新", status: "descend" },
        { name: "价格", status: "" }
      ],
      subCategoryId: "",
      categoryId: "",
      searchWord: "",
      tagId: ""
    };
  },
  computed: {
    ...mapState(["filterProductList"])
  },
  onShow() {
    const { subid, categoryid, tagid, keyword } = this.$mp.query;
    if (subid) {
      this.subCategoryId = subid;
    }
    if (categoryid) {
      this.categoryId = categoryid;
    }
    if (tagid) {
      this.tagId = tagid;
    }
    if(keyword){
      this.searchWord = keyword
    }
    this.filterProducts();
  },
  methods: {
    goDetail(id) {
      uni.navigateTo({ url: `/pages/product?id=${id}` });
    },
    judgeSortImg(status) {
      if (status) {
        if (status === "ascend") {
          return "/static/ascend.png";
        } else if (status === "descend") {
          return "/static/descend.png";
        }
      } else {
        return "/static/sort.png";
      }
    },
    changeSearch(searchWord) {
      this.searchWord = searchWord;
      this.filterProducts();
    },
    changeStatus(item) {
      this.filterTab.forEach(i => {
        if (i.name === item.name) {
          i.status = item.status === "descend" ? "ascend" : "descend";
        } else {
          i.status = "";
        }
      });
      this.filterProducts();
    },
    async filterProducts() {
      console.log(this.tagId);
      const current = this.filterTab.find(item => {
        return item.status !== "";
      });
      let orderBy = "";
      const ascending = current.status === "ascend";
      switch (current.name) {
        case "销量":
          orderBy = ascending ? "销量低到高" : "销量高到低";
          break;
        case "最新":
          orderBy = ascending ? "旧到新" : "新到旧";
          break;
        case "价格":
          orderBy = ascending ? "价格低到高" : "价格高到低";
          break;
        default:
          break;
      }
      this.$store.dispatch("fetchProductList", {
        keyword: this.searchWord || "",
        orderBy,
        subCategoriesId: this.subCategoryId,
        categoriesId: this.categoryId,
        tagId: this.tagId
      });
    }
  }
};
</script>

<style lang="scss">
.header {
  background: #fff;
  .search {
    padding: 20rpx;
    border-bottom: 2rpx solid #f3f3f3;
  }
  .filter {
    display: flex;
    padding: 20rpx 0;
    vertical-align: middle;
    .item {
      flex: 1;
      text-align: center;
      font-size: 28rpx;
      image {
        vertical-align: middle;
      }
    }
  }
}
.products {
  display: flex;
  flex-wrap: wrap;
  background: #f7f7f7;
  .product-item {
    width: 50%;
    box-sizing: border-box;
    padding: 20rpx 20rpx 0 20rpx;
    &:nth-child(2n-1) {
      padding-right: 0;
    }
  }
}
</style>