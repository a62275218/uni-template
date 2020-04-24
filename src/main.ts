import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { getIn, request } from "./util";
import imagep from "@/components/imagep.vue";
import skeleton from "@/components/skeleton.vue";
import searchbar from "@/components/searchbar.vue";
import productcard from "@/components/productcard.vue";
import tabbar from "@/components/tabbar.vue";

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$getIn = getIn;
Vue.prototype.$request = request;
Vue.component("imagep", imagep);
Vue.component("skeleton", skeleton);
Vue.component("searchbar", searchbar);
Vue.component("productcard", productcard);
Vue.component("tabbar", tabbar);

new App().$mount();
