import { Kernel as BaseKernel } from "@/system/Http/Kernel";
import { singleton } from "tsyringe";

@singleton()
export class Kernel extends BaseKernel
{
    /**
     * @returns {Promise<void>}
     */
    public async bootstrap() : Promise<void>
    {
        //
    }
}
