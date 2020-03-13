import DrawerModel from '@/components/template/DrawerModel/DrawerModel' // ComponentA
import pagination from '@/components/template/pagination/pagination' // //分页

//全局注册
export default (Vue)=>{
  Vue.component("DrawerModel", DrawerModel)
  Vue.component("pagination", pagination)
}