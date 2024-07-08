import express = require('express');
const app = express();
app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	const height: number = Number(req.query.height);
	const weight: number = Number(req.query.weight);
	if (isNaN(height) || isNaN(weight)) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	const bmi: string = calculateBmi(height, weight);
	res.json({
		weight,
		height,
		bmi,
	});
});

app.post('/exercises', (req, res) => {
	const body = req.body;
	if (!body.daily_exercises || !body.target) {
		res.status(400).json({ error: 'parameters missing' });
	} else if (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		body.daily_exercises.some((value: any) => isNaN(Number(value))) ||
		isNaN(Number(body.target))
	) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	type validInput = number | string | boolean;
	const dailyHours: number[] = body.daily_exercises.map((value: validInput) =>
		Number(value)
	);

	const calculations = calculateExercises(dailyHours, Number(body.target));
	res.json(calculations);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
