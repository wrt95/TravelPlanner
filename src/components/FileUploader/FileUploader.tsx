import { ReactElement, useEffect, useId, useRef, useState } from 'react';
import classes from './FileUploader.module.css';
import { Button } from '../Button';
import { FaTimes } from 'react-icons/fa';

type FileUploaderProps = {
	file: File | null;
	onChange: (file: File | null) => void;
	label: string;
	hideLabel?: boolean;
};

export const FileUploader = ({
	file,
	onChange,
	label,
	hideLabel,
}: FileUploaderProps): ReactElement => {
	const id = useId();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string | null>(file?.name ?? null);

	// See if I can just move this inside the change
	useEffect(() => {
		setFileName(file?.name ?? null);
	}, [file]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			// setFileName(e.target.files[0].name);
			onChange(e.target.files[0]);
		}
	};

	const handleClickUploadButton = () => {
		fileInputRef.current?.click();
	};

	const handleFileRemove = () => {
		onChange(null);
	};

	return (
		<div className={classes.inputWrapper}>
			<label
				htmlFor={id}
				className={hideLabel ? classes.hiddenLabel : classes.inputLabel}
			>
				{hideLabel ? label : null}
			</label>
			<div className={classes.fileUploadContainer}>
				{!fileName && (
					<div className={classes.center}>
						<Button type="button" onClick={handleClickUploadButton}>
							Upload Image
						</Button>
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleFileChange}
							accept="image/png, image/jpeg, image/jpg, image/heic"
							className={classes.hiddenInput}
						/>
					</div>
				)}
				{fileName && (
					<div className={classes.fileNameContainer}>
						<p>{fileName}</p>
						<button
							type="button"
							className={classes.fileRemoveButton}
							onClick={handleFileRemove}
						>
							<FaTimes className={classes.fileRemoveIcon} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
