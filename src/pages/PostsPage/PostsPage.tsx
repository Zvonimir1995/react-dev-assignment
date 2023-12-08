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
	const [filteredPosts, setFilteredPosts] = useState<PostModel[]>();
	const [postsToShow, setPostsToShow] = useState<PostModel[]>();

	useEffect(() => {
		PostService.getPosts()
			.then((res) => {
				setAllPosts(res);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!allPosts) return;
		setPostsToShow(allPosts.slice(0, 10));
	}, [allPosts]);

	const changeToFilteredPosts = (posts: 'all' | PostModel[]) => {
		if (posts === 'all') {
			setPostsToShow(allPosts?.slice(0, 10));
		} else {
			setFilteredPosts(posts);
			setPostsToShow(posts.slice(0, 10));
		}
	};

	if (loading || !users) {
		return <></>;
	}

	return (
		<div className="posts-page-container">
			<PostsFilter users={users} changeToFilteredPosts={changeToFilteredPosts} />
			{postsToShow?.map((post) => {
				return <PostItem key={post.id} post={post} users={users} postsPage />;
			})}
		</div>
	);
};

export default PostsPage;
