import axios from 'axios';

const baseURL = '/api/';
const topicInfo = 'topics/show.json';

const query = (obj: any) => {
	const enURL = encodeURIComponent;

	return Object.keys(obj)
		.map(key => `${enURL(key)}=${enURL(obj[key])}`)
		.join('&');
};

const concatURL = (base: string, extend: string) => `${base}?${extend}`;

const client = axios.create({ baseURL });

export const getTopics = (id: number) => {
	return client.get(concatURL(topicInfo, query({ node_id: id })))
		.then(({ data }: any) => data);
};
