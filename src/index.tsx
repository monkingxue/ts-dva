import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

import Header from './Header';
import TechNews from './TechNews';

class App extends React.Component<{}, {}> {
	public render() {
		return (
			<Router>
				<div>
					<Header></Header>
					<Route path="/" component={TechNews}></Route>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
