import { InputProps } from '../types';

const Comment = (props: InputProps) => {
	return (
		<div>
			<label htmlFor={props.id} className='commentLabel'>
				<b>{props.label}</b>
			</label>
			<textarea
				id={props.id}
				value={props.value}
				onChange={(event) => props.setValue(event.target.value)}
			/>
		</div>
	);
};

export default Comment;
