import userReducer from '@/views/Home/reducer';
import { UserState } from '@/views/Home/typings';
import roomReducer from '@/views/List/reducer';
import { RoomState } from '@/views/List/typings';
import chatReducer from '@/views/Room/reducers/chat';
import { ChatState } from '@/views/Room/typings';
import uploadReducer from '@/views/Room/reducers/upload';
import { UploadState } from '@/views/Room/typings';

export interface RootState {
	userReducer: UserState;
	roomReducer: RoomState;
	chatReducer: ChatState;
	uploadReducer: UploadState;
}

export default {
	userReducer,
	roomReducer,
	chatReducer,
	uploadReducer,
};
