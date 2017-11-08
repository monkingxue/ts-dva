import axios from 'axios';

const baseURL = '/api';
const topicInfo = '/topics/show.json';
const replies = '/replies/show.json';

const query = (obj: any) => {
	const enURL = encodeURIComponent;

	return Object.keys(obj)
		.map(key => `${enURL(key)}=${enURL(obj[key])}`)
		.join('&');
};

const concatURL = (base: string, extend: string) => `${base}?${extend}`;

const client = axios.create({ baseURL });

export const getTopics = (nodeId: number) => {
	return client.get(concatURL(topicInfo, query({ node_id: nodeId })))
		.then(({ data }: any) => data);
};

export const getTopicInfo = (id: number) => {
	return client.get(concatURL(topicInfo, query({ id })))
		.then(({ data }: any) => data);
};

export const getReplies = (id: number, page = 1, pageSize = 10) => {
	return client.get(concatURL(replies, query({
		page,
		page_size: pageSize,
		topic_id: id
	}))).then(({ data }: any) => data);
};

export const getWeather = (cityKey = 101020100) => {
	return axios.get(concatURL('/WeatherApi', query({ citykey: cityKey })))
		.then(({ data }) => data);
};
