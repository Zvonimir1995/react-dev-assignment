import React from 'react';

import { useNavigate } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	users: FormattedUsers;
	isPostsPage?: boolean;
	helloMessage?: string;
};

const PostItem = ({ users, post, isPostsPage, helloMessage }: Props) => {
	const navigate = useNavigate();

	useGreetFromComponent(helloMessage, 'PostItem.tsx');

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
