import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, Alert } from '@mui/material';
import { Patient, Diagnosis, EntryWithoutId } from '../../types';
import patientService from '../../services/patients';
import PatientJournal from './PatientJournal';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';

interface Props {
	diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const [error, setError] = useState('');
	const [form, setForm] = useState<string>();
	const id = useParams().id || '';

	useEffect(() => {
		const fetchPatientData = async () => {
			try {
				const patientData = await patientService.getById(id);
				setPatient(patientData);
			} catch (error: unknown) {
				if (error instanceof Error) {
					setError(error.message);
					setTimeout(() => setError(''), 5000);
				}
			}
		};

		void fetchPatientData();
	}, [id]);

	if (patient === undefined) {
		return (
			<div>
				<Typography color='secondary'>{error}</Typography>
				<Typography>Patient not found.</Typography>
			</div>
		);
	}

	const submitNewEntry = async (values: EntryWithoutId) => {
		try {
			const entry = await patientService.addEntry(id, values);
			setPatient({ ...patient, entries: [entry].concat(patient.entries) });
			setForm(undefined);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace(
						'Something went wrong. Error: ',
						''
					);
					console.error(message);
					setError(message);
					setTimeout(() => setError(''), 5000);
				} else {
					setError('Unrecognized axios error');
					setTimeout(() => setError(''), 5000);
				}
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
				setTimeout(() => setError(''), 5000);
			}
		}
	};

	const getBirthDate = () => {
		const dateString = Date.parse(patient.dateOfBirth);
		const dateObject = new Date(dateString);
		return dateObject.toDateString();
	};

	return (
		<div style={{ marginTop: 20 }}>
			<Typography variant='h5' style={{ marginBottom: 10 }}>
				{patient.name}
			</Typography>
			<Typography>
				<b>SSN:</b> {patient.ssn}
			</Typography>
			<Typography>
				<b>Date of birth:</b> {getBirthDate()}
			</Typography>
			<Typography>
				<b>Gender:</b> {patient.gender}
			</Typography>
			<Typography>
				<b>Occupation:</b> {patient.occupation}
			</Typography>
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
					onCancel={() => setForm(undefined)}
					onSubmit={submitNewEntry}
				/>
			)}
			{form === 'Occupational' && (
				<OccupationalEntryForm
					onCancel={() => setForm(undefined)}
					onSubmit={submitNewEntry}
				/>
			)}
			{form === 'Hospital' && (
				<Button variant='contained' onClick={() => setForm(undefined)}>
					Close hospital entry
				</Button>
			)}
			<PatientJournal entries={patient.entries} diagnoses={props.diagnoses} />
		</div>
	);
};

export default PatientPage;
