import "reflect-metadata";
import web from "./routes/web";
import { container } from "tsyringe";
import { Router } from "@/system/Router/Router";
import { Route } from "@/system/Router/Route";

describe('Route Builder', () => {

    const router = container.resolve(Router);

    beforeEach(() => {
        router.reset();
    });

    test('it should be resolved', () => {
        expect(router).toBeInstanceOf(Router);
    });

    test('it should not be pushed', () => {
        new Route(
            // this should not be pushed
        );

        expect(router.routes().length).toBe(0);
    });

    test('it should be push a route', () => {
        new Route({
            path: 'foo',
            view: 'bar',
            name: 'foo',
        });

        new Route({
            path: 'bar',
            view: 'foo',
            name: 'bar',
        });

        const routes = router.routes();

        expect(routes.length).toBe(2);

        expect(routes[0].option?.path).toBe('foo');
        expect(routes[0].option?.view).toBe('bar');
        expect(routes[0].option?.name).toBe('foo');

        expect(routes[1].option?.path).toBe('bar');
        expect(routes[1].option?.view).toBe('foo');
        expect(routes[1].option?.name).toBe('bar');
    });

    test('it should load routes from file', () => {
        const spy = jest.spyOn(router, 'load').mockImplementation(async () => {
            web(new Route(
                //
            ));
        });

        router.load('web');

        const routes = router.routes();

        expect(routes.length).toBe(1);

        expect(routes[0].option?.path).toBe('foo');
        expect(routes[0].option?.view).toBe('bar');
        expect(routes[0].option?.name).toBe('qux');
    });

    test('it should be able to override', () => {
        const route = new Route({
            path: 'foo',
            view: 'bar',
            name: 'foo',
        });

        route.meta({
            foo: 'bar',
        });

        const routes = router.routes();

        expect(routes[0].option?.path).toBe('foo');
        expect(routes[0].option?.view).toBe('bar');
        expect(routes[0].option?.name).toBe('foo');

        expect(routes[0].option?.meta).toStrictEqual({
            foo: 'bar',
        });

        // override
        routes[0].name('qux');
        routes[0].view('foo');

        expect(routes[0].option?.name).toBe('qux');
        expect(routes[0].option?.view).toBe('foo');
    });

    test('it should be a group of routes', () => {
        const route = new Route(
            //
        );

        route.group('foo', 'bar', (route : Route) => {
            route.match('bar', 'baz').name('qux');

            route.group('qux', 'qux', (route : Route) => {
                route.match('quz', 'quz').name('quz');

                route.group('foo', 'foo', (route : Route) => {
                    route.match('bar', 'bar').name('bar');
                });
            });
        });

        const routes = router.routes();

        expect(routes.length).toBe(1);

        expect(routes[0].option?.path).toBe('foo'); // a group path must contain slash at the beginning
        expect(routes[0].option?.view).toBe('bar');
        expect(routes[0].option?.nest).toStrictEqual([
            new Route({
                path: 'bar',
                view: 'baz',
                name: 'qux',
            }),
            new Route({
                path: 'qux',
                view: 'qux',
                nest: [
                    new Route({
                        path: 'quz',
                        view: 'quz',
                        name: 'quz',
                    }),
                    new Route({
                        path: 'foo',
                        view: 'foo',
                        nest: [
                            new Route({
                                path: 'bar',
                                view: 'bar',
                                name: 'bar',
                            }),
                        ],
                    }),
                ],
            }),
        ]);
    });
});
