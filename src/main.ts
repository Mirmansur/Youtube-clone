import "./style.css";
import "primeicons/primeicons.css";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/indext";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
