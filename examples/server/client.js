import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
//import { Router, browserHistory } from 'react-router'
import  { createHistory } from 'history'


import { App, Home, Foo, Bar } from './components'
import { Match } from 'react-router-redux'

import { configureStore, DevTools } from './store'
import routes from './routes'
const history = createHistory()

const store = configureStore(history, window.__initialState__)

render(
  <Provider store={store}>
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
  </Provider>,
  document.getElementById('root')
)

render(
  <Provider store={store}>
    <DevTools/>
  </Provider>,
  document.getElementById('devtools')
)
