import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import { NonSensitivePatient, Patient, PatientWithoutId } from '../types';

const getPatients = (): NonSensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const getPatient = (id: string): Patient => {
	const target = patients.find((patient: Patient) => {
		return patient.id === id;
	});
	if (target === undefined) {
		throw new Error("Id doesn't match any patient.");
	}
	return target;
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
	getPatient,
	addPatient,
};
