const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / (height / 100) ** 2;
	let message = '';
	if (bmi < 16) {
		message = 'Underweight (Severe thinness)';
	} else if (bmi < 17) {
		message = 'Underweight (Moderate thinness)';
	} else if (bmi < 18.5) {
		message = 'Underweight (Mild thinness)';
	} else if (bmi < 25) {
		message = 'Normal (healthy weight)';
	} else if (bmi < 30) {
		message = 'Overweight (Pre-obese)';
	} else if (bmi < 35) {
		message = 'Obese (Class I)';
	} else if (bmi < 40) {
		message = 'Obese (Class II)';
	} else {
		message = 'Obese (Class III)';
	}

	return message;
};

interface Measurements {
	height: number;
	weight: number;
}

const parseMeasurements = (args: string[]): Measurements => {
	if (args.length !== 4)
		throw new Error(
			`Number of arguments should be 2 but was ${args.length - 2}.`
		);

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

try {
	const { height, weight } = parseMeasurements(process.argv);
	console.log(calculateBmi(height, weight));
} catch (error: unknown) {
	let errorMessage = 'Error! ';
	if (error instanceof Error) {
		errorMessage += error.message;
	}
	console.log(errorMessage);
}
