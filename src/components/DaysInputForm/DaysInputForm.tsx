import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import classes from './DaysInputForm.module.css';
import { Input } from '../Input';
import { Button } from '../Button';

type DaysInputFormProps = {
	setDays: (days: number) => void;
};

export const DaysInputForm = ({
	setDays,
}: DaysInputFormProps): ReactElement => {
	const [inputValue, setInputValue] = useState<number>(0);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setDays(inputValue);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(Number(e.target.value));
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Input
				type="number"
				value={inputValue}
				onChange={handleChange}
				required
				label="Number of days of your trip"
			/>
			<Button type="submit">Create Plan</Button>
		</form>
	);
};
