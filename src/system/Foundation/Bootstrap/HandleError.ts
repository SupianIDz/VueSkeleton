import { inject, injectable } from "tsyringe";
import App from "@/system/App";
import { Bootstrap } from "@/system/Foundation/Bootstrap/Bootstrap";
import { Handler } from "@/system/Error/Handler";

@injectable()
export default class HandleError implements Bootstrap
{
    /**
     * @param app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    public bootstrap() : void
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
