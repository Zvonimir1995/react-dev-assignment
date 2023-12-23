import { useMutation, useQuery } from '@tanstack/react-query';

import {
	CreatePostData,
	GetPostData,
	GetPostsData
	// PostModel
} from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import { queryKeys } from '../constants';
// import { queryClient } from '../queryQlient';

export const usePosts = (data: GetPostsData) => {
	return useQuery([queryKeys.posts, data.queryParams], () => PostService.getPosts(data));
};

export const usePost = (data: GetPostData) => {
	return useQuery([queryKeys.posts, queryKeys.post, data.postId], () => PostService.getPost(data));
};

export const useCreatePost = () => {
	return useMutation((data: CreatePostData) => PostService.createPost(data), {
		onSuccess: () => {
			// this is the place to update our existig queries, for example :

			// queryClient.setQueryData([queryKeys.posts, '{}'], (oldState: PostModel[] | undefined) => {
			// 	if (!oldState) return undefined;
			// 	return [resData, ...oldState];
			// });

			// in this case we will push the response to our global state so we can create multiple new posts
			// and display all the newly created posts regardless of post filter
			console.log('on success handler in rq hook');
		}
	});
};
