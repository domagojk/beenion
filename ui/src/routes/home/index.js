import { h } from 'preact';
import style from './style';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ExchangeRates = () => (
	<Query
		query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
	>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return (
				<div>
					{data.rates.map(({ currency, rate }) => (
						<p>{`${currency}: ${rate}`}</p>
					))}
				</div>
			);

		  /* console.log(data);
			return data.rates.map(({ currency, rate }) => (
				<p>{`${currency}: ${rate}`}</p>
			));
			*/
		}}
	</Query>
);

const Home = () => (
	<div class={style.home}>
		<h1>Home h</h1>
		<ExchangeRates />
	</div>
);

export default Home;
