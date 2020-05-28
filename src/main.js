import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// import vueCustomElement from 'vue-custom-element'
// import ContentSearch from './components/ContentSearch'

// Vue.config.ignoredElements = [
//   'vue-widget'
// ];

// Vue.use(vueCustomElement)

// Vue.customElement('vue-widget', ContentSearch)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')