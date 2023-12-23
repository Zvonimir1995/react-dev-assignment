import { useQuery } from '@tanstack/react-query';

import { FormattedUsers } from '../../api/services/UsersService/interfaces';
import { UsersService } from '../../api/services/UsersService/UsersService';
import { queryKeys } from '../constants';

export const useUsers = () => {
	return useQuery([queryKeys.users], async () => {
		const users = await UsersService.getUsers();
		const formattedUsers: FormattedUsers = {};
		users.forEach((user) => {
			formattedUsers[user.id] = user;
		});
		// create a dummy user
		formattedUsers['11'] = {
			...formattedUsers['10'],
			id: 11,
			name: 'Dummy User',
			email: 'dummy.user@gmail.com',
			username: 'dum dum',
			phone: '011123123',
			website: 'https://github.com/Zvonimir1995'
		};
		return formattedUsers;
	});
};
