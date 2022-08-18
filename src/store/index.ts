import { Module, ModuleTree } from 'vuex';
import { createStore } from 'vuex';

/**
 * 自定义项目 Store Module 类型
 * 为自动导入的 store 做类型限制
 * [@/store文件夹下定义的 store]与[@/views文件夹下定义的`文件store.ts`] 必须继承此类型
 * @author LiQingSong
 */
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: true;
  name: string;
}
/**
* 自动导入 Store
* @author LiQingSong
*/
export function importAllStore<S>(): ModuleTree<S> {
    const modules: ModuleTree<S> = {};
    try {
        // 导入 @/store 下文件 
        const requireContext = import.meta.globEager("./*.ts")
        for (let fileName in requireContext) {
             //name age sex
            const modulesConent = requireContext[fileName];
            if (modulesConent.default) {
                const { name, ...module } = modulesConent.default;
                // 获取 PascalCase 命名
                const modulesName = name || fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
                modules[modulesName] = { ...module };
                modules[modulesName] = { namespaced: true }
                modules[modulesName].actions = modulesConent.default.actions
                modules[modulesName].mutations = modulesConent.default.mutations
                modules[modulesName].state = modulesConent.default.state
                modules[modulesName].getters = modulesConent.default.getters
            }
        } 
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    } 
    return modules;
}

export default createStore({
    modules: importAllStore(),
    getters: {}
})