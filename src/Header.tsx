import { Icon, NavBar } from 'antd-mobile';
import React from 'react';

class Header extends React.PureComponent<{}, {}> {

	public render() {

		return (
			<NavBar mode="light" rightContent={[
				<Icon key="0" type="search" />
			]}>V2EX</NavBar>
		);
	}
}

export default Header;
