import { useQuery } from '@tanstack/react-query';

import { CommentService } from '../../api/services/CommentSerivce/CommentService';
import { queryKeys } from '../constants';

export const useComments = (postId: number) => {
	return useQuery([queryKeys.posts, queryKeys.post, postId, queryKeys.comments], () =>
		CommentService.getComments(postId)
	);
};
