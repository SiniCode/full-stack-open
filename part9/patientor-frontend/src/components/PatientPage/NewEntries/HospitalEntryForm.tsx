import { useState, SyntheticEvent } from 'react';
import {
	Grid,
	Button,
	Typography,
	Box,
	Input,
	InputLabel,
	SelectChangeEvent,
	Select,
	MenuItem,
	Chip,
} from '@mui/material';
import { EntryWithoutId, Discharge, Diagnosis } from '../../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: EntryWithoutId) => void;
	diagnoses: string[];
}

const HospitalEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		const entry: EntryWithoutId = {
			type: 'Hospital',
			description,
			date,
			specialist,
			discharge: {
				date: dischargeDate,
				criteria: dischargeCriteria,
			} as Discharge,
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
				New hospital entry
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
				<InputLabel>Discharging date:</InputLabel>
				<Input
					type='date'
					fullWidth
					value={dischargeDate}
					onChange={({ target }) => setDischargeDate(target.value)}
					required
				/>
				<InputLabel>Discharging criteria:</InputLabel>
				<Input
					fullWidth
					value={dischargeCriteria}
					onChange={({ target }) => setDischargeCriteria(target.value)}
					required
				/>
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

export default HospitalEntryForm;
