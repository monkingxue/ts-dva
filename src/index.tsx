import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Detail from './Detail';
import Header from './Header';
import TechNews from './TechNews';

class App extends React.Component<{}, {}> {

	public render() {
		return (
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={TechNews}></Route>
					<Route path="/:tid" component={Detail}></Route>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
