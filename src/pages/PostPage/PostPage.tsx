import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import PostItem from '../../Components/PostItem/PostItem';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';

import './styles.css';

type Props = {
	helloMessage?: string;
};

const PostPage = ({ helloMessage }: Props) => {
	const navigate = useNavigate();
	const { postId } = useParams();

	const [post, setPost] = useState<PostModel>();
	const [loading, setLoading] = useState(true);

	useGreetFromComponent(helloMessage, 'PostPage.tsx');

	useEffect(() => {
		PostService.getPost({ postId: Number(postId) })
			.then((response) => {
				setPost(response);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [postId]);

	if (loading || !post) return <></>;

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
