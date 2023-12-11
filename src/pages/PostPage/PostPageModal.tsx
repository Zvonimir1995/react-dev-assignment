import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { PostModel } from '../../api/services/PostService/interfaces';
import { PostService } from '../../api/services/PostService/PostService';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import PostItem from '../../Components/PostItem/PostItem';

type Props = {
	users: FormattedUsers;
};

const PostPageModal = ({ users }: Props) => {
	const { postId } = useParams();

	const [post, setPost] = useState<PostModel>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		PostService.getPost({ postId: Number(postId) })
			.then((response) => {
				setPost(response);
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
