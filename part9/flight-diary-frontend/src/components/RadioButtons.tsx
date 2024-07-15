import { RadioButtonsProps } from '../types';

const RadioButtons = (props: RadioButtonsProps) => {
	return (
		<div>
			<legend>{props.legend}</legend>
			<div className='options'>
				{props.options.map((op: string, i: number) => {
					return (
						<div key={`${props.name}${i}`} className='option'>
							<input
								id={`${props.name}:${op}`}
								type='radio'
								name={props.name}
								value={op}
								onChange={() => props.setValue(op)}
							/>
							<label htmlFor={`${props.name}:${op}`}>{op}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RadioButtons;
