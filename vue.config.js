const { resolve } = require("path");
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            entry: 'src/app.ts',
        }
    },
    devServer: {
        port: 3000,
        host: 'localhost',
        https: {
            key: process.env.DEV_SERVER_KEY,
            cert: process.env.DEV_SERVER_CRT
        },
        allowedHosts: [
            process.env.VUE_APP_URL.replace(/^https?:\/\//, ''),
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
            }
        }
    }
});
