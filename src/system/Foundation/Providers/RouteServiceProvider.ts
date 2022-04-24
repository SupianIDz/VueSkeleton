import App from "@/system/App";
import { inject, injectable } from "tsyringe";
import { Router } from "@/system/Router/Router";
import { ServiceProvider } from "@/system/Support/ServiceProvider";

@injectable()
export class RouteServiceProvider extends ServiceProvider
{
    /**
     * @type {Router}
     * @private
     */
    protected router : Router;

    /**
     * @param {App} app
     */
    public constructor(@inject('App') protected app : App)
    {
        super(app);

        this.router = app.make(Router);
    }

    /**
     * @return {Promise<void>}
     */
    public async boot() : Promise<void>
    {
        this.router.create();
    }
}
