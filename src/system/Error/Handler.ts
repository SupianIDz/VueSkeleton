import App from "@/system/App";
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
        //
    }

    /**
     * @param error
     * @param {ComponentPublicInstance | null} instance
     * @param {string} info
     */
    public error(error : unknown, instance : ComponentPublicInstance | null, info : string) : void
    {
        //
    }
}
