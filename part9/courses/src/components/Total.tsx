import { TotalProps } from '../types';

const Total = (props: TotalProps) => {
	return (
		<p>
			<b>Total number of exercises {props.total}</b>
		</p>
	);
};

export default Total;
