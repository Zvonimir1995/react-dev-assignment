import React from 'react';

import { PostModel } from '../Interfaces/interfaces';

type Props = {
	post: PostModel;
};

const PostItem = ({ post }: Props) => {
	console.log(post);
	return <></>;
};

export default PostItem;
