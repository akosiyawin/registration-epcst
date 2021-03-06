import "@/plugins/swal"
import Vue from 'vue';
import router from './router'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'

Vue.use(firestorePlugin)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

