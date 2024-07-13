import { PatientWithoutId, Gender } from './types';

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
	if (fieldName === 'dateOfBirth' && !isDate(data)) {
		throw new Error(`Date of birth formatted incorrectly: ${data}.`);
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

const parseNewPatient = (object: unknown): PatientWithoutId => {
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
		};

		return newPatient;
	}

	throw new Error('Incomplete data: a field missing.');
};

export default parseNewPatient;
