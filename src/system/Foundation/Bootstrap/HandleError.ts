import App from "@/system/App";
import { inject, injectable } from "tsyringe";
import { Bootstrapper } from "@/system/Contract/Bootstrapper";
import { Handler } from "@/system/Error/Handler";

@injectable()
export default class HandleError implements Bootstrapper
{
    /**
     * @param app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @returns {Promise<any>}
     */
    public async bootstrap() : Promise<any>
    {
        const handler = this.app.make<Handler>('ErrorHandler');

        this.app.vue.config.errorHandler = (error, vm, info) => {
            handler.error(error, vm, info);
        };

        if (this.app.debug()) {
            this.app.vue.config.warnHandler = (msg, vm, trace) => {
                handler.warn(msg, vm, trace);
            };
        }
    }
}
