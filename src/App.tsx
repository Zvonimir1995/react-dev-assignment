import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { FormattedUsers, UserModel } from './Interfaces/interfaces';
import Layout from './Layout/Layout';
import PostPage from './pages/PostPage/PostPage';
import PostsPage from './pages/PostsPage/PostsPage';

const App = () => {
	const [users, setUsers] = useState<FormattedUsers>();

	useEffect(() => {
		axios.get<UserModel[]>('https://jsonplaceholder.typicode.com/users').then((res) => {
			const formattedUsers: FormattedUsers = {};
			res.data.forEach((user) => {
				formattedUsers[user.id] = user;
			});
			setUsers(formattedUsers);
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
