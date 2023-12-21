import React from 'react';

import { useNavigate } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { useUsers } from '../../rq/hooks/usersHook';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	isPostsPage?: boolean;
	helloMessage?: string;
};

const PostItem = ({ post, isPostsPage, helloMessage }: Props) => {
	const navigate = useNavigate();

	const { data: users } = useUsers();

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
			<div className="post-author">{(users as FormattedUsers)[post.userId].name}</div>
			<PostComments postId={post.id} isPostsPage={isPostsPage} />
		</div>
	);
};

export default PostItem;
