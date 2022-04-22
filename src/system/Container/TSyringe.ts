import { container, DependencyContainer, InjectionToken } from "tsyringe";

export class TSyringe
{
    /**
     * @param token
     * @param instance
     */
    public instance<T>(token : InjectionToken<T>, instance : T) : DependencyContainer
    {
        return container.registerInstance(token, instance);
    }

    /**
     * @param instances
     */
    public instances(instances : { [token : string] : any }) : void
    {
        for (const [token, instance] of Object.entries(instances)) {
            this.instance(token, instance);
        }
    }

    /**
     * @param token
     */
    public make<T>(token : InjectionToken<T>) : T
    {
        return container.resolve(token);
    }

    /**
     * @returns {DependencyContainer}
     */
    public container() : DependencyContainer
    {
        return container;
    }
}
