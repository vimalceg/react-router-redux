/*eslint-disable no-console */
import express from 'express'
import serialize from 'serialize-javascript'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
//import { createMemoryHistory, match, RouterContext } from 'react-router'
import { createMemoryHistory } from 'history';
//import { syncHistoryWithStore } from '../../src'
import { Match } from 'react-router-redux'
console.log(createMemoryHistory);
import { configureStore } from './store'
//import routes from './routes'
import { App, Home, Foo, Bar } from './components'

const app = express()

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

const HTML = ({ content, store }) => (
  <html>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <div id="devtools"/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="/__build__/bundle.js"/>
    </body>
  </html>
)

app.use(function (req, res) {
  console.log(req.url)
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory,{count:{number:3}})
  store.subscribe(()=>{console.log(store.getState())});
  console.log("con",memoryHistory)
  //const history = syncHistoryWithStore(memoryHistory, store)
  const content = renderToString(
    <Provider store={store}>
       <Match name="root">
          <App history={memoryHistory}>
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
    </Provider>
  )
res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
  /*match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )

      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
    }
  })*/
})

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
