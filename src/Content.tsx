import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';

// import { getTopics } from './serveice';
import { TopicInfo } from './typing';

interface Props {
	tid: number;
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
		// let data: [TopicInfo];
		// try {
		// 	data = await getTopics(this.props.tid);
		// } catch (error) {
		// 	return console.error(error);
		// }
		// this.setState({ data });
	}

	private lastModified(lm: number): string {
		const now = new Date().getTime().toString().slice(0, 10);
		const diff = Number(now) - lm;

		const units: [[number, string]] =
			[[24 * 3600, '天'], [3600, '小时'], [60, '分钟'], [1, '秒']];

		for (const [unit, name] of units) {
			const result = Math.floor(diff / unit);

			if (result !== 0) {
				return `${result}${name}前`;
			}
		}

		return '刚刚';
	}

	public render() {
		if (this.state.data == null) {
			return '';
		}

		return this.state.data.map(({ title, member, last_modified }, index) => {
			return (
				<WingBlank key={title + member} size="lg">
					{index === 0 && <WhiteSpace size="lg" />}
					<Card>
						<Card.Header
							title={title}
							thumb={member.avatar_normal} />
						<Card.Footer content={member.username}
							extra={(() => this.lastModified(last_modified))()} />
					</Card>
					<WhiteSpace size="lg" />
				</WingBlank>
			);
		});
	}
}

export default Content;
