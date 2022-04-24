import { App as VueApp, Plugin } from "vue";
import { TSyringe } from "@/system/Container/TSyringe";

export default class App extends TSyringe
{

    protected $root = '#app';

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
    public root(root : string) : void
    {
        this.$root = root;
    }

    /**
     * @param   {Plugin} plugin
     * @param   {any} options
     * @returns {App}
     */
    public use(plugin : Plugin, ...options : any) : VueApp
    {
        return this.vue.use(plugin, options);
    }

    /**
     * @param {string} root
     */
    public mount(root? : string)
    {
        this.vue.mount(root ?? this.$root);
    }

    /**
     * @return {boolean}
     */
    public debug() : boolean
    {
        return process.env.VUE_APP_DEBUG;
    }

}
