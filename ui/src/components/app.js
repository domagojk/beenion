import { h, Component } from 'preact';
import { Router } from 'preact-router';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

const client = new ApolloClient({
	uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql'
});

export default class App extends Component {
	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<ApolloProvider client={client}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
				</div>
			</ApolloProvider>
		);
	}
}
