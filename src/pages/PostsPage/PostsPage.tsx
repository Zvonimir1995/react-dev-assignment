import React, { useEffect, useRef, useState } from 'react';

import InfiniteScrollList from '../../Components/InfiniteScrollList/InfiniteScrollList';
import PostItem from '../../Components/PostItem/PostItem';
import PostsFilter from '../../Components/PostsFilter/PostsFilter';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { usePosts } from '../../rq/hooks/postsHook';
import { useUsers } from '../../rq/hooks/usersHook';

import './styles.css';

type Props = {
	helloMessage?: string;
};

const POSTS_IN_ONE_BATCH = 10;

const PostsPage = ({ helloMessage }: Props) => {
	const [filterPostsField, setFilterPostsField] = useState('');
	const [filterPostsByUserIds, setFilterPostsByUserIds] = useState<number[] | undefined>();
	const [showPostPages, setShowPostPages] = useState<number>(1);
	const canRenderMore = useRef<boolean>(true);

	const { data: users } = useUsers();
	const { data: posts } = usePosts({
		queryParams: {
			userId: filterPostsByUserIds
		}
	});

	useGreetFromComponent(helloMessage, 'PostsPage');

	useEffect(() => {
		if (!users) return;

		setFilterPostsByUserIds(() => {
			if (filterPostsField === '') {
				return undefined;
			} else {
				const filteredUserIds: number[] = [];
				Object.keys(users).forEach((key) => {
					if (users[key].name.toLowerCase().includes(filterPostsField.toLowerCase())) {
						filteredUserIds.push(users[key].id);
					}
				});
				return filteredUserIds;
			}
		});
		setShowPostPages(1);
	}, [filterPostsField, users]);

	const fetchNewPage: () => Promise<null> = () => {
		// simulate fetching a new page of posts
		setShowPostPages((prevState) => {
			const newState = prevState + 1;
			if (POSTS_IN_ONE_BATCH * newState >= 100) {
				canRenderMore.current = false;
			}
			return newState;
		});
		return new Promise((resolve) => resolve(null));
	};

	return (
		<div className="posts-page-container">
			<PostsFilter setFilterPostsField={setFilterPostsField} />

			<InfiniteScrollList
				items={posts?.slice(0, POSTS_IN_ONE_BATCH * showPostPages)}
				scrollingEl={window}
				canRenderMore={canRenderMore.current}
				fetchNewPage={fetchNewPage}
				renderItem={(post) => {
					return <PostItem key={post.id} post={post} isPostsPage />;
				}}
			/>
		</div>
	);
};

export default PostsPage;
