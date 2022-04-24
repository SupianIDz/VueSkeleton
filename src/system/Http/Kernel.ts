import { inject, singleton } from "tsyringe";
import App from "@/system/App";
import { Bootstrapper } from "@/system/Contract/Bootstrapper";

@singleton()
export class Kernel
{
    /**
     * @type {string}
     * @protected
     */
    protected root = '#app';

    /**
     * @private
     */
    private bootstrappers : Array<string> = [
        'HandleError',
        'ServiceProvider',
    ];

    /**
     * @param app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @returns {Promise<void>}
     */
    public async handle() : Promise<void>
    {
        this.app.root(this.root);

        this.bootstrappers.map(async (bootstrapper) => {
            await import(`@/system/Foundation/Bootstrap/${bootstrapper}`).then(async (module) => {
                await this.app.make<Bootstrapper>(module.default).bootstrap();
            });
        });
    }
}
