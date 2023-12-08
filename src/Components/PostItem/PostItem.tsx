import React from 'react';

import { useNavigate } from 'react-router-dom';

import { FormattedUsers, PostModel } from '../../Interfaces/interfaces';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	users: FormattedUsers;
	postsPage?: boolean;
	overlay?: boolean;
};

const PostItem = ({ users, post, postsPage, overlay }: Props) => {
	const navigate = useNavigate();

	const closePost = () => {
		if (overlay) {
			navigate(-1);
		} else {
			navigate('/posts');
		}
	};

	return (
		<div
			onClick={() => {
				if (!postsPage) return;
				navigate(`/post/${post.id}`, { state: 'overlay' });
			}}
			className="post-item"
		>
			{!postsPage && (
				<div onClick={closePost} className="close-post-item-container">
					x
				</div>
			)}
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<div className="post-author">{users[post.userId].name}</div>
			<PostComments users={users} postId={post.id} postsPage={postsPage} />
		</div>
	);
};

export default PostItem;
