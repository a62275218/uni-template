<template>
  <div class="bg">
    <div class="white-card top">
      <div class="search">
        <searchbar placeholder="搜索" @search="goSearchList" />
      </div>
      <imagep src="/static/banner.png" customStyle="height:380rpx" />
      <div class="category">
        <div class="item" v-for="item in category" :key="item" @click="goList(item.id)">
          <image class="logo" :src="item.imgUrl" mode="widthFix" />
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="gap"></div>
    <div class="white-card trotting">
      <image class="icon" mode="widthFix" src="/static/laba.png" />
      <div></div>
    </div>
    <div class="gap"></div>
    <div class="white-card ad-card">
      <image :src="firstAd" style="width:100%;vertical-align:middle" mode="widthFix" />
    </div>
    <div class="gap"></div>
    <block v-for="item in indexProducts" :key="item.id">
      <div class="white-card product-card">
        <div class="header">
          <div class="hot">
            <image src="/static/shuxian.png" mode="widthFix" style="width:8rpx" />
            {{item.name}}
          </div>
          <div class="more" @click="goTagList(item.id)">
            查看更多
            <image src="/static/youjiantou-gray.png" mode="widthFix" style="width:22rpx" />
          </div>
        </div>
        <div class="product-list">
          <div class="product-item" v-for="product in item.product" :key="product.id">
            <productcard :item="product" height="320rpx" />
          </div>
        </div>
      </div>
      <div class="gap"></div>
    </block>
    <div class="white-card ad-card">
      <image :src="secondAd" style="width:100%;vertical-align:middle" mode="widthFix" />
    </div>
    <div class="page-gap"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import customModal from "@/components/custommodal.vue";
import tabBar from "@/components/tabbar.vue";
export default Vue.extend({
  data() {
    return {
      category: [],
      indexProducts: [],
      firstAd: "",
      secondAd: ""
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  onLoad() {
    console.log(this.$store);
  },
  async onShow() {
    this.fetchHomePageCategories();
    this.fetchAds();
    this.fetchProducts();
  },
  components: {
    customModal,
    tabBar
  },
  methods: {
    goList(id) {
      uni.navigateTo({
        url: `/pages/productlist?categoryid=${id}`
      });
    },
    goSearchList(keyword) {
      if (keyword) {
        uni.navigateTo({
          url: `/pages/productlist?keyword=${keyword}`
        });
      }
    },
    goTagList(id) {
      uni.navigateTo({
        url: `/pages/productlist?tagid=${id}`
      });
    },
    async fetchHomePageCategories() {
      const category = await this.$request("fetchHomePageCategories", {});
      this.category = category;
    },
    async fetchAds() {
      const ads = await this.$request("fetchAdByType", {
        data: {
          type: "首页"
        }
      });
      if (ads && ads.length) {
        this.firstAd = ads[0].imgUrl;
        this.secondAd = ads[1].imgUrl;
      }
    },
    async fetchProducts() {
      const tags = await this.$request("fetchTag", {});
      if (tags && tags.length) {
        tags.forEach(item => {
          item.products = [];
        });
      }
      this.indexProducts = tags;
    }
  }
});
</script>

<style lang="scss" scoped>
.top {
  position: relative;
  .search {
    z-index: 100;
    top: 10rpx;
    left: 50%;
    transform: translate(-50%, 0);
    width: 90%;
    margin: 0 auto;
    position: absolute;
  }
}

.trotting{
  padding:10rpx 20rpx;
  display:flex;
  align-items: center;
  .icon{
    width:40rpx;
  }
}

.category {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 30rpx;
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 30rpx 40rpx 0;
    box-sizing: border-box;
    width: 25%;
    font-size: 26rpx;
    .logo {
      width: 100%;
      margin-bottom: 20rpx;
    }
  }
}
.ad-card {
  padding: 10rpx 20rpx;
}
.top-image {
  height: 570rpx;
  overflow: hidden;
}
.product-card {
  padding: 20rpx;
  .product-list {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      width: calc(100% / 3);
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    .hot {
      display: flex;
      align-items: center;
      image {
        margin-right: 10rpx;
      }
    }
    .more {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      color: #858585;
    }
  }
}
</style>
