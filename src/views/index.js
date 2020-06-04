import {default as Loadable} from '../utils'

//组件懒加载
const Dashboard=Loadable(()=>import('./Dashboard'))
const Login=Loadable(()=>import('./Login'))
const NotFound=Loadable(()=>import('./NotFound'))
const Settings=Loadable(()=>import('./Settings'))
const Notifications=Loadable(()=>import('./Notifications'))
const Noauth=Loadable(()=>import('./Noauth'))
const Profile=Loadable(()=>import('./Profile'))
const ArticleList=Loadable(()=>import('./Article'))
const ArticleEdit=Loadable(()=>import('./Article/Edit'))

//导出组件
export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    Notifications,
    Noauth,
    Profile,
    ArticleList,
    ArticleEdit
}
