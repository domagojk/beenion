import 'antd/dist/antd.css'
import 'font-awesome/css/font-awesome.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Journal from './pages/journal/Journal'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:4000/graphql'
})

const client = new ApolloClient({ networkInterface })

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route
          exact 
          path="/"
          render={() => <div>welcome</div>} />
        <Route
          exact
          path="/journal/:journalId"
          render={({ match }) => <Journal id={match.params.journalId} section='reviewers' />}
        />
        <Route
          exact
          path="/journal/:journalId/accepted"
          render={({ match }) => <Journal id={match.params.journalId} section='accepted' />}
        />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
