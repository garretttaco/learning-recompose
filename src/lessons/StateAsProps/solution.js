////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using Recompose's HoCs and the container/presentational component pattern:
// - Convert the App component into a stateless functional component. Abstract the state into an HoC (Hint: use withState).
// - Convert the Tabs component into a Stateless functional component. Abstract the methods and state into HoCs (Hint: use withState and withHandlers)
// - Convert Tab component into a stateless functional component. Abstract the method into an HoC. (Hint: use withHandlers)
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
//
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
  const tabs = data.map((tab, index) => {
    const isActive = index === activeTabIndex
    return (
      <Tab
        key={tab.id}
        index={index}
        isActive={isActive}
        content={tab.label}
        onClickUpdateIndex={updateActiveTabIndex}
      />
    )
  })
  const activeTab = data[activeTabIndex]
  const content = activeTab && activeTab.content
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
  { id: 1, label: 'USA', content: 'Land of the Free, Home of the brave' },
  { id: 2, label: 'Brazil', content: 'Sunshine, beaches, and Carnival' },
  { id: 3, label: 'Russia', content: 'World Cup 2018!' },
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
