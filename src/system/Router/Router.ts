import App from "@/system/App";
import { inject, singleton } from "tsyringe";
import { Route } from "@/system/Router/Route";
import { createRouter, createWebHistory, Router as VueRouter, RouteRecordRaw } from "vue-router";

@singleton()
export class Router
{
    /**
     * @type {Array<Route>}
     * @protected
     */
    protected records : Array<Route> = [];

    /**
     * @param {App} app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @param {Route} route
     */
    public push(route : Route) : void
    {
        this.records.push(route);
    }

    /**
     * @param  {string} route
     * @return {Promise<void>}
     */
    public async load(route : string) : Promise<void>
    {
        await import(`@/routes/${route}`).then(({ default: route }) => {
            route(new Route(
                //
            ));
        });
    }

    /**
     * @return {Array<Route>}
     */
    public routes() : Array<Route>
    {
        return this.records;
    }

    /**
     * @return {RouteRecordRaw[]}
     */
    public build() : RouteRecordRaw[]
    {
        return this.routes().map((route : Route) : RouteRecordRaw => {
            return route.build();
        });
    }

    /**
     * @returns {Router}
     */
    public create() : VueRouter
    {
        const router = createRouter({
            routes: this.build(),
            history: createWebHistory(),
        });

        this.app.use(router);

        router.isReady().then(() => {
            this.app.mount();
        });

        return router;
    }

    /**
     * @returns {void}
     */
    public reset() : void
    {
        this.records = [];
    }

}
