import React from 'react';

// import { useGreetFromComponent } from '../global/greetFromCmpHook';

type Props = {
	children: React.ReactNode;
	helloMessage?: string;
};

const Layout = ({ children }: Props) => {
	// useGreetFromComponent(helloMessage, 'Layout.tsx');

	return (
		<div className="app-layout">
			<header>
				<div className="app-width-container">React Developer Assignment</div>
			</header>
			<main className="app-content app-width-container">{children}</main>
			<footer></footer>
		</div>
	);
};

export default Layout;
