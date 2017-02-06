import React from 'react'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import { routing, historyMiddleware } from '../../src'
import * as reducers from './reducers'

console.log(routing)
export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

export function configureStore(history, initialState) {
const middleware = applyMiddleware(historyMiddleware(history))
const enhancer = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middleware):compose(middleware)
const reducer = combineReducers({
  ...reducers,
    routing:routing([
    {name:"root",pattern:"/"},
    {name:"foo",pattern:"/foo"},
    {name:"bar",pattern:"/bar"}
    ])
  })
const store = createStore(
  reducer,initialState,
  enhancer
)

  /*let devTools = []
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ]
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      ),
      ...devTools
    )
  )
*/
  return store
}
