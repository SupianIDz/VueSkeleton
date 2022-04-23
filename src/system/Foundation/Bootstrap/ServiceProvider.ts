import app from "@/config/app";
import App from "@/system/App";
import { ServiceProvider as BaseServiceProvider } from "@/system/Support/ServiceProvider";
import { Bootstrapper } from "@/system/Contract/Bootstrapper";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ServiceProvider implements Bootstrapper
{
    /**
     * @param app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @return {Promise<any>}
     */
    public async bootstrap() : Promise<any>
    {
        const providers = app.providers.map(async provider => {
            return this.app.make<BaseServiceProvider>(provider);
        });

        this.register(providers).then(async () => {
            for (const provider of providers) {
                await provider.then(async (module : BaseServiceProvider) => {
                    await module.boot();
                });
            }
        });
    }

    /**
     * @param  {Promise<BaseServiceProvider>[]} providers
     * @return {Promise<void>}
     * @protected
     */
    protected async register(providers : Promise<BaseServiceProvider>[]) : Promise<void>
    {
        for (const provider of providers) {
            await provider.then(async (provider) => {
                await provider.register();
            });
        }
    }
}
