import Router from 'vue-router';
import Api from './request'
import DefaultMainLayoutView from './layout/MainLayout'
import DefaultHeaderLayoutView from './layout/Header'
import DefaultNavLayoutView from './layout/Sidebar'
import DefaultFooterLayoutView from './layout/Footer.vuew'
import DefaultLoginLayoutView from './layout/Login'

class AppStore {

    /**
     * 构造函数
     */
    constructor(Vue, props){
        this.Vue = Vue;
        this.props = props;
        this._userInfo = null;

        this.viewsMap = new Map();
        this.pagesMap = new Map();

        this.constant = new Map();
        this.globalComponents = new Map();
        this.apiServices = new Map();


        /**
         * 全局状态
         * @type {Map<any, any>}
         */
        this.globalStateMap = new Map();
    }

    /**
     * 添加全局状态
     * @param {string} name 状态名称
     * @param {object} props 状态值
     */
    addGlobalState(name, props){
        if(!this.hasGlobalState(name)){
            this.resetGlobalState(name, props)
        } else {
            console.warn(`global state ${name} existence`)
        }
        return this;
    }

    /**
     * 全局状态是否定义
     * @param {string} name 状态名称
     * @returns {boolean}
     */
    hasGlobalState(name){
        return this.globalStateMap.has(name)
    }

    /**
     * 获取全局状态
     * @param {string} name 状态名称
     */
    getGlobalState(name){
        if(this.hasGlobalState(name)){
            return this.globalStateMap.get(name)
        } else {
            throw new Error(`global state ${name} is not undefined`);
        }
    }

    /**
     * 重置 全局状态
     * @param {string} name 状态名称
     * @param {object} props 状态值
     */
    resetGlobalState(name, props){
        this.globalStateMap.set(name, props)
    }


    /**
     * 跟新 props
     * @param {string} name key
     * @param {*} value 值
     */
    updateProps(name, value){
        this.props[name] = value
    }

    /**
     * 添加系统api服务
     * @param {string} name 名称
     * @param {object} service 服务
     */
    addService(name, service){
        this.apiServices.set(name, service);
        return this;
    }

    /**
     * 判断 api 服务是否定义
     * @param {string} name 名称
     * @return {boolean} true | false
     */
    hasService(name){
        return this.apiServices.has(name)
    }

    /**
     * 获取系统 api 服务
     * @param {string} name 名称
     * @return {object} 服务
     */
    getService(name){
        if(this.hasService(name)){
            return this.apiServices.get(name)({
                Api: AppStore.Api(this)
                , appStore: this
            });
        } else {
            throw new Error(`service ${name} is not undefined`)
        }
    }

    /**
     * 获取全局组件
     * @param {string} name 组件名 [* => 所有全局组件]
     */
    getGlobalComponent(name = '*'){
        if(name === '*'){
            return [...this.globalComponents.values()]
        }
        if(this.globalComponents.has(name)){
            return this.globalComponents.get(name);
        } else {
            throw new Error(`${name} is not set component`)
        }
    }

    /**
     * 添加全局组件
     * @param {string} name 组件名称
     * @param {object} component 组件
     * @returns {void}
     */
    addGlobalComponent(name, component){
        const globalName = `global-${name}-view`;

        this.globalComponents.set(name, component);
        this.Vue.component(globalName, component);
        return this;
    }

    /**
     * 布局视图
     * @param {object} viewLayout 布局
     */
    defaultMainLayout(viewLayout = DefaultMainLayoutView){
        this.addGlobalComponent('layout', viewLayout);
        return this;
    }

    /**
     * 所有的路由视图
     * @returns {array} 视图集合
     */
    get routerViews(){
        const routerLayout = [{
            name: 'main-layout-view',
            path: '/',
            component: this.getGlobalComponent('layout'),
            children: this._getView(this.viewsMap)
        }];

        return routerLayout.concat(this._getView(this.pagesMap))
    }

    /**
     * 获取views
     * @param {Map} viewsMap 视图Map
     * @param {array} views 视图集合
     * @param {number} zIndex 最大层级 默认最大 3
     * @private
     */
    _getView(viewsMap, views = [], zIndex = 1){
        if(zIndex === 3) return views;

        for(let item of viewsMap.values()) {
            const view = item;
            if (item.children) {
                view.children = [];
                this._getView(item.children, view.children, zIndex + 1)
            }
            views.push(view)
        }
        return views;
    }

    /**
     * 设置 header
     * @param {object} headerView 头部
     */
    defaultHeaderView(headerView = DefaultHeaderLayoutView){
        this.addGlobalComponent('header', headerView)
        return this;
    }

    /**
     * 设置 导航
     * @param {object} navView 头部
     */
    defaultNavView(navView = DefaultNavLayoutView){
        this.addGlobalComponent('nav', navView)
        return this;
    }

    /**
     * 设置 尾部
     * @param {object} footerView 头部
     */
    defaultFooterView(footerView = DefaultFooterLayoutView){
        this.addGlobalComponent('footer', footerView)
        return this;
    }

    /**
     * 添加视图
     * @param {object} viewProps 视图信息 {name, view, options}
     */
    addView(viewProps){
       this._addViewAll(viewProps, 'viewsMap')
        return this;
    }

    /**
     * 添加视图
     * @param {object} viewProps 视图信息 {name, view, options}
     */
    addPage(viewProps){
       this._addViewAll(viewProps, 'pagesMap')
        return this;
    }


    /**
     * 添加 所有 视图页面
     * @param {object} viewProps 视图
     * @param {string} viewType 视图类型 [viewsMap, pagesMap]
     * @private
     */
    _addViewAll(viewProps, viewType){
        return this._resetViewAll(viewProps, viewType)
    }


    /**
     * 重置 view 和 pageView
     * @param {object} newViewProps 新视图信息
     * @param {map} viewType 视图类型 [viewsMap, pagesMap]
     * @private
     */
    _resetViewAll(newViewProps, viewType){
        this._viewAllTypeValidate(viewType)
            .set(newViewProps.name, newViewProps)
    }

    /**
     * 重置主视图
     * @param {object} viewProps 视图
     * @returns {AppStore}
     */
    resetView(viewProps){
        this._resetViewAll(viewProps, 'viewsMap');
        return this;
    }

    /**
     * 重置页面
     * @param {object} viewProps 视图
     * @returns {AppStore}
     */
    resetPage(viewProps){
        this._resetViewAll(viewProps, 'pagesMap');
        return this;
    }

    /**
     * 视图类型验证
     * @param {string} viewType [viewsMap, pagesMap]
     * @returns {*}
     * @private
     */
    _viewAllTypeValidate(viewType){
        let rang = ['viewsMap', 'pagesMap'];
        if(rang.includes(viewType)) {
            return this[viewType]
        } else {
            throw new TypeError(`this.${viewType} is not undefined`);
        }
    }

    /**
     * 获取主视图
     * @param {string} name 视图名称
     * @returns {object} 视图
     */
    getView(name){
        if(!this.viewsMap.has(name)){
            throw Error(`${name} view is not undefined`)
        }
        return this.viewsMap.get(name)
    }

    /**
     * 获取页面
     * @param {string} name 视图名称
     * @returns {object} 视图
     */
    getPage(name){
        if(!this.pagesMap.has(name)){
            throw Error(`${name} pages is not undefined`)
        }
        return this.pagesMap.get(name)
    }

    /**
     * 路由监听
     * @return {function} callback
     */
    routerBeforeEach(callback){
        return this.router.beforeEach(callback)
    }

    /**
     * 创建路由
     * @param {function} startFunc
     */
    async createRouter(startFunc){
        if(startFunc){
            await startFunc(this)
        }

        console.log(this.routerViews)
        this.router = new Router({
            routes: this.routerViews
        });
    }
}
AppStore.Api = Api;

export default AppStore;