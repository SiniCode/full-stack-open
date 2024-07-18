import { Button, Alert, Grid, Typography } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { EntryWithoutId, Diagnosis } from '../../../types';

interface Props {
	form: string;
	setForm: React.Dispatch<React.SetStateAction<string>>;
	error: string;
	onSubmit: (values: EntryWithoutId) => void;
	diagnoses: Diagnosis[];
}

const NewEntriesSection = ({
	form,
	setForm,
	error,
	onSubmit,
	diagnoses,
}: Props) => {
	const diagnosisCodes = diagnoses.map((d: Diagnosis) => d.code);

	return (
		<div style={{ marginTop: 20 }}>
			<Typography variant='h6'>Add new entry</Typography>
			<Grid container style={{ marginBottom: 10, marginTop: 10 }}>
				<Grid item>
					<Button
						variant='outlined'
						style={{ width: '240px' }}
						onClick={() => setForm('HealthCheck')}
					>
						Health check
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant='outlined'
						style={{ width: '240px' }}
						onClick={() => setForm('Occupational')}
					>
						Occupational healthcare
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant='outlined'
						style={{ width: '240px' }}
						onClick={() => setForm('Hospital')}
					>
						Hospital
					</Button>
				</Grid>
			</Grid>
			{error && <Alert severity='error'>{error}</Alert>}
			{form === 'HealthCheck' && (
				<HealthCheckEntryForm
					onCancel={() => setForm('')}
					onSubmit={onSubmit}
					diagnoses={diagnosisCodes}
				/>
			)}
			{form === 'Occupational' && (
				<OccupationalEntryForm
					onCancel={() => setForm('')}
					onSubmit={onSubmit}
					diagnoses={diagnosisCodes}
				/>
			)}
			{form === 'Hospital' && (
				<HospitalEntryForm
					onCancel={() => setForm('')}
					onSubmit={onSubmit}
					diagnoses={diagnosisCodes}
				/>
			)}
		</div>
	);
};

export default NewEntriesSection;
