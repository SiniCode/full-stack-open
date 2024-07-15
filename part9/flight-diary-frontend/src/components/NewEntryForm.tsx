import { useState } from 'react';
import { EntryFormProps, NewDiaryEntry, Weather, Visibility } from '../types';
import { addEntry } from '../services/diaryService';
import RadioButtons from './RadioButtons';
import DateInput from './DateInput';
import Comment from './Comment';

const NewEntryForm = (props: EntryFormProps) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

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
					props.setEntries(
						props.entries.concat({
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
		<div className='component'>
			<h2>Add new entry</h2>
			<div className='error'>{errorMessage}</div>
			<form onSubmit={handleSubmit}>
				<DateInput label='Date:' id='date' setValue={setDate} />
				<RadioButtons
					legend='Visibility:'
					name='visibility'
					options={['great', 'good', 'ok', 'poor']}
					setValue={setVisibility}
				/>
				<br />
				<RadioButtons
					legend='Weather:'
					name='weather'
					options={['sunny', 'rainy', 'cloudy', 'stormy', 'windy']}
					setValue={setWeather}
				/>
				<br />
				<Comment
					label='Comment:'
					id='comment'
					setValue={setComment}
					value={comment}
				/>
				<button type='submit'>Add to diary</button>
			</form>
		</div>
	);
};

export default NewEntryForm;
