import { Badge, Tabs } from 'antd-mobile';
import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';

import Content from './Content';

const category = [['技术', 300], ['创意', 17], ['好玩', 16], ['酷工作', 43], ['交易', 69], ['城市', 18], ['问与答', 12]];

const renderTabBar = (props: any) => {
	return (<Sticky>
		{({ style }: any) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
	</Sticky>);
};

export default class TechNews extends React.Component<{}, {}> {

	public render() {
		const tabs = category.map(([title, id]) => {
			return { title: <Badge>{title}</Badge> };
		});

		return (
			<StickyContainer>
				<Tabs
					tabs={tabs}
					initialPage={0}
					renderTabBar={renderTabBar}
				>
					{category.map(([_, id]: [string, number]) => <Content key={id} nodeId={id} />)}
				</Tabs>
			</StickyContainer>
		);
	}
}
