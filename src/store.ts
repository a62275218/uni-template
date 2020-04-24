import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import { request, getIn } from "@/util";
import md5 from "md5";

const debug = process.env.NODE_ENV !== "production";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: false,
    productList: [],
    filterProductList: [],
  },
  actions: {
    fetchProductList: async ({ state, commit }, payload) => {
      const { keyword, orderBy, subCategoriesId, categoriesId } = payload;
      const productRes = await request("fetchProductBySth", {
        data: {
          ...payload
        },
        loading: true,
      });
      const filterProductList = getIn(productRes, "data");
      if (filterProductList) {
        state.filterProductList = filterProductList;
      }
    },
    fetchTotalList: async ({ state }) => {
      const totalProductRes = await request("fetchProductBySth", {
        data: {},
      });
      const productList = getIn(totalProductRes, "data");
      if (productList) {
        state.productList = productList;
      }
    },
    userLogin: async ({ state, commit }, payload) => {
      const { avatarUrl, nickName } = payload;
      uni.login({
        async success(res) {
          if (res.code) {
            //发起网络请求
            console.log(res.code);
            const opendID = await request("wxGetOpenId", {
              data: { code: res.code },
              errorMsg: "登录失败",
              loading: true,
            });
            const openid = getIn(opendID, "openid");
            if (openid) {
              const userInfo: any = await request("registerUser", {
                data: { username: nickName, openId: openid },
                errorMsg: "登录失败",
                loading: true,
              });
              if (userInfo) {
                userInfo.avatar = avatarUrl;
                commit("updateUser", userInfo);
              }
            }
          } else {
            uni.showToast({
              title: "登录失败",
              icon: "none",
            });
          }
        },
      });
    },
    fetchUserInfo: async ({ state, commit }, payload) => {
      const { id } = payload;
      const userInfo = await request("fetchUserByUserId", {
        data: { id },
      });
      if (userInfo) {
        commit("updateUser", userInfo);
      }
    },
  },
  mutations: {
    retriveUser: (state) => {
      const userInfo = uni.getStorageSync("userInfo");
      if (userInfo) {
        state.userInfo = userInfo;
      }
    },
    updateUser: (state, newUser) => {
      state.userInfo = newUser;
      uni.setStorageSync("userInfo", newUser);
    },
    userLogout: (state) => {
      state.userInfo = false;
      uni.removeStorageSync("userInfo");
    },
  },
  plugins: debug ? [createLogger()] : [],
});

export default store;
