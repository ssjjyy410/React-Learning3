import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.less'
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import {mainRouter} from './routes'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
    
      <Router>
      <Provider store={store}>
      <Switch>
        <Route path='/admin' render={(routerProps)=>{
            //登陆才能访问 /admin
            return (
              <StrictMode>
                <App {...routerProps}/>
              </StrictMode>
            )
        }}/>
        {
          mainRouter.map(route=>{
            return <Route path={route.pathname} component={route.component} key={route.pathname}/>
          })
        }
        <Redirect to='/admin' from='/' exact/>
        <Redirect to='/404'/>
      </Switch>
      </Provider>
      </Router>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
