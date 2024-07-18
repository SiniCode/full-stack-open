import axios from 'axios';
import { EntryWithoutId, Entry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getById = async (id: string) => {
	try {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
		return data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error) && error.response) {
			throw new Error(error.response.data);
		} else {
			console.error(error);
		}
	}
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const addEntry = async (id: string, object: EntryWithoutId) => {
	const { data } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	);

	return data;
};

export default {
	getAll,
	getById,
	create,
	addEntry,
};
