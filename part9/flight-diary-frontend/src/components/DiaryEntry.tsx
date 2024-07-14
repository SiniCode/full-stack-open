import { DiaryEntryProps } from '../types';

const DiaryEntry = (props: DiaryEntryProps) => {
	const entry = props.entry;
	return (
		<p>
			<b>{entry.date}</b>
			<br />
			Visibility: {entry.visibility}
			<br />
			Weather: {entry.weather}
		</p>
	);
};

export default DiaryEntry;
