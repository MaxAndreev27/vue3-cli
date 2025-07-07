import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import './theme.css';

const app = createApp(App);

app.component(
    'AsyncComponent',
    defineAsyncComponent(() => import('./components/AppAsyncComponent.vue')),
);

app.mount('#app');
// app.createApp(App).mount('#app');
