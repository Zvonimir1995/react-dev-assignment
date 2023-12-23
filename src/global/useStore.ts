import { create } from 'zustand';

import { PostModel } from '../api/services/PostService/interfaces';

interface GlobalState {
	newlyCreatedPosts: PostModel[];
	swapNewlyCreatedPost: (data: PostModel) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
	newlyCreatedPosts: [],
	swapNewlyCreatedPost: (data) => {
		set(() => ({
			// swap newly created post
			newlyCreatedPosts: [data]
		}));
	}
}));
