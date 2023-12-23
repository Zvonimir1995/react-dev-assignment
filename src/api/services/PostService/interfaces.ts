export interface IPostService {
	getPosts: (data?: GetPostsData) => Promise<PostModel[]>;
	getPost: (data: GetPostData) => Promise<PostModel>;
	createPost: (data: CreatePostData) => Promise<PostModel>;
}

export interface PostModel {
	userId: number;
	id: number;
	title: string;
	body: string;
	customPost?: boolean;
}

export interface GetPostsData {
	queryParams?: {
		userId?: number[];
	};
}

export interface GetPostData {
	postId: number;
}

export type CreatePostData = {
	title: 'Your Created Post';
	body: string;
	userId: number;
};
