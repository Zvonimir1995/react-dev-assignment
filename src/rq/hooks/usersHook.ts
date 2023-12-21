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
		return formattedUsers;
	});
};
