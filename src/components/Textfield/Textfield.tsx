import { ReactElement, useId, InputHTMLAttributes } from 'react';
import classes from './Textfield.module.css';

type TextfieldProps = {
	label: string;
	hideLabel?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Textfield = ({
	label,
	hideLabel,
	...rest
}: TextfieldProps): ReactElement => {
	const id = useId();

	return (
		<div className={classes.inputWrapper}>
			<label
				htmlFor={id}
				className={hideLabel ? classes.hiddenLabel : classes.inputLabel}
			>
				{!hideLabel ? label : null}
			</label>
			<input id={id} className={classes.input} {...rest} />
		</div>
	);
};
