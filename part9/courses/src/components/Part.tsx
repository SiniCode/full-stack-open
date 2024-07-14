import { PartProps } from '../types';

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = (props: PartProps) => {
	const part = props.part;
	switch (part.kind) {
		case 'basic':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
				</p>
			);

		case 'group':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					Group project exercises {part.groupProjectCount}
				</p>
			);

		case 'background':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
					<br />
					See <a href={part.backgroundMaterial}>background material</a>
				</p>
			);

		case 'special':
			return (
				<p>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
					<br />
					Required skills: {part.requirements.join(', ')}
				</p>
			);

		default:
			return assertNever(part);
	}
};

export default Part;
