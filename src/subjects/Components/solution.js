////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import { run } from './tests'

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

class Tabs extends React.Component {
  state = {
    activeTabIndex: 0,
  }

  selectTabIndex(activeTabIndex) {
    this.setState({ activeTabIndex })
  }

  render() {
    const { data } = this.props
    const { activeTabIndex } = this.state

    const tabs = data.map((country, index) => {
      const isActive = index === activeTabIndex
      const style = isActive ? styles.activeTab : styles.tab

      return (
        <div
          key={country.id}
          className="Tab"
          style={style}
          onClick={() => this.selectTabIndex(index)}
        >
          {country.name}
        </div>
      )
    })

    const activeCountry = data[activeTabIndex]
    const content = activeCountry && activeCountry.description

    return (
      <div className="Tabs">
        {tabs}
        <div className="TabPanel" style={styles.panel}>
          {content}
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    countries: [
      { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
      { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
      { id: 3, name: 'Russia', description: 'World Cup 2018!' },
    ],
  }
  componentDidMount() {
    run(this)
  }

  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.state.countries} />
      </div>
    )
  }
}

export { App as Solution }
