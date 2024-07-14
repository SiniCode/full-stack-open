import DiaryEntry from './DiaryEntry';
import { EntryListProps, NonSensitiveDiaryEntry } from '../types';

const EntryList = (props: EntryListProps) => {
	return (
		<div className='entries'>
			{props.entries.map((entry: NonSensitiveDiaryEntry, i: number) => (
				<DiaryEntry key={`entry${i}`} entry={entry} />
			))}
		</div>
	);
};

export default EntryList;
