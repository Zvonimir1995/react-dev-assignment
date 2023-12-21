import React from 'react';

import { useParams } from 'react-router-dom';

import PostItem from '../../Components/PostItem/PostItem';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { usePost } from '../../rq/hooks/postsHook';

type Props = {
	helloMessage?: string;
};

const PostPageModal = ({ helloMessage }: Props) => {
	const { postId } = useParams();

	useGreetFromComponent(helloMessage, 'PostPageModal.tsx');

	const { data: post } = usePost({
		postId: Number(postId)
	});

	if (!post) return <></>;

	return <PostItem post={post} />;
};

export default PostPageModal;
