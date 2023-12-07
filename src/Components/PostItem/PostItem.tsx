import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormattedUsers, PostModel } from '../../Interfaces/interfaces';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	users: FormattedUsers;
	postsPage?: boolean;
};

const PostItem = ({ users, post, postsPage }: Props) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				if (!postsPage) return;
				navigate(`/post/${post.id}`, { state: 'overlay' });
			}}
			className="post-item"
		>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<div className="post-author">{users[post.userId].name}</div>
			<PostComments users={users} postId={post.id} />
		</div>
	);
};

export default PostItem;
