import { Badge, Tabs } from 'antd-mobile';
import React from 'react';

import Content from './Content';

const category = [['技术', 300], ['创意', 17], ['好玩', 16], ['酷工作', 43], ['交易', 69], ['城市', 18], ['问与答', 12]];

export default class TechNews extends React.Component<{}, {}> {

	public render() {
		const tabs = category.map(([title, id]) => {
			return { title: <Badge>{title}</Badge> };
		});

		return (
			<Tabs
				tabs={tabs}
				initialPage={0}>
				{category.map(([_, id]: [string, number]) => <Content key={id} nodeId={id} />)}
			</Tabs>
		);
	}
}
