import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

const routes :Array<RouteRecordRaw>= [
    {
        
        path: "/",
        component: () => defineAsyncComponent (()=>import('../views/login/index.vue')),
    }
];
const requireContext = import.meta.globEager("../views/**/*.vue")
for (let fileName in requireContext) {
    let path = fileName.replace(new RegExp("../views"),"").replace(new RegExp("/index.vue"),"")
    routes.push({
            name: requireContext[fileName].default.name||path,
            path: path,
            component: () => defineAsyncComponent (()=>import(/* @vite-ignore */ `${fileName}`)),
        })
} 

const modules = import.meta.glob('../views/*/*.vue')
/**
 * 转化路由component实例化动态导入本地文件
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes: any[]) {
    const res: any[] = []
    routes.forEach(route => {
        let tmp = { ...route }
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children)
        }
        tmp.component = modules[`../views/${route.component}`];
        res.push(tmp)
    })
    return res
}

export default routes