import axios, { AxiosResponse } from 'axios';
import { Room } from '@/views/List/typings';

const getRoomList = (): Promise<AxiosResponse<Room[]>> => {
	return axios.get('/database/rooms.json');
};

export { getRoomList };
