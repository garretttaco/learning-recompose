import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Panel, ListGroup, ListGroupItem, Navbar, Col, Clearfix } from 'react-bootstrap'
import * as Lessons from './lessons/index.js'
import './shared.css'

const lessons = [
  { key: 'StateAsProps', displayName: 'State as props' },
  { key: 'RenderStates', displayName: 'Render states' },
  { key: 'RenderProps', displayName: 'Render Props' },
  { key: 'PropsVsState', displayName: 'Props vs. State' },
  { key: 'Forms', displayName: 'Forms' },
  { key: 'RenderOptimizations', displayName: 'Performance and Render Optimizations' },
  { key: 'Context', displayName: 'Context' },
  { key: 'Testing', displayName: 'Testing' },
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

const App = () => (
  <Router>
    <div className="app">
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Learning Recompose</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      <Routes />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </div>
  </Router>
)

export default App
