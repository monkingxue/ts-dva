import { Icon, NavBar } from 'antd-mobile';
import React from 'react';
import X2JS from 'x2js';

import { getWeather } from './serveice';

interface State {
	pm25: number;
}

class Header extends React.PureComponent<{}, State> {
	constructor() {
		super();
		this.state = { pm25: 0 };
	}

	public async componentDidMount() {
		const data = await getWeather();
		const tool = new X2JS();
		const { resp: { environment: { pm25 } } } = tool.xml2js(data);
		this.setState({ pm25 });
	}

	public render() {
		return (
			<NavBar mode="light"
				icon={<Icon type="left" />}
				onLeftClick={() => location.pathname !== '/' && history.back()}
				rightContent={
					<span>PM2.5: {this.state.pm25}</span>
				}>V2EX</NavBar>
		);
	}
}

export default Header;
