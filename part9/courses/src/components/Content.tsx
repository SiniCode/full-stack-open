import { ContentProps, CoursePart } from '../types';

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.parts.map((part: CoursePart, i: number) => (
				<p key={`part${i}`}>
					{part.name} {part.exerciseCount.toString()}
				</p>
			))}
		</div>
	);
};

export default Content;
