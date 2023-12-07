import React, { useEffect, useState } from 'react';

import axios from 'axios';

import PostItem from '../../Components/PostItem/PostItem';
import { FormattedUsers, PostModel } from '../../Interfaces/interfaces';

import './styles.css';

type Props = {
	users: FormattedUsers;
};

const PostsPage = ({ users }: Props) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState<PostModel[]>();
	const [postsToShow, setPostsToShow] = useState<PostModel[]>();
	const [filterByUserInput, setFilterByUserInput] = useState('');

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

	useEffect(() => {
		if (!posts) return;
		setPostsToShow(posts.slice(0, 10));
	}, [posts]);

	const filterInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterByUserInput(event.target.value);
	};

	if (loading || !users) {
		return <></>;
	}

	return (
		<div className="posts-container">
			<div className="filter-container">
				<label htmlFor="posts-filter">Filter by user</label>
				<input
					value={filterByUserInput}
					onChange={filterInputChangeHandler}
					id="posts-filter"
					type="text"
				/>{' '}
				🔎
			</div>
			{postsToShow?.map((post) => {
				return <PostItem key={post.id} post={post} users={users} postsPage />;
			})}
		</div>
	);
};

export default PostsPage;
