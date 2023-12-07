import React from 'react';

import { FormattedUsers, PostModel } from '../../Interfaces/interfaces';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	users: FormattedUsers;
};

const PostItem = ({ users, post }: Props) => {
	return (
		<div className="post-item">
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<div className="post-author">{users[post.userId].name}</div>
			<PostComments users={users} postId={post.id} />
		</div>
	);
};

export default PostItem;
