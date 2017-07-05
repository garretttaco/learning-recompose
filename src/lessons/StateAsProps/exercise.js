////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import pt from 'prop-types'
import { withState } from 'recompose'
// To combine classNames
// import classnames from 'classnames'
import './index.scss'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer',
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000',
}

styles.panel = {
  padding: 10,
}

const Tabs = () => (
  <div className="tabs">
    <div className="tab active">
      Active
    </div>
    <div className="tab">
      Inactive
    </div>
    <div className="panel">
      Panel
    </div>
  </div>
)

const defaultState = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
]

const AppComponent = ({ countries }) => (
  <div>
    <h1>Countries</h1>
    <Tabs data={countries} />
  </div>
)

AppComponent.propTypes = {
  countries: pt.array.isRequired,
}

const App = withState('countries', 'updateCountries', defaultState)(AppComponent)

export { App as Exercise }
