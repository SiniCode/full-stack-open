import { useState, useEffect } from 'react';
import NewEntryForm from './components/NewEntryForm';
import EntryList from './components/EntryList';
import { NonSensitiveDiaryEntry } from './types';
import { getEntries } from './services/diaryService';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);

	useEffect(() => {
		getEntries().then((data) => {
			setDiaryEntries(data);
		});
	}, []);

	return (
		<>
			<h1>Flight Diary</h1>
			<NewEntryForm entries={diaryEntries} setEntries={setDiaryEntries} />
			<EntryList entries={diaryEntries} />
		</>
	);
}

export default App;
