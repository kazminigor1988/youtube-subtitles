import Vue from 'vue';
import App from './app/Component';

const instance = new Vue({
    el    : '#app',
    render: h => h(App)
});