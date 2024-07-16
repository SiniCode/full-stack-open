import express from 'express';
import patientService from '../services/patientService';
import parseNewPatient from '../utils';

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

export default router;
