import React, { useEffect, useMemo, useState } from 'react';

import {
	Location,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate
} from 'react-router-dom';

import CustomModal from './Components/Modal/CustomModal';
import { useGreetFromComponent } from './global/greetFromCmpHook';
import Layout from './Layout/Layout';
import PostPage from './pages/PostPage/PostPage';
import PostPageModal from './pages/PostPage/PostPageModal';
import PostsPage from './pages/PostsPage/PostsPage';
import { useUsers } from './rq/hooks/usersHook';

const App = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useGreetFromComponent(undefined, 'App.tsx');

	const { data: users } = useUsers();

	const [lastNonOverlayRoute, setLastNonOverlayRoute] = useState<Location | undefined>();

	const displayInOverlay = useMemo(() => {
		return location.state === 'overlay';
	}, [location]);

	useEffect(() => {
		if (location.state !== 'overlay') {
			setLastNonOverlayRoute(location);
		}
	}, [location]);

	useEffect(() => {
		// disable scrolling on components in the background
		const body = document.querySelector('body') as HTMLElement;
		if (displayInOverlay) {
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'auto';
		}
	}, [displayInOverlay]);

	if (!users) {
		// wait for users to be loaded
		return <></>;
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
					<Route path="posts" element={<PostsPage />} />
					<Route path="post/:postId" element={<PostPage />} />
					<Route path="*" element={<Navigate to="posts" replace />} />
				</Route>
			</Routes>

			{displayInOverlay && (
				<CustomModal closeModal={() => navigate(-1)}>
					<Routes>
						<Route path="post/:postId" element={<PostPageModal />} />
					</Routes>
				</CustomModal>
			)}
		</>
	);
};

export default App;
