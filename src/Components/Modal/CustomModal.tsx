import React from 'react';

import './styles.css';

type Props = {
	children: React.ReactNode;
	closeModal: VoidFunction;
};

const CustomModal = ({ children, closeModal }: Props) => {
	return (
		<div className="modal-presentation">
			<div onClick={closeModal} className="modal-up-backdrop"></div>
			<div className="modal-content-horizontal-wrapper">
				<div onClick={closeModal} className="modal-side-backdrop"></div>
				<div className="modal-content">{children}</div>
				<div onClick={closeModal} className="modal-side-backdrop"></div>
			</div>
			<div onClick={closeModal} className="modal-down-backdrop"></div>
		</div>
	);
};

export default CustomModal;
