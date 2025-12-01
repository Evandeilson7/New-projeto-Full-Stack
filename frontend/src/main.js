import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./debug.js"; // Debug helpers

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
