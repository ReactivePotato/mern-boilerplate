import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'

import store, { history } from '../redux'

import Startup from './startup'

import Main from '../components/main'
import D3 from '../components/d3'
import D3LineCircle from '../components/d3linecircle'
import D3Path from '../components/d3path'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Redirect to="/channels" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <Redirect to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <Route exact path="/" component={() => <Main />} />
            <Route exact path="/d3" component={() => <D3 />} />
            <Route exact path="/d3lc" component={() => <D3LineCircle />} />
            <Route exact path="/d3path" component={() => <D3Path />} />
            <OnlyAnonymousRoute exact path="/anonymous" component={() => <Main />} />
            <PrivateRoute exact path="/private" component={() => <Main />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
