import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import './theme.css';
import router from '@/router';

const app = createApp(App);

app.component(
    'AsyncComponent',
    defineAsyncComponent(() => import('./components/AppAsyncComponent.vue')),
);
app.use(router);

app.mount('#app');
// app.createApp(App).mount('#app');
