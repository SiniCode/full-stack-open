import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Patient } from '../../types';
import patientService from '../../services/patients';

const PatientPage = () => {
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

	return (
		<div style={{ marginTop: 20 }}>
			<Typography variant='h5' style={{ marginBottom: 10 }}>
				{patient.name}
			</Typography>
			<Typography>SSN: {patient.ssn}</Typography>
			<Typography>Date of birth: {patient.dateOfBirth}</Typography>
			<Typography>Gender: {patient.gender}</Typography>
			<Typography>Occupation: {patient.occupation}</Typography>
			<Typography variant='h6' style={{ marginTop: 10 }}>
				Patient Journal
			</Typography>
		</div>
	);
};

export default PatientPage;
