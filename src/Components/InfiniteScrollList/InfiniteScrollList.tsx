import React, { useCallback, useEffect, useRef } from 'react';

import { PostModel } from '../../api/services/PostService/interfaces';

import './styles.css';

type Props = {
	scrollingEl: HTMLElement | Window;
	renderItem: (post: PostModel) => JSX.Element;
	items: PostModel[] | undefined;
	canRenderMore: boolean;
	fetchNewPage: () => Promise<null>;
};

const InfiniteScrollList = ({
	items,
	renderItem,
	scrollingEl,
	canRenderMore,
	fetchNewPage
}: Props) => {
	const scrollDebounce = useRef<boolean>(false);
	const infiniteScrollListContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		if (!infiniteScrollListContainerRef.current) return;
		if (
			!scrollDebounce.current &&
			canRenderMore &&
			infiniteScrollListContainerRef.current.scrollHeight - window.scrollY < window.innerHeight * 2
		) {
			scrollDebounce.current = true;
			// this would be the place to fetch new batch of posts via API
			// this is the dummy simulation of fetching a new page
			fetchNewPage().then(() => {
				scrollDebounce.current = false;
			});
		}
	}, [canRenderMore, fetchNewPage]);

	useEffect(() => {
		scrollingEl.addEventListener('scroll', handleScroll);
		return () => {
			scrollingEl.removeEventListener('scroll', handleScroll);
		};
	}, [scrollingEl, handleScroll]);

	return (
		<div className="infinite-scroll-list-container" ref={infiniteScrollListContainerRef}>
			{items?.map((post) => {
				return renderItem(post);
			})}
		</div>
	);
};

export default InfiniteScrollList;
