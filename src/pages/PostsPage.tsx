import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostsPage = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState();

	useEffect(() => {
		axios
			.get('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				setPosts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	return (
		<div
			onClick={() => {
				navigate('/post/5');
			}}
		>
			set post
		</div>
	);
};

export default PostsPage;
