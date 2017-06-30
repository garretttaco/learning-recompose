import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Panel, ListGroup, ListGroupItem, Navbar, Col, Clearfix } from 'react-bootstrap'
import * as Subjects from './subjects/index.js'
import './shared.css'

const subjects = {
  Components: 'Components',
  RenderProps: 'Render Props',
  PropsVsState: 'Props vs. State',
  Forms: 'Forms',
  RenderOptimizations: 'Performance and Render Optimizations',
  Context: 'Context',
  Testing: 'Testing',
}

const SubjectRoute = ({ subjectKey, subjectName, incr }) => (
  <ListGroupItem>
    <Col sm="10">
      <span>{incr + 1}. {subjectName}</span>
    </Col>
    <Col sm="1">
      <Link to={`/${subjectKey}/exercise`}>Exercise</Link>
    </Col>
    <Col sm="1">
      <Link to={`/${subjectKey}/solution`}>Solution</Link>
    </Col>
    <Clearfix />
  </ListGroupItem>
)

const Routes = () => (
  <div>
    {Object.keys(subjects).map(subjectKey => (
      <div>
        <Route path={`/${subjectKey}/exercise`} component={Subjects[`${subjectKey}Exercise`]} />
        <Route path={`/${subjectKey}/solution`} component={Subjects[`${subjectKey}Solution`]} />
      </div>
    ))}
  </div>
)

const Home = () => (
  <main>
    <Panel header="Workshop subjects">
      <ListGroup fill>
        {Object.keys(subjects).map((subjectKey, key) => (
          <SubjectRoute subjectKey={subjectKey} subjectName={subjects[subjectKey]} incr={key} />
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
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  </Router>
)

export default App
