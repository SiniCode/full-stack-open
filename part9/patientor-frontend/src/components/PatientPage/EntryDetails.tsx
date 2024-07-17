import { Typography } from '@mui/material';
import {
	MedicalServicesRounded,
	WorkRounded,
	LocalHospitalRounded,
} from '@mui/icons-material';
import { Entry } from '../../types';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

interface Props {
	entry: Entry;
}

const ratingExplanation = (rating: number): string => {
	const explanations: string[] = [
		'Healthy',
		'Low risk',
		'High risk',
		'Critical risk',
	];
	return explanations[rating];
};

const getDate = (date: string): string => {
	const dateString = Date.parse(date);
	const dateObject = new Date(dateString);
	return dateObject.toDateString();
};

const EntryDetails = (props: Props) => {
	const entry = props.entry;

	switch (entry.type) {
		case 'HealthCheck':
			return (
				<div style={{ marginTop: 15 }}>
					<MedicalServicesRounded />
					<Typography>
						Rating: {entry.healthCheckRating} (
						{ratingExplanation(entry.healthCheckRating)})
					</Typography>
				</div>
			);

		case 'OccupationalHealthcare':
			return (
				<div style={{ marginTop: 15 }}>
					<WorkRounded />
					<Typography>Employer: {entry.employerName}</Typography>
					{entry.sickLeave && (
						<Typography>
							Sick leave: {getDate(entry.sickLeave.startDate)}
							{' - '}
							{getDate(entry.sickLeave.endDate)}
						</Typography>
					)}
				</div>
			);

		case 'Hospital':
			return (
				<div style={{ marginTop: 15 }}>
					<LocalHospitalRounded />
					<Typography>Discharged: {getDate(entry.discharge.date)}</Typography>
					<Typography>
						Discharging criteria: <i>{entry.discharge.criteria}</i>
					</Typography>
				</div>
			);

		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
