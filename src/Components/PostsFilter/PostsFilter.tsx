import React, { useState } from 'react';

import './styles.css';

type Props = {
	// changeToFilteredPosts: (posts: 'all' | PostModel[]) => void;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const PostsFilter = ({ setFilter }: Props) => {
	const [filterByUserInput, setFilterByUserInput] = useState('');
	const [requestTimeout, setRequestTimeout] = useState<NodeJS.Timeout>();

	const filterInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (requestTimeout) {
			clearTimeout(requestTimeout);
		}
		setFilterByUserInput(event.target.value);
		const timeout = setTimeout(() => {
			setFilter(event.target.value);
		}, 1000);
		setRequestTimeout(timeout);
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
