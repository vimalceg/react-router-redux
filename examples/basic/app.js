import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import  { createHistory } from 'history'


import { historyMiddleware,routing,Match,Link } from 'react-router-redux'
import * as reducers from './reducers'
import { App, Home, Foo, Bar } from './components'
const reducer = combineReducers({
  ...reducers,
  routing:routing([
    {name:"root",pattern:"/"},
    {name:"foo",pattern:"/foo"},
    {name:"bar",pattern:"/bar"}
    ])
})
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)
var history = createHistory()
const middleware = applyMiddleware(historyMiddleware(history))
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware)
const store = createStore(
  reducer,
  enhancer
)


store.subscribe(()=>console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Match name="root">
          <App history={history}>
            <Match name="root" isExactly={true}>
              <Home/>
            </Match>
            <Match name="foo" isExactly={true}>
              <div>
                <Home/>
                <Foo/>
              </div>
            </Match>
            <Match name="bar" isExactly={true}>
              <Bar/>
            </Match>
          </App>  
        </Match>
      <DevTools/>
    </div>
  </Provider>,
  document.getElementById('mount')
)
