import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import PatientJournal from './PatientJournal';

interface Props {
	diagnoses: Diagnosis[];
}

const PatientPage = (props: Props) => {
	const [patient, setPatient] = useState<Patient | undefined>(undefined);
	const [error, setError] = useState('');
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
			<PatientJournal entries={patient.entries} diagnoses={props.diagnoses} />
		</div>
	);
};

export default PatientPage;
