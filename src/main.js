import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as $ from "jquery";
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
const app = createApp(App).use(router)
app.use(VueAxios,axios,$)
app.mount('#app')
