import React from 'react';

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
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
