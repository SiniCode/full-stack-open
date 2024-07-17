import express from 'express';
import patientService from '../services/patientService';
import {
	parseNewPatient,
	parseHealthCheckEntry,
	parseOccupationalEntry,
	parseHospitalEntry,
} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
	try {
		res.json(patientService.getPatient(req.params.id));
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.post('/', (req, res) => {
	try {
		const newPatient = parseNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	if (!('type' in req.body)) {
		res.status(400).send('Error: Entry type missing.');
	}

	if (req.body.type === 'HealthCheck') {
		try {
			const newEntry = parseHealthCheckEntry(req.body);
			const addedEntry = patientService.addEntry(req.params.id, newEntry);
			res.json(addedEntry);
		} catch (error: unknown) {
			let errorMessage = 'Something went wrong.';
			if (error instanceof Error) {
				errorMessage += ' Error: ' + error.message;
			}
			res.status(400).send(errorMessage);
		}
	} else if (req.body.type === 'OccupationalHealthcare') {
		try {
			const newEntry = parseOccupationalEntry(req.body);
			const addedEntry = patientService.addEntry(req.params.id, newEntry);
			res.json(addedEntry);
		} catch (error: unknown) {
			let errorMessage = 'Something went wrong.';
			if (error instanceof Error) {
				errorMessage += ' Error: ' + error.message;
			}
			res.status(400).send(errorMessage);
		}
	} else if (req.body.type === 'Hospital') {
		try {
			const newEntry = parseHospitalEntry(req.body);
			const addedEntry = patientService.addEntry(req.params.id, newEntry);
			res.json(addedEntry);
		} catch (error: unknown) {
			let errorMessage = 'Something went wrong.';
			if (error instanceof Error) {
				errorMessage += ' Error: ' + error.message;
			}
			res.status(400).send(errorMessage);
		}
	} else {
		res.status(400).send(`Error: invalid entry type: ${req.body.type}`);
	}
});

export default router;
