import { Button } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div>
				<div>ceshi</div>
				<Button>ceshidede</Button>
				<div>ok</div>
			</div>
		);
	}
}

const root = document.getElementById('app');

ReactDOM.render(<App />, root);
