import DiaryEntry from './DiaryEntry';
import { EntryListProps, NonSensitiveDiaryEntry } from '../types';

const EntryList = (props: EntryListProps) => {
	return (
		<div className='component'>
			<h2>Diary Entries</h2>
			{props.entries.map((entry: NonSensitiveDiaryEntry) => (
				<DiaryEntry key={entry.id} entry={entry} />
			))}
		</div>
	);
};

export default EntryList;
