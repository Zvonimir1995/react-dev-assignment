export interface ICommentService {
	getComments: (postId: number) => Promise<CommentModel[]>;
}

export interface CommentModel {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}
