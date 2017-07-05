////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Showing feedback in the UI is very important for user experience. However, this can lead to messy render functions.
// Let's utilize HoCs to better organization our code to handle these different states.
// - Extract the conditional render logic, for loading, error and success into their own components.
// By using Recompose's branch HoC, https://github.com/acdlite/recompose/blob/master/docs/API.md#branch do the following
// - Show a loading spinner instead of the content. Once the content has finished loading, show that.
// - Show an error message when we get an error. Make sure to not show the content or the loading spinner if we get in this error state.
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
//
// Got extra time?
//
// - Once we successfully load the content, show a success message.
// (Hint: renderNothing might come in handy, https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing)
// - Make the success message disappear after 2 seconds.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import pt from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import classnames from 'classnames'
import './index.scss'

const TabComponent = ({ content, style, onClick, isActive }) => {
  const classNames = classnames('tab', { active: isActive })
  return (
    <div className={classNames} onClick={onClick}>
      {content}
    </div>
  )
}

TabComponent.propTypes = {
  content: pt.string.isRequired,
  onClick: pt.func.isRequired,
  isActive: pt.bool,
}

const Tab = withHandlers({
  onClick: ({ index, onClickUpdateIndex }) => () => onClickUpdateIndex(index),
})(TabComponent)

const TabsComponent = ({ data, activeTabIndex, updateActiveTabIndex }) => {
  const tabs = data.map((country, index) => {
    const isActive = index === activeTabIndex
    return (
      <Tab
        key={country.id}
        index={index}
        isActive={isActive}
        content={country.name}
        onClickUpdateIndex={updateActiveTabIndex}
      />
    )
  })
  const activeCountry = data[activeTabIndex]
  const content = activeCountry && activeCountry.description
  return (
    <div className="tabs">
      {tabs}
      <div className="panel">
        {content}
      </div>
    </div>
  )
}

TabsComponent.propTypes = {
  data: pt.array.isRequired,
  activeTabIndex: pt.number.isRequired,
  updateActiveTabIndex: pt.func.isRequired,
}

const Tabs = compose(
  withState('activeTabIndex', 'updateActiveTabIndex', 0),
  withHandlers({
    selectTabIndex: ({ updateActiveTabIndex }) => activeTabIndex => {
      updateActiveTabIndex(activeTabIndex)
    },
  }),
)(TabsComponent)

const defaultState = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
]

const AppComponent = ({ countries }) => (
  <div className="state-as-props">
    <h1>Countries</h1>
    <Tabs data={countries} />
  </div>
)

AppComponent.propTypes = {
  countries: pt.array.isRequired,
}

const App = withState('countries', 'updateCountries', defaultState)(AppComponent)

export { App as Solution }
