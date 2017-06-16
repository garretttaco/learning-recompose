import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as Subjects from './subjects'

const subjects = {
  Components: 'Components',
  PropsVsState: 'Props vs. State',
  Forms: 'Forms',
  Testing: 'Testing',
  Context: 'Context',
  RenderProps: 'Render Props',
  RenderOptimizations: 'Performance and Render Optimizations',
}

const SubjectRoute = ({ subjetKey, subjectName }) => (
  <div>
    <span>{subjectName}</span>
    <Link to={`/${subjetKey}/exercise.html`}>exercise</Link>
    <Link to={`/${subjetKey}/solution.html`}>solution</Link>
  </div>
)

const Routes = () => {}

const App = () => (
  <Router>
    <div className="app">

      {Object.keys(subjects).map(subjetKey => (
        <SubjectRoute subjetKey={subjetKey} subjectName={subjects[subjetKey]} />
      ))}
    </div>
  </Router>
)

export default App
