import { App as VueApp } from "vue";
import { TSyringe } from "@/system/Container/TSyringe";

export default class App extends TSyringe
{

    /**
     * @param {App} vue
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
     * @param {string} root
     */
    public mount(root : string)
    {
        this.vue.mount(root);
    }

    /**
     * @return {boolean}
     */
    public debug() : boolean
    {
        return process.env.VUE_APP_DEBUG;
    }
}
