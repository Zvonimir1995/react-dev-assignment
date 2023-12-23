import React from 'react';

import './styles.css';

type Props = {
	title?: string;
	children: React.ReactNode;
};

const Card = ({ title, children }: Props) => {
	return (
		<div className="card">
			{title && <h4 className="card-title">{title}</h4>}
			{children}
		</div>
	);
};

export default Card;
