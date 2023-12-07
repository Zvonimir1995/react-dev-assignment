import React from 'react';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';

const App = () => {
	return (
		<Routes>
			<Route
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				<Route path="posts" element={<PostsPage />} />
				<Route path="post/:postId" element={<PostPage />} />
				<Route path="*" element={<Navigate to="posts" replace />} />
			</Route>
		</Routes>
	);
};

export default App;
