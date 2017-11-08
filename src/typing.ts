export interface User {
	id: number;
	username: string;
	tagline: string;
	avatar_mini: string;
	avatar_normal: string;
	avatar_large: string;
}

export interface Node {
	id: number;
	name: string;
	title: string;
	title_alternative: string;
	url: string;
	topics: string;
	avatar_mini: string;
	avatar_normal: string;
	avatar_large: string;
}

export interface TopicInfo {
	id: number;
	title: string;
	url: string;
	content: string;
	member: User;
	node: Node;
	created: number;
	last_modified: number;
	last_touched: number;
}

export interface Reply {
	id: number;
	thanks: number;
	content: string;
	content_rendered: string;
	member: User;
	created: number;
	last_modified: number;
}
