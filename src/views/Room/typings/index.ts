import { Logined } from '@/views/Home/typings';
import { Host } from '@/views/List/typings';

export interface RoomLocalType {
	// data
	host: Host;
	logined: Logined;
	roomLog: RoomLog;
	chatLog: Chat[];
	roomNumber: number;

	// methods
	loadRoomLog: (component: Vue) => void;
	updateMessageSendStatus: (
		speaker: Logined | Host,
		receiver: Logined | Host,
		chats: Chat[]
	) => void;

	// vuex
	resetClickedAction: () => void;
	resetChatLogAction: () => void;
	updateChatLogAction: (chatLog: Chat[]) => void;
	updateRoomLogAction: (chatBulk: ChatBulk) => void;
}

export interface ChatViewLocalType extends RoomLocalType {
	// data
	message: string;
	chats: Chat[];

	// methods
	autoScollToLatest: () => void;
	readMessage: () => void;
	sendMessage: () => void;
}

export interface UploadLocalType extends RoomLocalType {
	// data
	photo: string;
	chats: Chat[];

	// methods
	uploadPhoto: () => void;

	// vuex
	loadPhotoData: () => Promise<void>;
}

export interface ChatState {
	roomLog: RoomLog;
	chatLog: Chat[];
}

export interface UploadState {
	isClicked: boolean;
	photos: Photo[];
}

export interface RoomLog {
	[loginedUser: number]: ChatBulk;
}

export interface ChatBulk {
	logined: Logined;
	[roomNumber: number]: {
		host: Host;
		chats: Chat[];
	};
}

export interface Chat {
	name: Logined;
	time: string | Date; // date
	message: string;
	photo: string | null;
	isRead: boolean;
	isSameDay: boolean;
	isSameTime: boolean;
}

export interface Photo {
	id: number;
	url: string;
}
