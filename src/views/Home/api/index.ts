import axios, { AxiosResponse } from 'axios';
import { User } from '@/views/Home/typings';

const getUserList = (): Promise<AxiosResponse<User[]>> => {
	return axios.get('/database/users.json');
};

export { getUserList };
