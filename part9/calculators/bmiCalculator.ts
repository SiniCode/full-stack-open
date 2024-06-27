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

console.log(calculateBmi(180, 74));
