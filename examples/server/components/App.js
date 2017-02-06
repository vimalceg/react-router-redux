import React from 'react'
import { Link } from 'react-router-redux'

export default function App({ children,history }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link name="root">Home</Link>
        {' '}
        <Link name="foo">Foo</Link>
        {' '}
        <Link name="bar">Bar</Link>
      </header>
      <div>
        <button onClick={() => history.push('/foo')}>Go to /foo</button>
      </div>
      <div style={{ marginTop: '1.5em' }}>{children}</div>
    </div>
  )
}
