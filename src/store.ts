import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import { request } from '@/util'
import md5 from 'md5'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: false,
  },
  actions: {
    userLogin: async ({ state, commit }, payload) => {
      const { account, password } = payload
      if (!account || !password) {
        uni.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
        return;
      }
      const userInfo = await request("loginUser", {
        data: {
          username: account,
          password: md5(password)
        },
        successMsg: "登录成功",
        errorMsg: "用户名或密码错误"
      });
      if (userInfo) {
        commit('updateUser', userInfo)
      }
    },
    fetchUserInfo: async ({ state, commit }, payload) => {
      const { id } = payload;
      const userInfo = await request("fetchUserByUserId", {
        data: { id },
        hideLoading: true
      })
      if (userInfo) {
        commit('updateUser', userInfo)
      }
    },
  },
  mutations: {
    retriveUser: (state) => {
      const userInfo = uni.getStorageSync('userInfo')
      if (userInfo) {
        state.userInfo = userInfo;
      }
    },
    updateUser: (state, newUser) => {
      state.userInfo = newUser;
      uni.setStorageSync('userInfo', newUser)
    },
    userLogout: state => {
      state.userInfo = false;
      uni.removeStorageSync('userInfo')
    },
  },
  plugins: debug ? [createLogger()] : []
})

export default store
