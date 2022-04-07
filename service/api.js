import axios from 'axios';

// Common API Function
// If we want any change across all API calls we could add it here.

async function API(entity) {
	const data = (entity) => {
		if (entity.callmethod !== 'GET') {
			if (entity.isfile) {
				return entity.bodydata;
			} else {
				return JSON.stringify(entity['bodydata']);
			}
		} else {
			return null;
		}
	};

	return axios({
		url: entity.callurl,
		method: entity.callmethod,
		params: entity.urlparams,
		data: data(entity),
	})
		.then((res) => {
			entity.callback(res);
		})
		.catch((err, res) => {});
}

export default API;
