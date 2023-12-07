import React, { useEffect } from 'react';

import { FormattedUsers } from '../../Interfaces/interfaces';

type Props = {
	users: FormattedUsers | undefined;
};

const PostPage = ({ users }: Props) => {
	console.log(users);
	useEffect(() => {
		console.log('mount');
	}, []);
	return <></>;
};

export default PostPage;
