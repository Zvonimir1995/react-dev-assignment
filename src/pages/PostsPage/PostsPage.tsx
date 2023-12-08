import React, { useEffect, useState } from 'react';

import { PostModel } from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import PostItem from '../../Components/PostItem/PostItem';
import PostsFilter from '../../Components/PostsFilter/PostsFilter';

import './styles.css';

type Props = {
	users: FormattedUsers;
};

const PostsPage = ({ users }: Props) => {
	const [loading, setLoading] = useState(true);
	const [allPosts, setAllPosts] = useState<PostModel[]>();
	const [filter, setFilter] = useState('');
	const [filteredPosts, setFilteredPosts] = useState<PostModel[]>();

	useEffect(() => {
		PostService.getPosts()
			.then((res) => {
				setAllPosts(res);
				setFilteredPosts(res);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (filter === '') {
			setFilteredPosts(allPosts);
			return;
		}
		const filteredUserIds: number[] = [];
		Object.keys(users).forEach((key) => {
			if (users[key].name.toLowerCase().includes(filter.toLowerCase())) {
				filteredUserIds.push(users[key].id);
			}
		});
		PostService.getPosts({
			queryParams: {
				userId: filteredUserIds
			}
		}).then((res) => {
			setFilteredPosts(res);
		});
	}, [filter, allPosts, users]);

	if (loading || !users) {
		return <></>;
	}

	return (
		<div className="posts-page-container">
			<PostsFilter setFilter={setFilter} />
			{filteredPosts?.map((post) => {
				return <PostItem key={post.id} post={post} users={users} postsPage />;
			})}
		</div>
	);
};

export default PostsPage;
