import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { PatientWithoutSSN, Patient, PatientWithoutId } from '../types';

const getPatients = (): PatientWithoutSSN[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (data: PatientWithoutId): Patient => {
	const newPatient = {
		id: uuid(),
		...data,
	};
	patients.push(newPatient);
	return newPatient;
};

export default {
	getPatients,
	addPatient,
};
