import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import './assets/style.css';
import "@/assets/style.css"

import routes from "./routes";
import VueRouter from "vue-router";

// Needed to keep the user id on the session
axios.defaults.withCredentials = true

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue-toast-notification/dist/theme-sugar.css';


import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin
} from "bootstrap-vue";

import VueToast from 'vue-toast-notification';

import vuetify from './plugins/vuetify'
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);
Vue.use(VueToast);

Vue.config.productionTip = false;

const user_from_local_storage = localStorage.user

const shared_data = {
  apiOffMode: false,
  user: user_from_local_storage && JSON.parse(user_from_local_storage),
  login(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
    console.log("login", this.user);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("user");
    this.user = undefined;
  }
};
console.log(shared_data);

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },

  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },

  vuetify,
  render: (h) => h(App)
}).$mount("#app");
