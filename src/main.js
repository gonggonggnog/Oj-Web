import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/less/index.less"
import "./store/index.js"
import store from "./store/index.js";
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import 'element-plus/dist/index.css'
import Api from "./api/api.js";
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$api = Api;
app.use(router).use(store).use(VueCodemirror,{
    extensions: [basicSetup],
})
app.mount('#app')
