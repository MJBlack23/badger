import * as React from 'react'
import * as ReactDom from 'react-dom'

// import App from './components/App'
const App = () => (
  <div>
    This is a test of the React system, please try not to React.
  </div>
)

ReactDom.render(
    <App />,
  document.getElementById('app')
)