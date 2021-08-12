export interface RoomState {
	host: Host | null;
	rooms: Room[] | null;
	sortedRooms: Room[] | null;
}

export interface Host {
	id: number;
	name: string;
}

export interface Room {
	id: number;
	name: string;
	profile: string;
}
