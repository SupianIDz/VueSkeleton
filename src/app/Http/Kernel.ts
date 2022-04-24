import { Kernel as BaseKernel } from "@/system/Http/Kernel";
import { singleton } from "tsyringe";

@singleton()
export class Kernel extends BaseKernel
{
    /**
     * @type {string}
     * @protected
     */
    protected root = '#app';

    /**
     * @returns {Promise<void>}
     */
    public async handle() : Promise<void>
    {
        return super.handle();
    }
}
