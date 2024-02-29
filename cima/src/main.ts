import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(ElementPlus).mount("#app");