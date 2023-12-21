import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import PostItem from '../../Components/PostItem/PostItem';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { usePost } from '../../rq/hooks/postsHook';

import './styles.css';

type Props = {
	helloMessage?: string;
};

const PostPage = ({ helloMessage }: Props) => {
	const navigate = useNavigate();
	const { postId } = useParams();

	useGreetFromComponent(helloMessage, 'PostPage.tsx');

	const { data: post } = usePost({
		postId: Number(postId)
	});

	if (!post) return <></>;

	return (
		<div>
			<p className="back-to-posts-container">
				<span
					className="back-to-posts-link"
					onClick={() => {
						navigate('/');
					}}
				>
					Go to to all posts
				</span>
			</p>
			<PostItem post={post} />
		</div>
	);
};

export default PostPage;
