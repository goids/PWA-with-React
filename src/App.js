import React from 'react'
import { Router, Route, Link } from "react-router-dom"
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'
import Home from './pages/Home'
import Recipe from './pages/Recipe'
import Timer from './pages/Timer'
import IfOffline from './components/IfOffline'
import './App.css'

const history = createBrowserHistory()

ReactGA.initialize('UA-000000-01')
ReactGA.pageview( window.location.pathname + window.location.search)

history.listen( location => ReactGA.pageview( window.location.pathname + window.location.search))

export default class App extends React.Component {
  render() {
    return (
      <Router history={ history } >
        <div>
          <header>
            <Link to="/">Recetas <IfOffline> Offline </IfOffline></Link>
            <Link to="/timer" className="timerLink">Timer</Link>
          </header>

          <main>
            <Route exact path="/" component={Home} />
            <Route path="/recipe/:recipeId" component={Recipe} />
            <Route path="/timer" component={Timer} />
          </main>
        </div>
      </Router>
    );
  }
}
