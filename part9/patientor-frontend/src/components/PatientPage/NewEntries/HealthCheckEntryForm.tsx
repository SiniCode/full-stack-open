import { useState, SyntheticEvent } from 'react';
import {
	Box,
	Grid,
	Button,
	Typography,
	Input,
	InputLabel,
	Select,
	SelectChangeEvent,
	MenuItem,
	Chip,
} from '@mui/material';
import { EntryWithoutId, HealthCheckRating, Diagnosis } from '../../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryWithoutId) => void;
	diagnoses: string[];
}

const HealthCheckEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [healthCheckRating, setHealthCheckRating] = useState('');

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		const entry: EntryWithoutId = {
			type: 'HealthCheck',
			description,
			date,
			specialist,
			healthCheckRating: Number(healthCheckRating[0]) as HealthCheckRating,
		};
		if (diagnosisCodes.length > 0) {
			entry.diagnosisCodes = diagnosisCodes as Array<Diagnosis['code']>;
		}
		onSubmit(entry);
	};

	const handleCodeChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
	};

	const ratings = [
		'0 (Healthy)',
		'1 (Low risk)',
		'2 (High risk)',
		'3 (Critical risk)',
	];

	return (
		<Box
			sx={{ border: '2px solid grey' }}
			padding={5}
			marginTop={5}
			marginBottom={5}
			borderRadius={2}
			maxWidth={'640px'}
		>
			<Typography variant='h6' style={{ marginBottom: 20 }}>
				New health check entry
			</Typography>
			<form onSubmit={addEntry}>
				<InputLabel>Description:</InputLabel>
				<Input
					fullWidth
					value={description}
					onChange={({ target }) => setDescription(target.value)}
					required
				/>
				<InputLabel>Date:</InputLabel>
				<Input
					fullWidth
					type='date'
					value={date}
					onChange={({ target }) => setDate(target.value)}
					required
				/>
				<InputLabel>Specialist:</InputLabel>
				<Input
					fullWidth
					value={specialist}
					onChange={({ target }) => setSpecialist(target.value)}
					required
				/>
				<InputLabel>Diagnosis codes:</InputLabel>
				<Select
					fullWidth
					multiple
					value={diagnosisCodes}
					onChange={handleCodeChange}
					renderValue={(selected: string[]) => (
						<>
							{selected.map((value: string) => (
								<Chip key={value} label={value} />
							))}
						</>
					)}
				>
					{diagnoses.map((code) => (
						<MenuItem key={code} value={code}>
							{code}
						</MenuItem>
					))}
				</Select>
				<InputLabel>Health check rating:</InputLabel>
				<Select
					fullWidth
					value={healthCheckRating}
					onChange={({ target }) => setHealthCheckRating(target.value)}
					renderValue={(selected: string) => <Chip label={selected} />}
				>
					{ratings.map((value) => (
						<MenuItem key={value} value={value}>
							{value}
						</MenuItem>
					))}
				</Select>
				<Grid marginTop={5}>
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
		</Box>
	);
};

export default HealthCheckEntryForm;
