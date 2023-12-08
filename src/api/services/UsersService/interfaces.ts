export interface IUSersService {
	getUsers: () => Promise<UserModel[]>;
}

export interface UserModel {
	id: number;
	name: string;
	username: string;
	email: string;
	address: AddressModel;
	phone: string;
	website: string;
	company: CompanyModel;
}

export type FormattedUsers = {
	[key: string]: UserModel;
};

export interface AddressModel {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: {
		lat: string;
		lng: string;
	};
}

export interface CompanyModel {
	name: string;
	catchPhrase: string;
	bs: string;
}
