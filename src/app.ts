import "reflect-metadata";
import App from "@/system/App";
import { createApp } from "vue";
import AppComponent from "@/system/Foundation/Components/App.vue";

/**
 * Register Service Worker
 */
import "@/app/Service/ServiceWorker";
import { Kernel } from "@/app/Http/Kernel";
import { Handler } from "@/app/Error/Handler";

/**
 * Bootstrap the application
 */
const app = new App(createApp(
    AppComponent
));

const kernel = new Kernel(app);

/**
 * Bind Important Classes
 */
app.bind('Kernel', kernel);
app.bind('ErrorHandler', new Handler(app))

/**
 * Bootstrap The Application
 */
kernel.bootstrap().then(() => {
    app.mount('#app');
});
