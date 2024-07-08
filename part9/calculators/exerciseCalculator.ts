interface Result {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

export const calculateExercises = (
	dailyHours: number[],
	target: number
): Result => {
	const periodLength = dailyHours.length;
	const trainingDays = dailyHours.filter((h) => h > 0).length;
	const average =
		dailyHours.reduce((sumSoFar, x) => sumSoFar + x, 0) / periodLength;
	const success = average >= target;
	let rating = 2;
	if (average < target) {
		rating = 1;
	} else if (average > target + 1) {
		rating = 3;
	}
	const descriptions = [
		'You did not quite reach your target. You can do better next time!',
		'You reached your target, well done!',
		'You smashed your target but you might be overdoing it. Remember to rest, too!',
	];

	return {
		periodLength,
		trainingDays,
		target,
		average,
		success,
		rating,
		ratingDescription: descriptions[rating - 1],
	};
};

interface Hours {
	target: number;
	dailyHours: number[];
}

const isValidArgument = (value: string, index: number): boolean => {
	if (index > 1) {
		if (isNaN(Number(value))) {
			return false;
		}
	}
	return true;
};

const parseHours = (args: string[]): Hours => {
	if (args.length < 4) {
		throw new Error(
			`Number of arguments should be at least 2 but was ${args.length - 2}.`
		);
	}
	if (args.every(isValidArgument)) {
		return {
			target: Number(args[2]),
			dailyHours: args.slice(3).map((value: string): number => Number(value)),
		};
	} else {
		throw new Error('Not all arguments were numbers.');
	}
};

const main = () => {
	try {
		const { target, dailyHours } = parseHours(process.argv);
		console.log(calculateExercises(dailyHours, target));
	} catch (error: unknown) {
		let errorMessage = 'Error! ';
		if (error instanceof Error) {
			errorMessage += error.message;
		}
		console.log(errorMessage);
	}
};

if (typeof require !== 'undefined' && require.main === module) {
	main();
}
