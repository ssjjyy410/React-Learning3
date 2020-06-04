import React,{Component} from 'react';
import './App.css';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from 'antd'
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {adminRouter} from './routes'
import {Frame} from './components'

const mapState=state=>({
    isLogin:state.users.isLogin,
    role:state.users.role
})

@connect(mapState)
class App extends Component {
  render() { 
    return (
      //判断是否登录来显不显示登录页面
      this.props.isLogin
      ?
      <ConfigProvider locale={zhCN}>
        <Frame>
        <Switch>
          {
            adminRouter.map(route=>{
              return <Route path={route.pathname} key={route.pathname} render={(routerProps)=>{
                //是否有权限访问某一页
                const hasPermission=route.roles.includes(this.props.role)
                return (hasPermission ? <route.component {...routerProps}/> : <Redirect to="/admin/noauth"/>)
              }}/>
            })
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
          <Redirect to='/404'/>
        </Switch>
        </Frame>
      </ConfigProvider>
      :
      <Redirect to="/login"/>
    );
  }
}

export default App;
