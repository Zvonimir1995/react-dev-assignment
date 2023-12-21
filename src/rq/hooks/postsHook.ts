import { useQuery } from '@tanstack/react-query';

import { GetPostData, GetPostsData } from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import { queryKeys } from '../constants';

export const usePosts = (data: GetPostsData) => {
	return useQuery([queryKeys.posts, data.queryParams], () => PostService.getPosts());
};

export const usePost = (data: GetPostData) => {
	return useQuery([queryKeys.posts, queryKeys.post, data.postId], () => PostService.getPost(data));
};
