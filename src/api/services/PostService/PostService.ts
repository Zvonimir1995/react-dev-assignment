import { apiClient } from '../../apiClient';
import { getQueryParamsString } from '../utils';

import { IPostService } from './interfaces';

export const PostService: IPostService = {
	getPosts: async (data) => {
		const queryParams = getQueryParamsString(data?.queryParams);
		return await apiClient.get(`posts${queryParams}`).then((res) => res.data);
	},
	getPost: async (data) => {
		return await apiClient.get(`posts/${data.postId}`).then((res) => res.data);
	}
};
