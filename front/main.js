import Vue from 'vue';
import App from 'components/app';

Vue.config.productionTip = false

const instance = new Vue({
    el    : '#app',
    render: h => h(App)
});
