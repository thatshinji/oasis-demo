import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ErrorBoundary from '@/components/errorBoundary'

const Home = lazy(() => import('@/pages/home'))

const App = () => {
  return (
    <ErrorBoundary>
      <Router basename="">
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App
