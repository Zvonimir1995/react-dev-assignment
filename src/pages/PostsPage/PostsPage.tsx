import React, { useEffect, useState } from 'react';

import axios from 'axios';

import PostItem from '../../Components/PostItem';
import { PostModel, UserModel } from '../../Interfaces/interfaces';

import './styles.css';

type Props = {
	users: UserModel[] | undefined;
};

const PostsPage = ({ users }: Props) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<PostModel[]>();

	useEffect(() => {
		axios
			.get<PostModel[]>('https://jsonplaceholder.typicode.com/posts')
			.then((response) => {
				setPosts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <></>;
	}

	return (
		<div className="posts-container">
			<div className="filter-container">
				<label htmlFor="posts-filter">Filter by user</label>
				<input id="posts-filter" type="text" />
			</div>
			{posts?.map((post) => {
				return <PostItem key={post.id} post={post} />;
			})}
		</div>
	);
};

export default PostsPage;
