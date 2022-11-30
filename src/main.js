import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "./assets/main.css";
import { globalFilters } from "./filters/globalFilters";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use((axios.defaults.baseURL = "https://localhost:7128/api/"));

// apply global filters
app.config.globalProperties.$filters = globalFilters;

app.mount("#app");
