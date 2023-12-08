import React, { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import {
	Location,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate
} from 'react-router-dom';

import { FormattedUsers, UserModel } from './api/services/UsersService/interfaces';
import CustomModal from './Components/Modal/CustomModal';
import Layout from './Layout/Layout';
import PostPage from './pages/PostPage/PostPage';
import PostPageModal from './pages/PostPage/PostPageModal';
import PostsPage from './pages/PostsPage/PostsPage';

const App = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [lastNonOverlayRoute, setLastNonOverlayRoute] = useState<Location | undefined>();
	const [users, setUsers] = useState<FormattedUsers>();

	const displayInOverlay = useMemo(() => {
		return location.state === 'overlay';
	}, [location]);

	useEffect(() => {
		axios.get<UserModel[]>('https://jsonplaceholder.typicode.com/users').then((res) => {
			const formattedUsers: FormattedUsers = {};
			res.data.forEach((user) => {
				formattedUsers[user.id] = user;
			});
			setUsers(formattedUsers);
		});
	}, []);

	useEffect(() => {
		if (location.state !== 'overlay') {
			setLastNonOverlayRoute(location);
		}
	}, [location]);

	useEffect(() => {
		const body = document.querySelector('body') as HTMLElement;
		if (displayInOverlay) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}
	}, [displayInOverlay]);

	if (!users) {
		return (
			<Layout>
				<div
					style={{
						height: '100%',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					loading users
				</div>
			</Layout>
		);
	}

	return (
		<>
			<Routes location={displayInOverlay ? lastNonOverlayRoute : location}>
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

			{displayInOverlay && (
				<CustomModal closeModal={() => navigate(-1)}>
					<Routes>
						<Route path="post/:postId" element={<PostPageModal users={users} />} />
					</Routes>
				</CustomModal>
			)}
		</>
	);
};

export default App;
