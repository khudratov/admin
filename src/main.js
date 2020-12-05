import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from "vuelidate";
import messagePlugin from "@/utils/message.plugin";

Vue.use(Vuelidate);
Vue.use(messagePlugin);

import "materialize-css/dist/js/materialize.min.js";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
