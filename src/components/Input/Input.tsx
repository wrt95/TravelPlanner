import { ReactElement, ChangeEvent, useId } from 'react';
import classes from './Input.module.css';

type InputProps = {
	type: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	label: string;
	id?: string;
	hideLabel?: boolean;
};

export const Input = ({
	type,
	value,
	onChange,
	required,
	label,
	hideLabel,
}: InputProps): ReactElement => {
	const id = useId();
	return (
		<div className={classes.inputWrapper}>
			<label
				htmlFor={id}
				className={hideLabel ? classes.hiddenLabel : classes.inputLabel}
			>
				{hideLabel ? label : null}
			</label>
			<input
				type={type}
				value={value}
				id={id}
				onChange={onChange}
				required={required}
				className={classes.input}
			/>
		</div>
	);
};
