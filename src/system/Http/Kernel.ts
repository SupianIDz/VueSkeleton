import { inject, singleton } from "tsyringe";
import App from "@/system/App";

@singleton()
export class Kernel
{
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

    }
}
