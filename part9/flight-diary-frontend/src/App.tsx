import { useState, useEffect } from 'react';
import EntryList from './components/EntryList';
import { NonSensitiveDiaryEntry } from './types';
import { getDiaries } from './services/diaryService';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);

	useEffect(() => {
		getDiaries().then((data) => {
			setDiaryEntries(data);
		});
	}, []);

	return (
		<>
			<h1>Flight Diaries</h1>
			<EntryList entries={diaryEntries} />
		</>
	);
}

export default App;
