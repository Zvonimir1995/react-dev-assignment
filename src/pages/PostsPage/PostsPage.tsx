import React, { useEffect, useRef, useState } from 'react';

import { PostModel } from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import InfiniteScrollList from '../../Components/InfiniteScrollList/InfiniteScrollList';
import PostItem from '../../Components/PostItem/PostItem';
import PostsFilter from '../../Components/PostsFilter/PostsFilter';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { useUsers } from '../../rq/hooks/usersHook';

import './styles.css';

type Props = {
	helloMessage?: string;
};

const POSTS_IN_ONE_BATCH = 10;

const PostsPage = ({ helloMessage }: Props) => {
	const [loading, setLoading] = useState(true);
	const [allPosts, setAllPosts] = useState<PostModel[]>();
	const [filterPostsField, setFilterPostsField] = useState('');
	const [filteredPosts, setFilteredPosts] = useState<PostModel[]>();
	const [showPostPages, setShowPostPages] = useState<number>(1);
	const canRenderMore = useRef<boolean>(true);

	const { data: users } = useUsers();

	useGreetFromComponent(helloMessage, 'PostsPage');

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
		if (!users) return;
		if (filterPostsField === '') {
			setFilteredPosts(allPosts);
			return;
		}
		const filteredUserIds: number[] = [];
		Object.keys(users).forEach((key) => {
			if (users[key].name.toLowerCase().includes(filterPostsField.toLowerCase())) {
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
	}, [filterPostsField, allPosts, users]);

	const fetchNewPage: () => Promise<null> = () => {
		setShowPostPages((prevState) => {
			const newState = prevState + 1;
			if (POSTS_IN_ONE_BATCH * newState >= 100) {
				canRenderMore.current = false;
			}
			return newState;
		});
		return new Promise((resolve) => resolve(null));
	};

	if (loading || !users) {
		return <></>;
	}

	return (
		<div className="posts-page-container">
			<PostsFilter setFilterPostsField={setFilterPostsField} />

			<InfiniteScrollList
				items={filteredPosts?.slice(0, POSTS_IN_ONE_BATCH * showPostPages)}
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
