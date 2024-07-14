export interface HeaderProps {
	name: string;
}

export interface CoursePart {
	name: string;
	exerciseCount: number;
}

export interface ContentProps {
	parts: CoursePart[];
}

export interface TotalProps {
	total: number;
}
