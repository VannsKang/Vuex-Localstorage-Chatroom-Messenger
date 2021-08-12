export interface UserState {
	logined: Logined | null;
	users: User[] | null;
}

export interface Logined {
	id: number;
	name: string;
}

export interface User {
	id: number;
	name: string;
	profile: string;
}

export type Nullable = null | undefined;
