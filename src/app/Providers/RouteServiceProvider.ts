import { injectable } from "tsyringe";
import { RouteServiceProvider as ServiceProvider } from "@/system/Foundation/Providers/RouteServiceProvider"

@injectable()
export default class RouteServiceProvider extends ServiceProvider
{
    /**
     * @return {Promise<void>}
     */
    public async register() : Promise<void>
    {
        await this.router.load('web');
    }
}
