import { inject, injectable } from "tsyringe";
import App from "@/system/App";

@injectable()
export class ServiceProvider
{
    /**
     * @param {App} app
     */
    public constructor(@inject('App') protected app : App)
    {
        //
    }

    /**
     * @return {Promise<void>}
     */
    public async boot() : Promise<void>
    {
        //
    }

    /**
     * @return {Promise<void>}
     */
    public async register() : Promise<void>
    {
        //
    }
}
