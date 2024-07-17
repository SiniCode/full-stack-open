import {
	PatientWithoutId,
	Gender,
	EntryWithoutId,
	Diagnosis,
	HealthCheckRating,
	SickLeave,
	Discharge,
} from './types';

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseField = (fieldName: string, data: unknown): string => {
	if (!isString(data)) {
		throw new Error(`${fieldName} was not a string.`);
	}
	if ((fieldName === 'dateOfBirth' || fieldName === 'date') && !isDate(data)) {
		throw new Error(`Invalid ${fieldName}: ${data}.`);
	}

	return data;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error(`Invalid gender: ${gender}.`);
	}

	return gender;
};

const isNumber = (param: unknown): param is number => {
	return typeof param === 'number' || param instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (!isNumber(rating) || !isHealthCheckRating(rating)) {
		throw new Error(`Invalid health check rating: ${rating}.`);
	}

	return rating;
};

const isSickLeave = (object: object): object is SickLeave => {
	const keys = Object.keys(object);
	const values = Object.values(object);
	return (
		keys.length === 2 &&
		keys.includes('startDate') &&
		keys.includes('endDate') &&
		values.every((v: unknown) => isString(v)) &&
		values.every((v: string) => isDate(v))
	);
};

const parseSickLeave = (object: unknown): SickLeave => {
	if (!object || typeof object !== 'object' || !isSickLeave(object)) {
		throw new Error(`Invalid sickLeave value: ${object}`);
	}
	return object;
};

const isDischarge = (object: object): object is Discharge => {
	const keys = Object.keys(object);
	if ('date' in object && 'criteria' in object) {
		return (
			keys.length === 2 &&
			isString(object.date) &&
			isDate(object.date) &&
			isString(object.criteria)
		);
	}

	return false;
};

const parseDischarge = (object: unknown): Discharge => {
	if (!object || typeof object !== 'object' || !isDischarge(object)) {
		throw new Error(`Invalid discharge value: ${object}`);
	}
	return object;
};

export const parseNewPatient = (object: unknown): PatientWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Data missing or invalid');
	}

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		const newPatient: PatientWithoutId = {
			name: parseField('name', object.name),
			dateOfBirth: parseField('dateOfBirth', object.dateOfBirth),
			ssn: parseField('ssn', object.ssn),
			gender: parseGender(object.gender),
			occupation: parseField('occupation', object.occupation),
			entries: [],
		};

		return newPatient;
	}

	throw new Error('Incomplete data: a field missing.');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return object as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const parseHealthCheckEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Data missing or invalid');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'type' in object &&
		'healthCheckRating' in object
	) {
		const newEntry: EntryWithoutId = {
			description: parseField('description', object.description),
			date: parseField('date', object.date),
			specialist: parseField('specialist', object.specialist),
			type: 'HealthCheck',
			healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
		};

		if ('diagnosisCodes' in object) {
			newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
		}

		return newEntry;
	}

	throw new Error('Incomplete data: a field missing.');
};

export const parseOccupationalEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Data missing or invalid');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'type' in object &&
		'employerName' in object
	) {
		const newEntry: EntryWithoutId = {
			description: parseField('description', object.description),
			date: parseField('date', object.date),
			specialist: parseField('specialist', object.specialist),
			type: 'OccupationalHealthcare',
			employerName: parseField('employerName', object.employerName),
		};

		if ('diagnosisCodes' in object) {
			newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
		}

		if ('sickLeave' in object) {
			newEntry.sickLeave = parseSickLeave(object.sickLeave);
		}

		return newEntry;
	}

	throw new Error('Incomplete data: a field missing.');
};

export const parseHospitalEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Data missing or invalid');
	}

	if (
		'description' in object &&
		'date' in object &&
		'specialist' in object &&
		'type' in object &&
		'discharge' in object
	) {
		const newEntry: EntryWithoutId = {
			description: parseField('description', object.description),
			date: parseField('date', object.date),
			specialist: parseField('specialist', object.specialist),
			type: 'Hospital',
			discharge: parseDischarge(object.discharge),
		};

		if ('diagnosisCodes' in object) {
			newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
		}

		return newEntry;
	}

	throw new Error('Incomplete data: a field missing.');
};
