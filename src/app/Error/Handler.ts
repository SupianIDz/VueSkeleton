import { Handler as ExceptionHandler } from "@/system/Error/Handler";
import { singleton } from "tsyringe";
import { ComponentPublicInstance } from "vue";

@singleton()
export class Handler extends ExceptionHandler
{
    /**
     * Warnings only work during development,
     * so this config is ignored in production mode.
     *
     * see {@link https://vuejs.org/api/application.html#app-config-warnhandler|Warn Handler}
     *
     * @param {string} message
     * @param {ComponentPublicInstance | null} instance
     * @param {string} trace
     */
    public warn(message : string, instance : ComponentPublicInstance | null, trace : string) : void
    {
        super.warn(message, instance, trace);
    }

    /**
     * @param error
     * @param {ComponentPublicInstance | null} instance
     * @param {string} info
     */
    public error(error : unknown, instance : ComponentPublicInstance | null, info : string) : void
    {
        super.error(error, instance, info);
    }
}
