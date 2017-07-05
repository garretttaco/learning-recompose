////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Showing feedback in the UI is very important for user experience. However, this can lead to messy render functions.
// Let's utilize HoCs to better organization our code to handle these different states.
// Convert the class component into a stateless functional component by extracting the state and lifecycle methods into Recompose HoCs.
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
// - Make the success message disappear after 3 seconds.
////////////////////////////////////////////////////////////////////////////////
import React, { Component } from 'react'
import pt from 'prop-types'
import { Alert } from 'react-bootstrap'
import fetchContent from './fetchContent'
import './index.scss'

const LoadingSpinner = () => null

export class App extends Component {
  state = {
    loading: false,
    loadError: false,
    loadSuccess: false,
    content: null,
  }

  componentDidMount() {
    this.fetchContent()
  }

  fetchContent = async () => {
    const content = await fetchContent()
    this.setState({ content })
  }

  render() {
    const { loading, loadError, loadSuccess, content } = this.state
    if (loading) {
      return <LoadingSpinner />
    }
    if (loadError) {
      return (
        <Alert bsStyle="danger">
          <strong>Error!</strong> We encountered an error while loading your content!
        </Alert>
      )
    }
    return (
      <div>
        {loadSuccess &&
          <Alert bsStyle="success">
            <strong>Success!</strong> We loaded your content successfully
          </Alert>}
        {content}
      </div>
    )
  }
}

export { App as Exercise }
