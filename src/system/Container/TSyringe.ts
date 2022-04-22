import { container, DependencyContainer, InjectionToken } from "tsyringe";

export class TSyringe
{
    public instance<T>(token: InjectionToken<T>, instance: T) : DependencyContainer
    {
        return container.registerInstance(token, instance);
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
