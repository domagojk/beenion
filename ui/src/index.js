import 'antd/dist/antd.css';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Journal from './pages/journal/Journal';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
const networkInterface = createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
});
const client = new ApolloClient({ networkInterface });
ReactDOM.render(React.createElement(ApolloProvider, { client: client },
    React.createElement(Router, null,
        React.createElement("div", null,
            React.createElement(Route, { exact: true, path: "/", render: () => React.createElement("div", null, "welcome") }),
            React.createElement(Route, { exact: true, path: "/journal/:journalId", render: ({ match }) => React.createElement(Journal, { id: match.params.journalId, section: 'reviewers' }) }),
            React.createElement(Route, { exact: true, path: "/journal/:journalId/accepted", render: ({ match }) => React.createElement(Journal, { id: match.params.journalId, section: 'accepted' }) })))), document.getElementById('root'));
