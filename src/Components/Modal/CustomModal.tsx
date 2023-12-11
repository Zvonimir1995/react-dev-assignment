import React, { useEffect } from 'react';

import { useGreetFromComponent } from '../../global/greetFromCmpHook';

import './styles.css';

type Props = {
	children: React.ReactNode;
	closeModal: VoidFunction;
	helloMessage?: string;
};

const CustomModal = ({ children, closeModal, helloMessage }: Props) => {
	useGreetFromComponent(helloMessage, 'CustomModal.tsx');

	useEffect(() => {
		const body = document.querySelector('body');
		if (body) {
			body.style.paddingRight = '6px';
		}
		return () => {
			if (body) {
				body.style.paddingRight = '0px';
			}
		};
	}, []);

	return (
		<div className="modal-presentation">
			<div onClick={closeModal} className="modal-up-backdrop"></div>
			<div className="modal-content-horizontal-wrapper">
				<div onClick={closeModal} className="modal-side-backdrop"></div>
				<div className="modal-content">
					<div onClick={closeModal} className="close-modal-container">
						x
					</div>

					{children}
				</div>
				<div onClick={closeModal} className="modal-side-backdrop"></div>
			</div>
			<div onClick={closeModal} className="modal-down-backdrop"></div>
		</div>
	);
};

export default CustomModal;
