////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Currently in React, there is no way to have local state on a component except by using a class component.
// Using this.setState is a very basic React concept that most React developers interact with everyday.
// Why don't we try something a little different. Let's compose these components further.
// With the tabs example we have below, let's use Recompose to break apart the functionality from
// UI by following the container/presentational component pattern.
// - Convert the Tabs component into a Stateless functional component. Abstract the methods and state into HoCs (Hint: use withState and withHandlers)
// - Convert Tab component into a stateless functional component. Abstract the method into an HoC. (Hint: use withHandlers)
//
// Don't forget to refer to the recompose docs!
// https://github.com/acdlite/recompose/blob/master/docs/API.md
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import pt from 'prop-types'
// import { compose, withState, withHandlers } from 'recompose'
import classnames from 'classnames'

class Tab extends React.Component {
  static propTypes = {
    content: pt.string.isRequired,
    onClickUpdateIndex: pt.func.isRequired,
    isActive: pt.bool,
  }

  onClickUpdateIndex = () => {
    const { onClickUpdateIndex, index } = this.props
    onClickUpdateIndex(index)
  }

  render() {
    const { isActive, content } = this.props
    const classNames = classnames('tab', { active: isActive })
    return (
      <div className={classNames} onClick={this.onClickUpdateIndex}>
        {content}
      </div>
    )
  }
}

class Tabs extends React.Component {
  state = {
    activeTabIndex: 0,
  }

  selectTabIndex = index => {
    this.setState({ activeTabIndex: index })
  }

  render() {
    const { data } = this.props
    const { activeTabIndex } = this.state
    const tabs = data.map((tab, index) => {
      const isActive = index === activeTabIndex
      return (
        <Tab
          key={tab.id}
          index={index}
          isActive={isActive}
          content={tab.label}
          onClickUpdateIndex={this.selectTabIndex}
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
}

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

export { App as Exercise }
