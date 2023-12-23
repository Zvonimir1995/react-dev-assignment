import React, { useState } from 'react';

// import { useGreetFromComponent } from '../../global/greetFromCmpHook';

import './styles.css';

type Props = {
	setFilterPostsField: React.Dispatch<React.SetStateAction<string>>;
	helloMessage?: string;
};

const PostsFilter = ({ setFilterPostsField }: Props) => {
	const [filterByUserInputValue, setFilterByUserInputValue] = useState('');
	const [requestTimeout, setRequestTimeout] = useState<NodeJS.Timeout>();

	// useGreetFromComponent(helloMessage, 'PostsFilter.tsx');

	const filterInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (requestTimeout) {
			clearTimeout(requestTimeout);
		}
		setFilterByUserInputValue(event.target.value);
		const timeout = setTimeout(() => {
			setFilterPostsField(event.target.value);
		}, 1000);
		setRequestTimeout(timeout);
	};

	return (
		<div className="filter-container">
			<label htmlFor="posts-filter">Filter by user</label>
			<input
				value={filterByUserInputValue}
				onChange={filterInputChangeHandler}
				id="posts-filter"
				type="text"
			/>{' '}
			<span>🔎</span>
		</div>
	);
};

export default PostsFilter;
