import { useState, useEffect } from 'react';
import EntryList from './components/EntryList';
import {
	NonSensitiveDiaryEntry,
	NewDiaryEntry,
	Visibility,
	Weather,
} from './types';
import { getEntries, addEntry } from './services/diaryService';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
		[]
	);
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

	useEffect(() => {
		getEntries().then((data) => {
			setDiaryEntries(data);
		});
	}, []);

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newEntry: NewDiaryEntry = {
			date,
			visibility: visibility as Visibility,
			weather: weather as Weather,
			comment,
		};
		addEntry(newEntry).then((data) => {
			console.log(data);
			setDiaryEntries(
				diaryEntries.concat({
					id: data.id,
					date: data.date,
					visibility: data.visibility,
					weather: data.weather,
				})
			);
		});
		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	};

	return (
		<>
			<h1>Flight Diary</h1>
			<div className='component'>
				<h2>Add new entry</h2>
				<form onSubmit={handleSubmit}>
					<div>
						Date:
						<input
							value={date}
							placeholder='YYYY-MM-DD'
							onChange={(event) => setDate(event.target.value)}
						/>
					</div>
					<div>
						Visibility:
						<input
							value={visibility}
							placeholder='great/good/ok/poor'
							onChange={(event) => setVisibility(event.target.value)}
						/>
					</div>
					<div>
						Weather:
						<input
							value={weather}
							placeholder='sunny/rainy/cloudy/stormy/windy'
							onChange={(event) => setWeather(event.target.value)}
						/>
					</div>
					<div>
						Comment:
						<textarea
							value={comment}
							onChange={(event) => setComment(event.target.value)}
						/>
					</div>
					<button type='submit'>Add to diary</button>
				</form>
			</div>
			<EntryList entries={diaryEntries} />
		</>
	);
}

export default App;
