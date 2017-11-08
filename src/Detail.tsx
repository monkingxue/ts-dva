import { Card, WhiteSpace } from 'antd-mobile';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { getReplies, getTopicInfo } from './serveice';
import { Reply, TopicInfo } from './typing';
import { getTimeDiff } from './utils';

interface Params {
	tid: number;
}

interface Props extends RouteComponentProps<Params> {
}

interface State {
	topicInfo: TopicInfo | null;
	dataSource: [Reply] | null;
	pageNumber: number;
	pageSize: number;
}

class Detail extends React.PureComponent<Props, State> {
	constructor() {
		super();
		this.state = {
			dataSource: null,
			pageNumber: 0,
			pageSize: 10,
			topicInfo: null
		};
	}

	public async componentDidMount() {
		let topicPromise: Promise<[TopicInfo]>;
		let sourcePromise: Promise<[Reply]>;
		const id = this.props.match.params.tid;
		try {
			topicPromise = getTopicInfo(id);
			sourcePromise = getReplies(id, this.state.pageNumber);
		} catch (error) {
			return console.error(error);
		}

		const [[topicInfo], dataSource] = await Promise.all([topicPromise, sourcePromise]);
		this.setState({ topicInfo, dataSource });
	}

	public render() {
		const { topicInfo, dataSource } = this.state;
		if (topicInfo == null || dataSource == null) {
			return '';
		}

		const { title, member, content, created } = topicInfo;
		return (
			<div>
				<Card full>
					<Card.Header
						title={title}
						thumb={member.avatar_normal}
					/>
					<Card.Body>
						<div style={{ wordBreak: 'break-all' }}
							dangerouslySetInnerHTML={{ __html: content }} />
					</Card.Body>
					<Card.Footer content={member.username} extra={getTimeDiff(created)} />
				</Card>
				<WhiteSpace size="lg" />
				{
					dataSource == null ? '' : dataSource.map(({ id, thanks, member, created, content }) =>
						<ReplyItem key={id} avatar={member.avatar_normal} name={member.username} thanks={thanks} time={created} content={content} />)
				}
			</div>
		);
	}
}

const ReplyItem = ({ avatar, content, name, time, thanks }:
	{ avatar: string, content: string, name: string, time: number, thanks: number }) => {
	return (
		<Card>
			<Card.Header
				title={name}
				thumb={avatar}
			/>
			<Card.Body>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</Card.Body>
			<Card.Footer content={`${thanks}人喜欢`} extra={getTimeDiff(time)} />
		</Card>
	);
};

export default Detail;
