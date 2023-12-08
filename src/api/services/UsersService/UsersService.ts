import { apiClient } from '../../apiClient';

import { IUSersService } from './interfaces';

export const UsersService: IUSersService = {
	getUsers: async () => {
		return await apiClient.get('users').then((res) => res.data);
	}
};
