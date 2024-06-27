interface Result {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
