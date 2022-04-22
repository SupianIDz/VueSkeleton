import "reflect-metadata";
import App from "@/system/App";
import { createApp } from "vue";
import AppComponent from "@/system/Foundation/Components/App.vue";

/**
 * Register Service Worker
 */
import "@/app/Service/ServiceWorker";
import { Kernel } from "@/app/Http/Kernel";

/**
 * Bootstrap the application
 */
const app = new App(createApp(
    AppComponent
));

const kernel = new Kernel(app);

kernel.bootstrap().then(() => {
    app.mount('#app');
});
