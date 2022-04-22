import { App as VueApp } from "vue";
import { TSyringe } from "@/system/Container/TSyringe";

export default class App extends TSyringe
{
    /**
     * @param vue
     */
    public constructor(public vue : VueApp)
    {
        super();

        this.instances({
            'App': this,
            'Vue': this.vue,
        });
    }

    /**
     * @param root
     */
    public mount(root : string)
    {
        this.vue.mount(root);
    }
}
