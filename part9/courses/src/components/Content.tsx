import { ContentProps, CoursePart } from '../types';
import Part from './Part';

const Content = (props: ContentProps) => {
	return (
		<div>
			{props.parts.map((part: CoursePart, i: number) => (
				<Part key={`part${i}`} part={part} />
			))}
		</div>
	);
};

export default Content;
