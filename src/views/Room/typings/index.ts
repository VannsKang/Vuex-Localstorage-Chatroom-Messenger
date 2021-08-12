import { Logined } from '@/views/Home/typings';
import { Host } from '@/views/List/typings';

export interface ChatState {
	roomLog: RoomLog;
	chatLog: Chat[];
}

export interface UploadState {
	isClicked: boolean;
	photos: Photo[];
}

export interface RoomLog {
	[room: number]: ChatBulk;
}

export interface ChatBulk {
	host: Host;
	chats: Chat[];
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

export interface Time {
	absoluteTime: number;
	year: number;
	month: number;
	date: number;
	day: string;
	hours: string;
	minutes: string;
}

export interface Photo {
	id: number;
	url: string;
}
