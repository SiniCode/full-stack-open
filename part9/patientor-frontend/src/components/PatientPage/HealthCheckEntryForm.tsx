import { useState, SyntheticEvent } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Diagnosis } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryWithoutId) => void;
}

const HealthCheckEntryForm = ({ onCancel, onSubmit }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState(0);

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		const entry: EntryWithoutId = {
			type: 'HealthCheck',
			description,
			date,
			specialist,
			healthCheckRating: healthCheckRating as HealthCheckRating,
		};
		if (diagnosisCodes !== '') {
			entry.diagnosisCodes = diagnosisCodes.split(',') as Array<
				Diagnosis['code']
			>;
		}
		onSubmit(entry);
	};

	return (
		<div style={{ padding: 20 }}>
			<Typography variant='h6'>Add new health check entry</Typography>
			<form onSubmit={addEntry}>
				<TextField
					label='Description'
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
					required
				/>
				<TextField
					label='Date'
					placeholder='YYYY-MM-DD'
					fullWidth
					value={date}
					onChange={({ target }) => setDate(target.value)}
					required
				/>
				<TextField
					label='Specialist'
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
					required
				/>
				<TextField
					label='Diagnosis codes (separated by comma)'
					fullWidth
					value={diagnosisCodes}
					onChange={({ target }) => setDiagnosisCodes(target.value)}
				/>
				<TextField
					label='Health check rating (0 - 3)'
					fullWidth
					value={healthCheckRating}
					onChange={({ target }) => setHealthCheckRating(Number(target.value))}
					required
				/>
				<Grid>
					<Grid item>
						<Button
							color='secondary'
							variant='contained'
							style={{ float: 'left' }}
							type='button'
							onClick={onCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{
								float: 'right',
							}}
							type='submit'
							variant='contained'
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
			<br />
		</div>
	);
};

export default HealthCheckEntryForm;
