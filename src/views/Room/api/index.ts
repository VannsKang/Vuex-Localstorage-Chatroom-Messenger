import axios, { AxiosResponse } from 'axios';
import { Photo } from '@/views/Room/typings';

const getPhotoList = (): Promise<AxiosResponse<Photo[]>> => {
	return axios.get('/database/photos.json');
};

export { getPhotoList };
