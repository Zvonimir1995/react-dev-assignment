import React, { useEffect } from 'react';

import { UserModel } from '../../Interfaces/interfaces';

type Props = {
	users: UserModel[] | undefined;
};

const PostPage = ({ users }: Props) => {
	console.log(users);
	useEffect(() => {
		console.log('mount');
	}, []);
	return <></>;
};

export default PostPage;
