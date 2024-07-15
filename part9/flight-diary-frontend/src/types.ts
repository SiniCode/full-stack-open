export enum Weather {
	Sunny = 'sunny',
	Rainy = 'rainy',
	Cloudy = 'cloudy',
	Stormy = 'stormy',
	Windy = 'windy',
}

export enum Visibility {
	Great = 'great',
	Good = 'good',
	Ok = 'ok',
	Poor = 'poor',
}

export interface DiaryEntry {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
	comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export interface DiaryEntryProps {
	entry: NonSensitiveDiaryEntry;
}

export interface EntryListProps {
	entries: NonSensitiveDiaryEntry[];
}

export interface EntryFormProps {
	entries: NonSensitiveDiaryEntry[];
	setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

export interface InputProps {
	label: string;
	id: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	value?: string;
}

export interface RadioButtonsProps {
	legend: string;
	name: string;
	options: string[];
	setValue: React.Dispatch<React.SetStateAction<string>>;
}
