import axios from 'axios';
import { NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getDiaries = () => {
	return axios
		.get<NonSensitiveDiaryEntry[]>(baseUrl)
		.then((response) => response.data);
};
