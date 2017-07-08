////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Showing feedback in the UI is very important for user experience. However, this can lead to messy render functions.
// Let's utilize HoCs to better organization our code to handle these different states.
// Convert the class component into a stateless functional component by extracting the state, methods and lifecycle methods into Recompose HoCs.
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
// - Once we successfully load the content, use the branch HoC on a component that conditionally renders the success message.
// (Hint: renderNothing might come in handy, https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing)
// - Make sure the success message still disappears after 1.5 seconds.
////////////////////////////////////////////////////////////////////////////////
import React, { Component } from 'react'
import { Alert, Button, Panel } from 'react-bootstrap'
// import { compose, withState, withHandlers, lifecycle, branch, renderComponent } from 'recompose'
import fetchContent from './fetchContent'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from './LoadingSpinner'
import QuoteLeft from 'react-icons/lib/fa/quote-left'
import QuoteRight from 'react-icons/lib/fa/quote-right'
import './index.scss'

export class App extends Component {
  state = {
    loading: false,
    loadError: false,
    loadSuccess: false,
    quote: {},
  }

  componentDidMount() {
    this.fetchContent()
  }

  brieflyShow = () => {
    this.setState({ loadSuccess: true })
    return setTimeout(() => {
      this.setState({ loadSuccess: false })
    }, 1500)
  }

  fetchContent = async () => {
    try {
      this.setState({ loading: true, loadSuccess: false })
      const quote = await fetchContent()
      this.brieflyShow()
      this.setState({ loading: false, quote, loadError: false })
    } catch (error) {
      this.setState({ loading: false, loadError: true, loadSuccess: false })
    }
  }

  render() {
    const { loading, loadError, loadSuccess, quote } = this.state
    return (
      <div className="render-states owl">
        {loadSuccess &&
          <Alert bsStyle="success">
            <strong>Success!</strong> We loaded your quote successfully
          </Alert>}
        {loading
          ? <LoadingSpinner />
          : loadError
              ? <Alert bsStyle="danger">
                  <strong>Error!</strong> We encountered an error while loading your content!
                </Alert>
              : !isEmpty(quote)
                  ? <Panel header={quote.title}>
                      <QuoteLeft className="quote left" />
                      {' '}
                      {quote.content}
                      {' '}
                      <QuoteRight className="quote right" />
                    </Panel>
                  : null}
        <Button onClick={this.fetchContent} disabled={loading}>New quote</Button>
      </div>
    )
  }
}

export { App as Exercise }
