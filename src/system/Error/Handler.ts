import App from "@/system/App";
import consola from "consola";
import { ComponentPublicInstance } from "vue";
import { inject, singleton } from "tsyringe";

@singleton()
export class Handler
{
    /**
     * @param app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @param {string} message
     * @param {ComponentPublicInstance | null} instance
     * @param {string} trace
     */
    public warn(message : string, instance : ComponentPublicInstance | null, trace : string) : void
    {
        consola.warn(message, {
            component: instance,
            trace: trace,
        });
    }

    /**
     * @param error
     * @param {ComponentPublicInstance | null} instance
     * @param {string} info
     */
    public error(error : unknown, instance : ComponentPublicInstance | null, info : string) : void
    {
        consola.error('Error', {
            error: error,
            component: instance,
            info: info,
        });
    }
}
