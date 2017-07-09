import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Panel, ListGroup, ListGroupItem, Navbar, Col, Clearfix } from 'react-bootstrap'
import * as Lessons from './lessons/index.js'

const lessons = [
  { key: 'StateAsProps', displayName: 'State as props' },
  { key: 'RenderStates', displayName: 'Render states' },
  { key: 'RenderProps', displayName: 'Render Props' },
  { key: 'Forms', displayName: 'Forms' },
  { key: 'Context', displayName: 'Context' },
]

const LessonRoute = ({ lessonKey, lessonName, incr }) => (
  <ListGroupItem>
    <Col sm={10}>
      <span>{incr + 1}. {lessonName}</span>
    </Col>
    <Col sm={1}>
      <Link to={`/${lessonKey}/exercise`}>Exercise</Link>
    </Col>
    <Col sm={1}>
      <Link to={`/${lessonKey}/solution`}>Solution</Link>
    </Col>
    <Clearfix />
  </ListGroupItem>
)

const Routes = () => (
  <div className="container">
    {lessons.map(lesson => (
      <div key={lesson.key}>
        <Route path={`/${lesson.key}/exercise`} component={Lessons[`${lesson.key}Exercise`]} />
        <Route path={`/${lesson.key}/solution`} component={Lessons[`${lesson.key}Solution`]} />
      </div>
    ))}
  </div>
)

const Home = () => (
  <main>
    <Panel header="Workshop lessons">
      <ListGroup fill>
        {lessons.map((lesson, key) => (
          <LessonRoute
            key={lesson.key}
            lessonKey={lesson.key}
            lessonName={lesson.displayName}
            incr={key}
          />
        ))}
      </ListGroup>
    </Panel>
  </main>
)

const Header = withRouter(({ location }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Learning Recompose</Link>
      </Navbar.Brand>
    </Navbar.Header>
    {location.pathname !== '/' &&
      <span>
        {location.pathname.includes('solution') &&
          <Navbar.Text pullRight>
            <Link to={`./exercise`}>Got to exercise</Link>
          </Navbar.Text>}
        {location.pathname.includes('exercise') &&
          <Navbar.Text pullRight>
            <Link to={`./solution`}>Go to solution</Link>
          </Navbar.Text>}
      </span>}
  </Navbar>
))

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Routes />
      <div className="container">
        <Route path="/" exact component={Home} />
      </div>
    </div>
  </Router>
)

export default App
