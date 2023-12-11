import React from 'react';

import { useNavigate } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	users: FormattedUsers;
	isPostsPage?: boolean;
};

const PostItem = ({ users, post, isPostsPage }: Props) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				if (!isPostsPage) return;
				navigate(`/post/${post.id}`, { state: 'overlay' });
			}}
			className="post-item"
		>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<div className="post-author">{users[post.userId].name}</div>
			<PostComments users={users} postId={post.id} isPostsPage={isPostsPage} />
		</div>
	);
};

export default PostItem;
