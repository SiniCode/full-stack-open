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
	const [errorMessage, setErrorMessage] = useState('');
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
		addEntry(newEntry)
			.then((data) => {
				if (data) {
					setDiaryEntries(
						diaryEntries.concat({
							id: data.id,
							date: data.date,
							visibility: data.visibility,
							weather: data.weather,
						})
					);
					setComment('');
				}
			})
			.catch((error: unknown) => {
				if (error instanceof Error) {
					setErrorMessage(error.message);
					setTimeout(() => setErrorMessage(''), 5000);
				} else {
					console.error(error);
				}
			});
	};

	return (
		<>
			<h1>Flight Diary</h1>
			<div className='component'>
				<h2>Add new entry</h2>
				<div className='error'>{errorMessage}</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='date'>
							<b>Date:</b>
						</label>
						<input
							type='date'
							id='date'
							onChange={(event) => setDate(event.target.value)}
							required
						/>
					</div>
					<div>
						<legend>Visibility:</legend>
						<input
							type='radio'
							name='visibility'
							id='visibilityGreat'
							value='great'
							onChange={() => setVisibility('great')}
						/>
						<label htmlFor='visibilityGreat'>great</label>
						<input
							type='radio'
							name='visibility'
							id='visibilityGood'
							value='good'
							onChange={() => setVisibility('good')}
						/>
						<label htmlFor='visibilityGood'>good</label>
						<input
							type='radio'
							name='visibility'
							id='visibilityOk'
							value='ok'
							onChange={() => setVisibility('ok')}
						/>
						<label htmlFor='visibilityOk'>ok</label>
						<input
							type='radio'
							name='visibility'
							id='visibilityPoor'
							value='poor'
							onChange={() => setVisibility('poor')}
						/>
						<label htmlFor='visibilityPoor'>poor</label>
					</div>
					<div>
						<legend>Weather:</legend>
						<input
							type='radio'
							name='weather'
							id='weatherSunny'
							value='sunny'
							onChange={() => setWeather('sunny')}
						/>
						<label htmlFor='weatherSunny'>sunny</label>
						<input
							type='radio'
							name='weather'
							id='weatherRainy'
							value='rainy'
							onChange={() => setWeather('rainy')}
						/>
						<label htmlFor='weatherRainy'>rainy</label>
						<input
							type='radio'
							name='weather'
							id='weatherCloudy'
							value='cloudy'
							onChange={() => setWeather('cloudy')}
						/>
						<label htmlFor='weatherCloudy'>cloudy</label>
						<input
							type='radio'
							name='weather'
							id='weatherStormy'
							value='stormy'
							onChange={() => setWeather('stormy')}
						/>
						<label htmlFor='weatherStormy'>stormy</label>
						<input
							type='radio'
							name='weather'
							id='weatherWindy'
							value='windy'
							onChange={() => setWeather('windy')}
						/>
						<label htmlFor='weatherWindy'>windy</label>
					</div>
					<div>
						<label htmlFor='comment' className='commentLabel'>
							<b>Comment:</b>
						</label>
						<textarea
							id='comment'
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
