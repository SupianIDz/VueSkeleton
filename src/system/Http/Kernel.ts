import { inject, singleton } from "tsyringe";
import App from "@/system/App";
import { Bootstrap } from "@/system/Foundation/Bootstrap/Bootstrap";

@singleton()
export class Kernel
{
    /**
     * @private
     */
    private bootstrappers : Array<string> = [
        'HandleError',
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
    public async bootstrap() : Promise<void>
    {
        this.bootstrappers.map(async (bootstrapper) => {
            await import(`@/system/Foundation/Bootstrap/${bootstrapper}`).then(async (module) => {
                this.app.make<Bootstrap>(module.default).bootstrap();
            });
        });
    }
}
