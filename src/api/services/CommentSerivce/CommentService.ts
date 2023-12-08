import { apiClient } from '../../apiClient';

import { ICommentService } from './interfaces';

export const CommentService: ICommentService = {
	getComments: async (postId) => {
		return await apiClient.get(`comments?postId=${postId}`).then((res) => res.data);
	}
};
