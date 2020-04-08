import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { getIn, request } from './util'

Vue.config.productionTip = false;
Vue.prototype.$store = store
Vue.prototype.$getIn = getIn
Vue.prototype.$request = request

new App().$mount()
