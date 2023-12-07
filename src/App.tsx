import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import PostPage from './pages/PostPage/PostPage';
import PostsPage from './pages/PostsPage/PostsPage';

const App = () => {
	const [users, setUsers] = useState();

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
			setUsers(res.data);
		});
	}, []);

	return (
		<Routes>
			<Route
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				<Route path="posts" element={<PostsPage users={users} />} />
				<Route path="post/:postId" element={<PostPage users={users} />} />
				<Route path="*" element={<Navigate to="posts" replace />} />
			</Route>
		</Routes>
	);
};

export default App;
