import React, { useState } from 'react';

import { PostModel } from '../../api/services/PostService/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';

import './styles.css';

type Props = {
	users: FormattedUsers;
	changeToFilteredPosts: (posts: 'all' | PostModel[]) => void;
};

const PostsFilter = ({ users, changeToFilteredPosts }: Props) => {
	const [filterByUserInput, setFilterByUserInput] = useState('');
	const [requestTimeout, setRequestTimeout] = useState<NodeJS.Timeout>();

	const filterInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (requestTimeout) {
			clearTimeout(requestTimeout);
		}
		setFilterByUserInput(event.target.value);
		const timeout = setTimeout(() => {
			fetchFilteredPosts(event.target.value);
		}, 2000);
		setRequestTimeout(timeout);
	};

	const fetchFilteredPosts = (filter: string) => {
		const filteredUserIds: number[] = [];
		Object.keys(users).forEach((key) => {
			if (users[key].name.toLowerCase().includes(filter.toLowerCase())) {
				filteredUserIds.push(users[key].id);
			}
		});
	};

	return (
		<div className="filter-container">
			<label htmlFor="posts-filter">Filter by user</label>
			<input
				value={filterByUserInput}
				onChange={filterInputChangeHandler}
				id="posts-filter"
				type="text"
			/>{' '}
			<span
				onClick={() => {
					console.log('clicked');
				}}
			>
				🔎
			</span>
		</div>
	);
};

export default PostsFilter;
