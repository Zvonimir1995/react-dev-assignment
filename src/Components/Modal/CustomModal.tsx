import React from 'react';

import './styles.css';

type Props = {
	children: React.ReactNode;
	closeModal: VoidFunction;
};

const CustomModal = ({ children, closeModal }: Props) => {
	return (
		<div className="backdrop" onClick={closeModal}>
			<div className="modal">{children}</div>
		</div>
	);
};

export default CustomModal;
