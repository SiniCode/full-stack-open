import { InputProps } from '../types';

const DateInput = (props: InputProps) => {
	return (
		<div>
			<label htmlFor='date'>
				<b>{props.label}</b>
			</label>
			<input
				type='date'
				id={props.id}
				onChange={(event) => props.setValue(event.target.value)}
				required
			/>
		</div>
	);
};

export default DateInput;
