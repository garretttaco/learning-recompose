////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Currently in React, there is no way to have local state on a component except by using a class component.
// Using this.setState is a very basic React concept that most React developers interact with everyday.
// Why don't we try something a little different. Let's compose these components further.
// With the tabs example we have below, let's use Recompose to break apart the functionality from
// UI by following the container/presentational component pattern.
// - Convert the Tabs component into a Stateless functional component. Abstract the method and state into HoCs (Hint: use withState)
// - Convert Tab component into a stateless functional component. Abstract the method into an HoC. (Hint: use withHandlers)
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import pt from 'prop-types'
import { withState, withHandlers } from 'recompose'
import classnames from 'classnames'

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

const Tabs = withState('activeTabIndex', 'updateActiveTabIndex', 0)(TabsComponent)
// withHandlers({
//   selectTabIndex: ({ updateActiveTabIndex }) => activeTabIndex => {
//     updateActiveTabIndex(activeTabIndex)
//   },
// }),

const countries = [
  { id: 1, label: 'USA', content: 'Land of the Free, Home of the brave' },
  { id: 2, label: 'Brazil', content: 'Sunshine, beaches, and Carnival' },
  { id: 3, label: 'Russia', content: 'World Cup 2018!' },
]

const App = () => (
  <div className="state-as-props">
    <h1>Countries</h1>
    <Tabs data={countries} />
  </div>
)

export { App as Solution }
