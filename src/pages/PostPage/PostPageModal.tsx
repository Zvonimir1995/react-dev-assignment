import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import PostItem from '../../Components/PostItem/PostItem';
import { FormattedUsers, PostModel } from '../../Interfaces/interfaces';

type Props = {
	users: FormattedUsers;
};

const PostPageModal = ({ users }: Props) => {
	const { postId } = useParams();

	const [post, setPost] = useState<PostModel>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get<PostModel>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
			.then((response) => {
				setPost(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [postId]);

	if (loading || !post) return <></>;

	return <PostItem users={users} post={post} />;
};

export default PostPageModal;
