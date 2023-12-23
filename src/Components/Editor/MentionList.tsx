import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { Avatar } from '@mui/material';

import { UserModel } from '../../api/services/UsersService/interfaces';

//eslint-disable-next-line
const forwardref = forwardRef((props: any, ref) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const selectItem = (index: number) => {
		const item = props.items[index];

		if (item) {
			const user = item as UserModel;
			props.command({
				id: user.id,
				label: user.name
			});
		}
	};

	const upHandler = () => {
		setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
	};

	const downHandler = () => {
		setSelectedIndex((selectedIndex + 1) % props.items.length);
	};

	const enterHandler = () => {
		selectItem(selectedIndex);
	};

	useEffect(() => setSelectedIndex(0), [props.items]);

	useImperativeHandle(ref, () => ({
		onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
			if (event.key === 'ArrowUp') {
				upHandler();
				return true;
			}

			if (event.key === 'ArrowDown') {
				downHandler();
				return true;
			}

			if (event.key === 'Enter') {
				enterHandler();
				return true;
			}

			return false;
		}
	}));

	return (
		<div className="mention-list-items">
			{props.items.length ? (
				props.items.map((user: UserModel, index: number) => {
					return (
						<button
							className={`mention-list-item ${index === selectedIndex ? 'is-selected' : ''}`}
							key={index}
							onClick={() => selectItem(index)}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center'
								}}
							>
								<Avatar
									style={{
										height: '1.5rem',
										width: '1.5rem'
									}}
									src={''}
								>
									{user.name}
								</Avatar>
								<span style={{ marginLeft: '0.5rem', paddingTop: '0.25rem' }}>{user.name}</span>
							</div>
						</button>
					);
				})
			) : (
				<div className="item">No results</div>
			)}
		</div>
	);
});

forwardref.displayName = 'forwardref';

export default forwardref;
