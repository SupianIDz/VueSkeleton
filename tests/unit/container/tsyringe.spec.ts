import "reflect-metadata";
import { TSyringe } from "@/system/Container/TSyringe";
import { injectable, singleton } from "tsyringe";

@singleton()
class FooClass
{
    protected qux : string | undefined;

    public setQux(qux : string) : void
    {
        this.qux = qux;
    }

    public getQux() : string | undefined
    {
        return this.qux;
    }
}

@injectable()
class BarClass
{
    public constructor(protected foo : FooClass)
    {
        //
    }

    public getFoo() : FooClass
    {
        return this.foo;
    }
}

class BazClass
{
    protected qux : string | undefined;

    public setQux(qux : string) : void
    {
        this.qux = qux;
    }

    public getQux() : string | undefined
    {
        return this.qux;
    }
}

describe('Dependency Injection', () => {
    const container = new TSyringe();

    it('should resolve a class', () => {
        expect(container.make(FooClass)).toBeInstanceOf(FooClass);
    });

    it('should resolve a class with dependencies', () => {
        expect(container.make(BarClass)).toBeInstanceOf(BarClass);
        expect(container.make(BarClass).getFoo()).toBeInstanceOf(FooClass);
    });

    it('should resolve singleton classes', () => {
        container
            .make(FooClass)
            .setQux('qux');

        expect(container.make(FooClass).getQux()).toBe('qux');

        container
            .make(FooClass)
            .setQux('bar');

        expect(container.make(FooClass).getQux()).toBe('bar');
    });

    it('should resolve a class binding', () => {
        const baz = new BazClass();
        baz.setQux('qux');

        container.bind('baz', baz);

        expect(container.make('baz')).toBeInstanceOf(BazClass);
        expect(container.make<BazClass>('baz').getQux()).toBe('qux');
    });
});
