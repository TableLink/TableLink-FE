import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import router from './router/router';
import './assets/scss/main.scss';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

