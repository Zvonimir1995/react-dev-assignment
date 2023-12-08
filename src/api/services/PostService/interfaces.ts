export interface IPostService {
	getPosts: (data?: GetPostsData) => Promise<PostModel[]>;
	getPost: (data: GetPostData) => Promise<PostModel>;
}

export interface PostModel {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface GetPostsData {
	queryParams?: {
		userId: number[];
	};
}

export interface GetPostData {
	postId: number;
}
