import Vue from 'vue';
import App from './app/App.vue';
import AppStore from './app/appStore';
import SysApi from './api'
import LoginView from './app/layout/Login'
//import router from './router';

import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from './components/common/i18n';
import {
    active
} from './utils/public'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import VueRouter from 'vue-router';
import {
    adminSetup,
    errorPageSetup,
    userSetup
} from './components'

import DrawerModel from '@/components/template/DrawerModel/DrawerModel' // ComponentA
import pagination from '@/components/template/pagination/pagination' // //分页
//封装全局弹窗
Vue.prototype.active = active


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(ElementUI, {
    size: 'small'
});

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

const appStore = new AppStore(Vue);

appStore.addGlobalComponent('DrawerModel', DrawerModel)
    .addGlobalComponent('pagination', pagination);

appStore.defaultMainLayout()
    .defaultHeaderView()
    .defaultNavView()
    .defaultFooterView()
    .addPage({
        name: 'login',
        path: '/login',
        component: LoginView,
    })
    .addService('sysService', SysApi);
appStore.addGlobalState('mainLayout', {

});

Vue.use((Vue) => {
    Vue.prototype.appStore = appStore;
});

// window.addEventListener('load', ()=>{
if (localStorage.getItem('isRouters') === 'admin') {
    adminSetup(appStore)
} else if (localStorage.getItem('isRouters') === 'user') {
    userSetup(appStore)
}


errorPageSetup(appStore);



appStore.createRouter();

appStore.router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} `;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        role === 'admin' ? next() : next('/403');
    } else {
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router: appStore.router,
    i18n,
    render: h => h(App)
}).$mount('#app');
// });