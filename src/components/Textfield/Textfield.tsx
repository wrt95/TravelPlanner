import { ReactElement, ChangeEvent, useId } from 'react';
import classes from './Textfield.module.css';

type TextfieldProps = {
	type: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	label: string;
	hideLabel?: boolean;
};

export const Textfield = ({
	type,
	value,
	onChange,
	required,
	label,
	hideLabel,
}: TextfieldProps): ReactElement => {
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
