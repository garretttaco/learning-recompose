import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import * as Subjects from './subjects/index.js'
import './shared.css'

console.log('--------------Subjects', Subjects)

const subjects = {
  Components: 'Components',
  PropsVsState: 'Props vs. State',
  Forms: 'Forms',
  Testing: 'Testing',
  Context: 'Context',
  RenderProps: 'Render Props',
  RenderOptimizations: 'Performance and Render Optimizations',
}

const SubjectRoute = ({ subjectKey, subjectName }) => (
  <div>
    <span>{subjectName}</span>
    <Link to={`/${subjectKey}/exercise`}>Exercise</Link>
    <Link to={`/${subjectKey}/solution`}>Solution</Link>
  </div>
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
  <div>
    {Object.keys(subjects).map(subjectKey => (
      <SubjectRoute subjectKey={subjectKey} subjectName={subjects[subjectKey]} />
    ))}
  </div>
)

const App = () => (
  <Router>
    <div className="app">
      <Link to="/">Home</Link>
      <Routes />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  </Router>
)

export default App
