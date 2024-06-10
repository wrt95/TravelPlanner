import { ChangeEvent, ReactElement, useId } from 'react';
import classes from './TextArea.module.css';

type TextAreaProps = {
	value: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
	label: string;
	hideLabel?: boolean;
};

export const TextArea = ({
	value,
	onChange,
	required,
	label,
	hideLabel,
}: TextAreaProps): ReactElement => {
	const id = useId();
	return (
		<div className={classes.inputContainer}>
			<label
				htmlFor={id}
				className={hideLabel ? classes.hiddenLabel : classes.inputLabel}
			>
				{hideLabel ? label : null}
			</label>
			<textarea
				value={value}
				id={id}
				onChange={onChange}
				required={required}
				className={classes.styledInput}
			/>
		</div>
	);
};
