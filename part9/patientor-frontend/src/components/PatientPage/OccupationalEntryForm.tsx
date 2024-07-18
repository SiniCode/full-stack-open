import { useState, SyntheticEvent } from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';
import { EntryWithoutId, Diagnosis } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryWithoutId) => void;
}

const OccupationalEntryForm = ({ onCancel, onSubmit }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState('');
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		const entry: EntryWithoutId = {
			type: 'OccupationalHealthcare',
			description,
			date,
			specialist,
			employerName,
		};
		if (diagnosisCodes !== '') {
			entry.diagnosisCodes = diagnosisCodes.split(',') as Array<
				Diagnosis['code']
			>;
		}
		if (sickLeaveStart !== '' && sickLeaveEnd !== '') {
			entry.sickLeave = { startDate: sickLeaveStart, endDate: sickLeaveEnd };
		}
		onSubmit(entry);
	};

	return (
		<div style={{ padding: 20 }}>
			<Typography variant='h6'>
				Add new occupational healthcare entry
			</Typography>
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
					label='Employer'
					fullWidth
					value={employerName}
					onChange={({ target }) => setEmployerName(target.value)}
					required
				/>
				<TextField
					label='Sick leave starts'
					placeholder='YYYY-MM-DD'
					fullWidth
					value={sickLeaveStart}
					onChange={({ target }) => setSickLeaveStart(target.value)}
				/>
				<TextField
					label='Sick leave ends'
					placeholder='YYYY-MM-DD'
					fullWidth
					value={sickLeaveEnd}
					onChange={({ target }) => setSickLeaveEnd(target.value)}
					required={sickLeaveStart !== ''}
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

export default OccupationalEntryForm;
