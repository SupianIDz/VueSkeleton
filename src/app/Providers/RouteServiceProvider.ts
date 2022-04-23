import { ServiceProvider } from "@/system/Support/ServiceProvider";
import { injectable } from "tsyringe";

@injectable()
export default class RouteServiceProvider extends ServiceProvider
{
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
