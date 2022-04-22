import { Route } from "@/system/Router/Route";

export default (route : Route) => {
    route.match('foo', 'bar').name('qux');
};
