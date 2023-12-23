import React from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
// import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { useUsers } from '../../rq/hooks/usersHook';
import PostComments from '../Comments/PostComments';

import './styles.css';

type Props = {
	post: PostModel;
	isPostsPage?: boolean;
	helloMessage?: string;
};

const PostItem = ({ post, isPostsPage }: Props) => {
	const navigate = useNavigate();

	const { data: users } = useUsers();

	// useGreetFromComponent(helloMessage, 'PostItem.tsx');

	return (
		<div
			onClick={() => {
				if (!isPostsPage || post.customPost) return;
				navigate(`/post/${post.id}`, { state: 'overlay' });
			}}
			className={clsx({ 'post-item': true, custom: post.customPost })}
		>
			<h3>{post.title}</h3>
			{post.customPost ? (
				<div dangerouslySetInnerHTML={{ __html: post.body }}></div>
			) : (
				<p>{post.body}</p>
			)}
			<div className="post-author">{(users as FormattedUsers)[post.userId].name}</div>
			<PostComments postId={post.id} isPostsPage={isPostsPage} />
		</div>
	);
};

export default PostItem;
