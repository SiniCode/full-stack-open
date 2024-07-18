import { Button, Alert } from '@mui/material';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import { EntryWithoutId } from '../../../types';

interface Props {
	form: string;
	setForm: React.Dispatch<React.SetStateAction<string>>;
	error: string;
	onSubmit: (values: EntryWithoutId) => void;
}

const NewEntriesSection = ({ form, setForm, error, onSubmit }: Props) => {
	return (
		<div>
			<Button variant='outlined' onClick={() => setForm('HealthCheck')}>
				Add new health check entry
			</Button>
			<Button variant='outlined' onClick={() => setForm('Occupational')}>
				Add new occupational healthcare entry
			</Button>
			<Button variant='outlined' onClick={() => setForm('Hospital')}>
				Add new hospital entry
			</Button>
			{error && <Alert severity='error'>{error}</Alert>}
			{form === 'HealthCheck' && (
				<HealthCheckEntryForm
					onCancel={() => setForm('')}
					onSubmit={onSubmit}
				/>
			)}
			{form === 'Occupational' && (
				<OccupationalEntryForm
					onCancel={() => setForm('')}
					onSubmit={onSubmit}
				/>
			)}
			{form === 'Hospital' && (
				<HospitalEntryForm onCancel={() => setForm('')} onSubmit={onSubmit} />
			)}
		</div>
	);
};

export default NewEntriesSection;
