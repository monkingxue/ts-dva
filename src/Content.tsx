import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';
import { Link } from 'react-router-dom';

import { getTopics } from './serveice';
import { TopicInfo } from './typing';
import { getTimeDiff } from './utils';

interface Props {
	nodeId: number;
}

interface State {
	data: [TopicInfo] | null;
}

class Content extends React.PureComponent<Props, State> {

	constructor() {
		super();
		this.state = {
			data: null
		};
	}

	public async componentDidMount() {
		let data: [TopicInfo];
		try {
			data = await getTopics(this.props.nodeId);
		} catch (error) {
			return console.error(error);
		}
		this.setState({ data });
	}

	public render() {
		if (this.state.data == null) {
			return '';
		}

		return this.state.data.map(({ title, member, last_modified, id }, index) => {
			return (
				<Link key={id} to={`/${id}`}>
					<WingBlank size="lg">
						{index === 0 && <WhiteSpace size="lg" />}
						<Card>
							<Card.Header
								title={title}
								thumb={member.avatar_normal} />
							<Card.Footer content={member.username}
								extra={getTimeDiff(last_modified)} />
						</Card>
						<WhiteSpace size="lg" />
					</WingBlank>
				</Link>
			);
		});
	}
}

export default Content;
