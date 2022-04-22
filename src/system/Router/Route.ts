import { container } from "tsyringe";
import { Router } from "@/system/Router/Router";
import { RouteMeta, RouteRecordRaw } from "vue-router";

interface RouteOption
{
    path? : string;
    view? : string;
    name? : string;
    meta? : {
        [name : string] : any
    };
    nest? : Route[];
}

export class Route
{
    /**
     * Route constructor
     */
    public constructor(public option? : RouteOption)
    {
        if (option) {
            container.resolve(Router).push(this);
        }
    }

    /**
     * @param  {string} path
     * @param  {string} view
     * @return {Route}
     */
    public match(path : string, view : string) : Route
    {
        if (! this.option) {
            return new Route({
                path: path,
                view: view,
            });
        }

        // if option already defined, it's a nested route
        // see group()
        // TODO : optimize this
        if (! this.option.nest) {
            this.option.nest = [];
        }

        const route = new Route(
            //
        );

        route.option = {
            path,
            view,
        }

        this.option.nest.push(route);

        return route;
    }

    /**
     * @param  {string} path
     * @param  {string} view
     * @param  {(route: Route) => Route} nest
     * @return {Route}
     */
    public group(path : string, view : string, nest : (route : Route) => void)
    {
        // first we create a route
        const route = this.match(path, view);

        // then we nest it
        if (nest) {
            nest(route);
        }

        return route;
    }

    /**
     * @param  {string} view
     * @return {Route}
     */
    public view(view : string) : Route
    {
        this.option = Object.assign(this.option, {
            view: view,
        });

        return this;
    }

    /**
     * @param  {string} name
     * @return {this}
     */
    public name(name : string)
    {
        this.option = Object.assign(this.option, {
            name: name,
        });

        return this;
    }

    /**
     * @param  {object} meta
     * @return {Route}
     */
    public meta(meta : RouteMeta) : Route
    {
        this.option = Object.assign(this.option, {
            meta: meta,
        });

        return this;
    }

    /**
     * @return {RouteRecordRaw}
     */
    public build() : RouteRecordRaw
    {
        const view = this.option?.view as string;

        return {
            path: this.option?.path as string,
            name: this.option?.name as string,
            meta: this.option?.meta as RouteMeta,

            component: function () {
                return import(`@/resources/views/${view}.vue`);
            },
            children: this.option?.nest?.map((route : Route) : RouteRecordRaw => {
                return route.build();
            }),
        };
    }
}
