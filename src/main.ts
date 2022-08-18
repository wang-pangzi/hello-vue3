import { createApp } from 'vue'
import store from './store'
import router from './routes'


// 新增代码：引入全部组件及样式
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as Icons from "@ant-design/icons-vue";


const icons: any = Icons;

import App from './App.vue'

const app = createApp(App)
// App.use(store)
app.use(store)
app.use(router)

// 全局注册图标
for (const i in icons) {
    app.component(i, icons[i]);
  }
app.use(Antd)
app.mount('#app')